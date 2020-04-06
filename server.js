const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

const port = process.env.PORT || 4001;
const index = require("./index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

let interval;
// let interval2;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  // if (interval2) {
  //   clearInterval(interval2);
  // }
  console.log("New client connected again");
  // interval2 = setInterval(() => getApiAndEmit2(socket), 1000);
  interval = setInterval(() => getApiAndEmit(socket), 10000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

const getApiAndEmit = async (socket) => {
  try {
    const res = await axios.get(
      "http://api.weatherapi.com/v1/current.json?key=0923d95ae0ed4df3a7190232200604&q=Manchester"
    );
    socket.emit("FromAPI", res.data); // Emitting a new message. It will be consumed by the client
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

// const getApiAndEmit2 = async (socket) => {
//   try {
//     const res = await axios.get(
//       "http://api.weatherstack.com/current?access_key=fb4d1b70bc1b24341b9874df97f633ac&query=Kashmir"
//     );
//     socket.emit("FromAPI2", res.data); // Emitting a new message. It will be consumed by the client
//   } catch (error) {
//     console.error(`Error: ${error.code}`);
//   }
// };
