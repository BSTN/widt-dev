import { Socket } from "socket.io-client";

interface userData {
  userid: String,
  name: String,
  answers: Array<Answers>
}

export interface UserState {
  loading: Boolean,
  groupid?: String,
  userid: String,
  position: Number,
  name?: String,
  connected: Boolean,
  socket?: Socket<ServerToClientEvents, ClientToServerEvents>,
  creating: Boolean,
  users: Array<userData>
}

interface ServerToClientEvents {
  goto: (a: string) => void
}

interface ClientToServerEvents {
  joinGroup: (a: string) => void;
  joinRoom: ({groupid: string, userid: string}) => void;
}