import Pusher from "pusher"

export const pusher = new Pusher({
  appId: "1601549",
  secret: "60404add5f99e4a7a2ad",
  key: "2d69bd3e7210769d4d00",
  cluster: "eu",
  useTLS: true,
})

pusher.trigger("my-channel", "my-event", { message: "hello world" });
