import { Socket } from "socket.io-client";

interface Answers {
  key: String,
  value?: Boolean | String,
}

interface userData {
  id: String,
  name: String,
  answers: Array<Answers>
}

export interface GroupState {
  loading: Boolean,
  groupid?: String,
  connected: Boolean,
  socket?: Socket<ServerToClientEvents, ClientToServerEvents>
  users: Array<userData>
}

interface ServerToClientEvents {
  hello: (a: String) => void;
}

interface ClientToServerEvents {
  howdy: (a: String) => void;
}