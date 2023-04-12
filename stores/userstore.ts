import { acceptHMRUpdate, defineStore } from 'pinia'
import { io } from "socket.io-client";
import { UserState } from '~/types/userStore.d'
import { identicon } from "minidenticons";

export const useUserStore = defineStore('userStore', {
  state: (): UserState => ({
    loading: true,
    connected: false,
    groupid: '',
    userid: '',
    name: '',
    socket: undefined,
    creating: false
  }),
  getters: {
    icon(state): String {
      return state.userid ? identicon(state.userid, 50, 50) : '';
    }
  },
  actions: {
    init() {
      const self = this
      const route = useRoute();
      const router = useRouter();
      if (process.server) { return false }
      // load localstorage and check if group already exists
      const user = JSON.parse(localStorage.getItem('widt-user') || '{}')
      if (user && user.timestamp && user.timestamp > Date.now() - (24 * 60 * 60 * 1000)) {
        this.groupid = user.groupid
        this.userid = user.userid
      }
      // TODO:
      if (user.groupid !== route.query.id) {
        this.groupid = route.query.id || ''
        this.userid = user.userid
        this.saveToLocalStorage()
      }
      // open socket
      const Socket = useSocket()

      // connection status
      Socket.on('connect', function () {
        // join the room
        if (self.groupid !== '' && self.userid !== '' && self.socket) {
          self.socket.emit('joinRoom', {
            groupid: self.groupid,
            userid: self.userid
          })
        }
        self.connected = true
      });
      Socket.on('disconnect', function () { self.connected = false });

      // message from socketmaster
      Socket.on("goto", (url) => {
        router.push(url)
      });

      Socket.on('alert', (message) => {
        const { alert } = useNotify()
        alert(message)
      })

      Socket.on('userCreated', ({userid,name}) => {
        self.creating = false
        self.userid = userid
        self.name = name
        self.saveToLocalStorage()
      })
      
      this.loading = false

      this.saveToLocalStorage()
      
    },
    tempIcon(id: String) {
      return id ? identicon(id, 50, 50) : '';
    },
    setGroupid(id: String) {
      this.groupid = id
    },
    test() {
      const Socket = useSocket()
      Socket.emit('test')
    },
    reset() {
      this.userid = '';
      this.saveToLocalStorage()
    },
    saveToLocalStorage() {
      if (this.groupid) {
        localStorage.setItem('widt-user', JSON.stringify({ groupid: this.groupid, userid: this.userid, timestamp: Date.now() }))
      }
    },
    start({ name, userid }:{ name: String, userid: String }) {
      const Socket = useSocket()
      const self = this
      if (!name || name.trim() === '') {
        const { alert } = useNotify()
        alert('Voer eerst een naam in.')
      } else {
        self.creating = true
        Socket.emit('createUser', { userid, groupid: this.groupid, name })
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
