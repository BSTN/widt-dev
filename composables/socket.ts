import { io } from "socket.io-client";


export const useSocket = () => {
  const config = useRuntimeConfig()
  return io(config.public.URL + config.public.BASE)
}