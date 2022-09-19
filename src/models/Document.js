const { Schema, model } = require("mongoose");

const schema = new Schema({
  _id: { type: String, required: true },
  data: { type: Object, required: true },
});

module.exports = model("Document", schema);
