import { Socket } from "socket.io-client";

export interface UserState {
  loading: Boolean,
  groupid?: String,
  userid?: String,
  name?: String,
  connected: Boolean,
  socket?: Socket<ServerToClientEvents, ClientToServerEvents>,
  creating: Boolean
}

interface ServerToClientEvents {
  goto: (a: string) => void
}

interface ClientToServerEvents {
  joinGroup: (a: string) => void;
  joinRoom: ({groupid: string, userid: string}) => void;
}