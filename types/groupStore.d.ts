import { Socket } from "socket.io-client";

export interface GroupState {
  loading: Boolean,
  groupid?: String,
  connected: Boolean,
  socket?: Socket<ServerToClientEvents, ClientToServerEvents>
}

interface ServerToClientEvents {
  hello: (a: String) => void;
}

interface ClientToServerEvents {
  howdy: (a: String) => void;
}