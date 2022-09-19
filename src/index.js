const { Server: SocketServer } = require("socket.io");
const mongoose = require("mongoose");

const Document = require("./models/Document");

const PORT = process.env.PORT || "5000";
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/google-docs-clone";
const socketServerOptions = {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
};

mongoose.connect(MONGO_URI).catch((err) => console.error(err));

const io = new SocketServer(PORT, socketServerOptions);

io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    const document = await findOrCreateDocument(documentId);

    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await Document.findOneAndUpdate({ _id: documentId }, { data });
    });
  });
});

async function findOrCreateDocument(id = null) {
  if (id === null) return;

  const document = await Document.findOne({ _id: id });
  if (document) return document;

  return await Document.create({ _id: id, data: "" });
}
