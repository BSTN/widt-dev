import { acceptHMRUpdate, defineStore } from 'pinia'
import { io } from "socket.io-client";
import { UserState } from '~/types/userStore.d'
import { v4 as uuidv4 } from "uuid";
import { identicon } from "minidenticons";

export const useUserStore = defineStore('userStore', {
  state: (): UserState => ({
    loading: true,
    connected: false,
    groupid: '',
    userid: '',
    socket: undefined,
  }),
  getters: {
    icon(state):String {
      return state.userid ? identicon(state.userid, 50, 50) : '';
    }
  },
  actions: {
    init() {
      const self = this
      if (process.server) { return false }
      // load localstorage and check if group already exists
      const user = JSON.parse(localStorage.getItem('widt-user') || '{}')
      if (user && user.timestamp && user.timestamp > Date.now() - (24 * 60 * 60 * 1000)) {
        this.groupid = user.groupid
        this.userid = user.userid
      } else {
        this.generate()
      }
      // open socket
      this.socket = io('192.168.1.11');

      // connection status
      this.socket.on('connect', function() { 
        if (self.groupid !== '' && self.socket) {
          self.socket.emit('joinRoom', self.groupid)
        }
        self.connected = true 
      });
      this.socket.on('disconnect', function() { self.connected = false });

      console.log('init...')
      this.socket.emit("howdy", "stranger");

      // create groupid
      this.socket.on("hello", (arg) => {
        console.log('hello', arg);
      });
      
      this.loading = false

      this.saveToLocalStorage()
      
    },
    generate() {
      this.userid = uuidv4();
    },
    reset() {
      this.groupid = uuidv4();
      this.saveToLocalStorage()
    },
    saveToLocalStorage() {
      if (this.groupid) {
        localStorage.setItem('widt-user', JSON.stringify({groupid: this.groupid, userid: this.userid, timestamp: Date.now()}))
      }
    },
    start(name:String) {
      if (this.socket) {
        this.socket.emit('howdy', name)
      }
      console.log(name)
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
}
