import { Server } from "socket.io"

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running")
  }
  console.log("Socket is initializing")
  const io = new Server(res.socket.server, {
    cors: { origin: "https://rocket-sandwich.com" },
    path: "/api/live",
  })
  res.socket.server.io = io

  // io on connection
  io.on("connection", (socket) => {
    socket.broadcast.emit("a user connected")
    socket.on("sendMsg", (msg) => {
      socket.broadcast.emit("sent from react native", msg)
      console.log("message sent")
    })
  })
  io.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`)
  })

  res.end()
}

export default SocketHandler
