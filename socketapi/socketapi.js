import { io, redisPubClient, redisSubClient } from './redisconnection.js'
import * as dataApi from './dataapi.js'
import { createAdapter } from "@socket.io/redis-adapter";
import {l1, l2, l3, l4, log} from './log.js'

// launch socket server

Promise.all([redisPubClient.connect(), redisSubClient.connect()]).then(() => {
  // connected
  io.adapter(createAdapter(redisPubClient, redisSubClient));
  io.listen(3000)
})

io.on('connection', (socket) => {

  /*
  Join Room
  */

  socket.on('joinRoom', async ({ groupid, userid }) => {
    // log
    l1('joinRoom')
    l2({ groupid, userid })
    // connect redis
    
    // get group or create
    await dataApi.getGroup(groupid)
    
    // make sure user is added to group
    if (userid) {
      await dataApi.addToGroup({ groupid, userid })
    }

    // join socket room
    socket.join(groupid)
    
    // sync userdata
    const groupUserData = await dataApi.getGroupUserData(groupid)
    console.log(groupUserData)
    io.to(groupid).emit('groupUserData', groupUserData)

  })

  socket.on('test', (data) => {
    console.log(io.sockets.adapter.rooms)
  })

  /*
  Create User
  */

  socket.on('createUser', async ({ userid, groupid, name }) => {
    // TODO: check first if name exists
    // if (nameExists) {
    //   io.emit('alert', 'Deze naam bestaat al in deze groep.')
    //   return false
    // }
    // monitor
    l3('create user', { userid, groupid, name })
    // get or create user
    const user = await dataApi.getUser({ userid, groupid, name })
    // add to group
    await dataApi.addToGroup({groupid, userid})
    // callback
    io.emit('userCreated', {userid, name})
    // joinroom
    socket.join(groupid)
    // update all
    io.to(groupid).emit('addUser', {userid, name})
  })

  /*
  Submit Answer
  */

  socket.on('submitAnswer', ({key, value}) => {
    // write to mysql

    // update redit user-{userid}

    // send to group

  })

})