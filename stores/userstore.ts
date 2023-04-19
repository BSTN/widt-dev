import { acceptHMRUpdate, defineStore } from 'pinia'
import { io } from "socket.io-client";
import { UserState } from '~/types/userStore.d'
import { identicon } from "minidenticons";
import order from '~/content/order.yml'

function asyncEmit(func: string, data?:Object) {
  const Socket = useSocket()
  return new Promise((resolve) => {
    Socket.emit(func, data, (returnData?:[Object,Boolean,string]) => {
      resolve(returnData)
    })
  })
}

export const useUserStore = defineStore('userStore', {
  state: (): UserState => ({
    loading: true,
    connected: false,
    groupid: '',
    userid: '',
    name: '',
    position: 0,
    socket: undefined,
    creating: false,
    users: []
  }),
  getters: {
    icon(state): String {
      return state.userid ? identicon(state.userid, 50, 50) : '';
    },
    user(state) {
      return {
        userid: state.userid,
        name: state.name,
      }
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
        this.name = user.name
      }
      // TODO:
      if (route.query.id && user.groupid !== route.query.id) {
        this.groupid = route.query.id || ''
        this.userid = ''
        this.saveToLocalStorage()
      }
      // open socket
      const Socket = useSocket()

      // connection status
      Socket.on('connect', function () {
        // join the room
        if (self.groupid !== '' && self.userid !== '') {
          Socket.emit('joinRoom', {
            groupid: self.groupid,
            userid: self.userid
          })
        }
        self.connected = true
      });
      Socket.on('disconnect', function () { self.connected = false });

      Socket.on('groupUserData', (data) => {
        console.log(data)
        // const newdata = data.map(x => {
        //   return {
        //     id: x.id,
        //     name: x.name
        //   }
        // })
        this.users = data
      })

      // message from socketmaster
      Socket.on("goto", (url) => {
        console.log('goto', url)
        console.log(order.order)
        // router.push(url)
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
    async reset() {
      const Socket = useSocket()
      const done = await asyncEmit('removeUser', { groupid: this.groupid, userid: this.userid })
      if (done) {
        this.userid = '';
        this.saveToLocalStorage()
      }
    },
    saveToLocalStorage() {
      if (this.groupid) {
        localStorage.setItem('widt-user', JSON.stringify({ groupid: this.groupid, userid: this.userid, name: this.name, timestamp: Date.now() }))
      }
    },
    async createUser({ name, userid }:{ name: String, userid: String }) {
      const self = this
      if (!name || name.trim() === '') {
        const { alert } = useNotify()
        alert('Voer eerst een naam in.')
      } else {
        self.creating = true
        const done = await asyncEmit('createUser', { userid, groupid: this.groupid, name })
        if (done) { 
          self.userid = userid
          self.name = name
          self.saveToLocalStorage()
        }
      }
      return true
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
