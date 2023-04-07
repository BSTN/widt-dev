import { acceptHMRUpdate, defineStore } from 'pinia'
import { io } from "socket.io-client";
import { GroupState } from '~/types/groupStore.d'
import { v4 as uuid } from "uuid";


export const useGroupStore = defineStore('groupStore', {
  state: (): GroupState => ({
    loading: true,
    connected: false,
    groupid: undefined,
    socket: undefined,
    users: []
  }),
  actions: {
    async init() {
      // composable injection
      const { choose } = useNotify()
      // start
      const self = this
      // not on the server please...
      if (process.server) { return false }
      // load localstorage and check if group already exists
      const group = JSON.parse(localStorage.getItem('widt-group') || '{}')
      // group is valid for one day?
      if (group && group.groupid && group.timestamp && group.timestamp > Date.now() - (24 * 60 * 60 * 1000)) {
        const choice = await choose(
          "Je bent op deze computer al eerder een groep begonnen. Wil je met deze groep doorgaan of een nieuwe groep starten?",
          {
            choices: ["nieuwe start", "doorgaan"],
          }
        );
        if (typeof choice === "string" && choice === 'doorgaan') {
          this.groupid = group.groupid
        } else {
          this.groupid = uuid();
        }
      } else {
        this.groupid = uuid();
      }
      // open socket
      this.socket = io('localhost');

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
      this.groupid = uuid();
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
  import.meta.hot.accept(acceptHMRUpdate(useGroupStore, import.meta.hot))
}
