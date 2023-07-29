import { io } from "socket.io-client";
let started = false

export const useSocket = () => {
  const config = useRuntimeConfig()
  if (!started) {
    started = io(config.public.URL + config.public.BASE)
  }
  return started
}