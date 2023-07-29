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
    mounted: false,
    loading: true,
    connected: false,
    groupid: '',
    userid: '',
    name: '',
    position: 0,
    socket: undefined,
    creating: false,
    users: [],
    answers: [],
    finished: [],
    started: []
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
    },
    getAnswer(state) {
      return ({ chapter, k }:{chapter:String, k: Number}) => {
        const found = state.answers.find(x => x.chapter === chapter && x.k === k)
        if (found === undefined) { return null }
        return found.answer
      }
    },
    getChapterPosition(state) {
      return (chapter: String) => {
        const index = state.answers.findLastIndex(x => x.chapter === chapter) 
        if (index === -1) return 0
        return index + 1
      }
    }
  },
  actions: {
    init() {
      this.mounted = true
      const self = this
      const route = useRoute();
      const router = useRouter();
      if (process.server) { return false }
      // load localstorage and check if group already exists
      const user = JSON.parse(localStorage.getItem('widt-user') || '{}')
      // if (user && user.timestamp && user.timestamp > Date.now() - (24 * 60 * 60 * 1000)) {
      if (user) {
        this.groupid = user.groupid
        this.userid = user.userid
        this.name = user.name
        this.answers = user.answers
      }
      // TODO:
      if (route.query.id && user.groupid !== route.query.id) {
        this.groupid = route.query.id || ''
        this.userid = ''
        this.name = ''
        this.answers = []
        this.position = 0
        this.saveToLocalStorage()
      }
      // open socket
      const Socket = useSocket()

      // connection status
      Socket.on('connect', function () {
        console.log('%c Socket connected.', 'color:yellow;')
        // join the room
        if (self.groupid !== '' && self.userid !== '') {
          Socket.emit('joinRoom', {
            groupid: self.groupid,
            userid: self.userid
          })
        }
        Socket.emit('getGroupData', {groupid: self.groupid})
        self.connected = true
      });
      Socket.on('disconnect', function () { self.connected = false });

      Socket.on('groupUserData', (data) => {
        this.users = data
      })

      Socket.on('addUser', (data) => {
        console.log('Add User!', data)
      })

      Socket.on('loadGroupData', (data) => {
        this.started = data.started
        for (let i in data.finished) {
          if (data.finished[i].includes(this.userid)) {
            if (!self.finished.includes(i)) { self.finished.push(i) }
          }
        }
      })

      // message from socketmaster
      Socket.on("goto", (position) => {
        // console.log('goto', position, order[position].user)
        console.log('goto', position)
        const router = useRouter()
        router.push('/deelnemer/' + order[position].user)
        self.position = position
        // navigateTo(order[position].user)
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

      Socket.on('setStartChapter', ({ userid, name, groupid }) => {
        if (!self.started.includes(name)) {
          self.started.push(name)
        }
      })

      Socket.on('setUnStartChapter', ({ userid, name, groupid }) => {
        if (self.started.includes(name)) {
          self.started.splice(self.started.indexOf(name), 1)
        }
      })

      Socket.on('setFinished', ({ userid, name, groupid }) => {
        if (!self.finished.includes(name)) {
          self.finished.push(name)
        }
      })

      Socket.on('setUnFinished', ({ userid, name, groupid }) => {
        if (self.finished.includes(name)) {
          self.finished.splice(self.finished.indexOf(name), 1)
        }
      })
      
      Socket.on('grouptest', (data) => {
        console.log('grouptest', data)
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
    finish(name: String) {
      if (!this.finished.includes(name)) {
        // add to finished
        this.finished.push(name)
      }
      // send to server
      const Socket = useSocket()
      Socket.emit('finish', {userid: this.userid, groupid: this.groupid, name: name})
    },
    unFinish(name: String) {
      if (this.finished.includes(name)) {
        this.finished.splice(this.finished.indexOf(name), 1)  
      }
      const Socket = useSocket()
      Socket.emit('unFinish', { userid: this.userid, groupid: this.groupid, name: name })
    },
    async setAnswer({ chapter, k, answer }:{chapter:String, k:Number, answer:any}) {
      const key = this.answers.findIndex(x => x.chapter === chapter && x.k === k)
      if (key === -1) {
        this.answers.push({chapter, k, answer})
      } else {
        this.answers[key] = { chapter, k, answer }
      }
      this.saveToLocalStorage()
      const Socket = useSocket()
      await Socket.emit('setAnswer', {groupid: this.groupid, userid: this.userid, chapter, k, answer, name: this.name})
    },
    async reset() {
      // sure ?

      const { confirm } = useNotify()
      const sure = await confirm('Weet je zeker dat je het spel wilt verlaten?')
      if (sure) {
        const done = await asyncEmit('removeUser', { groupid: this.groupid, userid: this.userid })
        if (done) {
          this.userid = '';
          this.name = '';
          this.answers = [];
          this.saveToLocalStorage()
          const router = useRouter()
          router.push('/') // to landing page?
        }
      }
    },
    saveToLocalStorage() {
      if (this.groupid) {
        localStorage.setItem('widt-user', JSON.stringify({ groupid: this.groupid, userid: this.userid, name: this.name, answers: this.answers, timestamp: Date.now() }))
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
