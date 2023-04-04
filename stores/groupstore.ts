import { acceptHMRUpdate, defineStore } from 'pinia'
import { io } from "socket.io-client";
import { GroupState } from '~/types/groupStore.d'
import { v4 as uuidv4 } from "uuid";

export const useGroupStore = defineStore('groupStore', {
  state: (): GroupState => ({
    loading: true,
    connected: false,
    groupid: undefined,
    socket: undefined,
  }),
  actions: {
    init() {
      const self = this
      if (process.server) { return false }
      // load localstorage and check if group already exists
      const group = JSON.parse(localStorage.getItem('widt-group') || '{}')
      if (group && group.groupid && group.timestamp && group.timestamp > Date.now() - (24 * 60 * 60 * 1000)) {
        this.groupid = group.groupid
      } else {
        this.groupid = uuidv4();
      }
      // open socket
      this.socket = io('192.168.1.11');

      // connection status
      this.socket.on('connect', function() { 
        self.connected = true 
        if (self.socket) {
          // joinRoom group
          self.socket.emit('joinRoom', self.groupid)
        }
      });
      this.socket.on('disconnect', function() { self.connected = false });

      // this.socket.emit("howdy", "stranger");
      
      this.loading = false

      this.saveToLocalStorage()
      
    },
    reset() {
      this.groupid = uuidv4();
      this.saveToLocalStorage()
    },
    test () {
      if (this.socket) {
        this.socket.emit('test', {data: 'testdata'})
      }
    },
    saveToLocalStorage() {
      if (this.groupid) {
        localStorage.setItem('widt-group', JSON.stringify({groupid: this.groupid, timestamp: Date.now()}))
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
}
