const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const route = express.Router();
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const {MongoClient} = require('mongodb');

const client = new MongoClient("mongodb+srv://BCH_SDP-2:BCH123456@cluster0.psmpy.mongodb.net/jm-chats?retryWrites=true&w=majority");

app.use(cors());
app.use(router);

var collection;

io.on('connect', (socket) => {
  socket.on('join', async({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    try {
      let result = await collection.findOne(
        { _id: user.room });
      if(!result){
        await collection.insertOne({'_id': user.room, messages:[]})
      }
      
      if(error) return callback(error);
      socket.join(user.room);

      socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});

      socket.activeRoom = user.room;

      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

      
      callback();
    } catch (e) {
      console.error(e)
    }
    
  });

  socket.on('sendMessage', (message, callback) => {
     const user = getUser(socket.id);
    collection.updateOne(
      { _id: socket.activeRoom },
      {
        $push: {
          chat: {
            user: user.name,
            text: message,
          },
        },
      }
    );

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

router.get('/chats/room/:room_id', async (req, res) => {
  try {
    const result = await collection.findOne({
      _id: req.params.room_id,
    });
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


server.listen(process.env.PORT || 4000, async() => {
  try {
    await client.connect();
    collection = client.db("jm-chats").collection('chats');
    console.log('Listening on port :%s', server.address().port);
  } catch (e) {
    console.error(e);
  }
});