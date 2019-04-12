const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require("path");
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 3001;;
const routes = require('./routes/authRoutes');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }

// App Setup
app.use(morgan('combined'));
app.use(cors());

// Place this middleware before any other route definitions
// makes io available as req.io in all request handlers
app.use(function (req, res, next) {
  req.io = io;
  next();
});

// Define API routes here
routes(app);

// socket for chat
const socketController = require('./controllers/socket');
io.on('connection', socketController.respond);

// DB Setup
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/project_3', { useNewUrlParser: true });

// Send every other request to the React app
// Define any API routes before this runs
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

// io.on('connection', function (socket) {
//   console.log('a user connected');
//   socket.on('client msg', function (msg) {
//     console.log('server got new message id: ' + msg.gameId);
//     emitMsg(socket, msg);
//   });
// });
// // io.sockets.clients
// const emitMsg = (socket, msg) => {
//   // console.log('socket:');
//   console.log('user: ' + msg.user);
//   console.log('msg: ' + msg.message);
//   // io.emit('msg-' + msg.gameId, msg);
//   socket.broadcast.emit('msg-' + msg.gameId, msg);
// }

// Start the API server
server.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});