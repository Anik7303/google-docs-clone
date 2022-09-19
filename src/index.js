const { Server: SocketServer } = require("socket.io");

const PORT = process.env.PORT || "5000";
const socketServerOptions = {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
};

const io = new SocketServer(PORT, socketServerOptions);

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);
});
