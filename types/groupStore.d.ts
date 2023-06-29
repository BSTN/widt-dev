import { Socket } from "socket.io-client";

interface Answers {
  key: String,
  value?: Boolean | String,
}

interface userData {
  userid: String,
  name: String,
  answers: Array<Answers>
}

export interface GroupState {
  mounted: Boolean,
  loading: Boolean,
  groupid?: String,
  position: Number,
  connected: Boolean,
  socket?: Socket<ServerToClientEvents, ClientToServerEvents>
  users: Array<userData>,
  finished: { [key: string]: Array<String> },
  started: Array<String>
}

interface ServerToClientEvents {
  joinRoom: (a: String) => void,
  goto: (a: String) => void
}

interface ClientToServerEvents {
  joinRoom: ({groupid: String}) => void,
  test: ({data: String}) => void
}