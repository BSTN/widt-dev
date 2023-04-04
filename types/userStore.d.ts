import { Socket } from "socket.io-client";

export interface UserState {
  loading: Boolean,
  groupid?: String,
  userid?: String,
  connected: Boolean,
  socket?: Socket<ServerToClientEvents, ClientToServerEvents>
}

interface ServerToClientEvents {
  hello: (a: String) => void;
}

interface ClientToServerEvents {
  joinGroup: (a: String) => void;
}