import { Socket } from "socket.io-client";

interface userData {
  userid: String,
  name: String,
  answers: Array<Answers>
}

interface answer {
  chapter: String,
  k: Number,
  answer: any[]
}

export interface UserState {
  mounted: Boolean,
  loading: Boolean,
  groupid?: String,
  userid: String,
  position: Number,
  name?: String,
  connected: Boolean,
  socket?: Socket<ServerToClientEvents, ClientToServerEvents>,
  creating: Boolean,
  users: Array<userData>
  answers: Array<answer>,
  finished: Array<String>,
  started: Array<String>
}

interface ServerToClientEvents {
  goto: (a: string) => void
}

interface ClientToServerEvents {
  joinGroup: (a: string) => void;
  joinRoom: ({groupid: string, userid: string}) => void;
}