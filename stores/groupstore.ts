import { acceptHMRUpdate, defineStore } from 'pinia'
import { GroupState } from '~/types/groupStore.d'
import { v4 as uuid } from "uuid";

export const useGroupStore = defineStore('groupStore', {
  state: (): GroupState => ({
    loading: true,
    connected: false,
    groupid: undefined,
    users: []
  }),
  actions: {
    async init() {
      // composable injection
      const { choose } = useNotify()
      const router = useRouter()
      // start
      const self = this
      // not on the server please...
      if (process.server) { return false }
      // load localstorage and check if group already exists
      const group = JSON.parse(localStorage.getItem('widt-group') || '{}')
      // TODO: group is valid for one day?
      if (group && group.groupid && group.timestamp && group.timestamp > Date.now() - (24 * 60 * 60 * 1000)) {
        const choice = await choose(
          "Je bent op deze computer al eerder een groep begonnen. Wil je met deze groep doorgaan of een nieuwe groep starten?", { choices: ["nieuwe start", "doorgaan"] }
        );
        if (typeof choice === "string" && choice === 'doorgaan') {
          this.groupid = group.groupid
        } else {
          // start over
          router.push("/start")
          // create group id
          this.groupid = uuid();
        }
      } else {
        // start over
        router.push("/start")
        // create group id
        this.groupid = uuid();
      }

      const Socket = useSocket()

      // connection status
      Socket.on('connect', function() { 
        self.connected = true 
        // always join room on connect
        Socket.emit('joinRoom', { groupid: self.groupid })
      });
      Socket.on('goto', (url) => {
        console.log('goto', url)
      })
      Socket.on('addUser', ({ userid, name }) => {
        this.users.push({userid, name, answers: []})
      })
      Socket.on('groupUserData', (data) => {
        this.users = data
      })
      Socket.on('disconnect', function() { self.connected = false });
      
      this.loading = false

      this.saveToLocalStorage()
      
    },
    reset() {
      this.groupid = uuid();
      this.saveToLocalStorage()
    },
    test () {
      const Socket = useSocket()
      Socket.emit('test', {data: 'testdata'})
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
