const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'room',
    },
    chat: [
      {
        user: {
          type: String
        },
        text:{
            type: String
        }
      },
    ],
  },
  {
    timestamps: true,
  }
);

let Chat = mongoose.model('theChat', chatSchema);

module.exports = Chat;
