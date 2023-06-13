import { acceptHMRUpdate, defineStore } from 'pinia'
import { GroupState } from '~/types/groupStore.d'
import { v4 as uuid } from "uuid";
import order from '~/content/order.yml'

export const useGroupStore = defineStore('groupStore', {
  state: (): GroupState => ({
    loading: true,
    connected: false,
    groupid: undefined,
    position: 0,
    users: [],
    mounted: false,
    finished: {}
  }),
  actions: {
    async init() {
      this.mounted = true
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
          router.push("/group")
          // create group id
          this.groupid = uuid();
        }
      } else {
        // start over
        router.push("/group")
        // create group id
        this.groupid = uuid();
      }

      const Socket = useSocket()

      // connection status
      Socket.on('connect', function() { 
        self.connected = true 
        // always join room on connect
        Socket.emit('joinRoom', { groupid: self.groupid })
        // retrieve all user data
        Socket.emit('getAllUserData', { groupid: self.groupid })
      });
      // notifications:
      Socket.on('error', function () {
        console.warn('ERROR!')
      })
      Socket.on('ping', function () {
        console.warn('ping!')
      })
      Socket.on('reconnect', function () {
        console.warn('reconnect!')
      })
      Socket.on('reconnect_attempt', function () {
        console.warn('reconnect_attempt!')
      })
      Socket.on('reconnect_error', function () {
        console.warn('reconnect_error!')
      })
      Socket.on('reconnect_failed', function () {
        console.warn('reconnect failed!')
      })
      // goto url
      Socket.on('goto', (position) => {
        self.position = position
      })

      // addUser
      Socket.on('addUser', ({ userid, name }) => {
        // check if user exists
        this.users.push({userid, name, answers: []})
      })
      // receive groupUserData
      Socket.on('groupUserData', (data) => {
        this.users = data
      })

      Socket.on('setFinished', ({ userid, name, groupid }) => {
        if (!(name in self.finished)) { self.finished[name] = [userid] }
        if (!self.finished[name].includes(userid)) { self.finished[name].push(userid) }
      })

      Socket.on('setUnFinished', ({ userid, name, groupid }) => {
        if (!(name in self.finished)) { self.finished[name] = [] }
        if (self.finished[name].includes(userid)) { self.finished[name].splice(self.finished[name].indexOf(userid), 1) }
      })
      
      // do something?
      Socket.on('disconnect', function() { self.connected = false });
      
      this.loading = false

      this.saveToLocalStorage()
      
    },
    reset() {
      this.groupid = uuid();
      this.saveToLocalStorage()
    },
    prev() {
      const Socket = useSocket()
      Socket.emit('prev', { groupid: this.groupid})
    },
    next() {
      const Socket = useSocket()
      Socket.emit('next', { groupid: this.groupid }, () => {
        console.log('callback!')
      })
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
