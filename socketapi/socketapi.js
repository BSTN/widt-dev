import { io, redisPubClient, redisSubClient } from './redisconnection.js'
import * as dataApi from './dataapi.js'
import { createAdapter } from "@socket.io/redis-adapter";
import { l1, l2, l3, l4, log } from './log.js'
import express from 'express'

const app = express()

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
    const group = await dataApi.getGroup(groupid)
    
    // make sure user is added to group
    if (userid) {
      await dataApi.addToGroup({ groupid, userid })
    }

    socket.emit('goto', group.position)

    // join socket room
    socket.join(groupid)

  })

  socket.on('removeUser', async ({ groupid, userid }, callback) => {
    
    const done = await dataApi.removeUser({ groupid, userid }).catch(() => {
      callback(false)
    })

    const groupUserData = await dataApi.getGroupUserData(groupid)
    io.to(groupid).emit('groupUserData', groupUserData)

    callback(true)

  })

  socket.on('getAllUserData', async ({ groupid }) => {
      // sync userdata
    const groupUserData = await dataApi.getGroupUserData(groupid)
    // send userdata to group
    console.log('groupUserData', groupUserData)
    io.emit('groupUserData', groupUserData)
  })

  socket.on('test', (data) => {
    console.log(io.sockets.adapter.rooms)
  })

  /*
  Create User
  */

  socket.on('createUser', async ({ userid, groupid, name }, cb) => {
    // TODO: check first if name exists
    // if (nameExists) {
    //   io.emit('alert', 'Deze naam bestaat al in deze groep.')
    //   return false
    // }
    // monitor
    l3('create user', { userid, groupid, name })
    // (get or) create user
    const user = await dataApi.getUser({ userid, groupid, name })
    // add to group
    await dataApi.addToGroup({groupid, userid})
    // joinroom
    socket.join(groupid)
    // update all
    io.to(groupid).emit('addUser', { userid, name })
    // send groupuserdata
    const groupUserData = await dataApi.getGroupUserData(groupid)
    io.to(groupid).emit('groupUserData', groupUserData)
    // done
    cb(true)
  })

  socket.on('prev', async ({ groupid }, cb) => {

    l1('prev')

    const group = await dataApi.getGroup(groupid)

    group.position = group.position === 0 ? 0 : parseInt(group.position) - 1

    await dataApi.writeGroup(group)

    io.to(groupid).emit('goto', group.position)

    if (cb) { cb() }

  })

  socket.on('next', async ({ groupid }, cb) => {
     
    l1('next')

    const group = await dataApi.getGroup(groupid)

    group.position = parseInt(group.position) + 1

    await dataApi.writeGroup(group)

     io.to(groupid).emit('goto', group.position)

     if (cb) { cb() }

  })

  /*
  Submit Answer
  */

  socket.on('setAnswer',  async ({groupid, userid, chapter, k, answer, name}) => {

    // update redit user-{userid}
    await dataApi.writeAnswer({groupid, userid, chapter, k, answer, name})

    // send to group
    io.to(groupid).emit('updateAnswer', {userid, chapter, k, answer})

  })

  /*
  toggle finished state of chapter
  */

  socket.on('finish', async ({ groupid, userid, name }) => {
    console.log('finish', userid)
    // write finished state
    // await dataApi.setFinished({ groupid, userid, name })
    // update state to group
    io.to(groupid).emit('setFinished', {userid, name, groupid})
  })
  socket.on('unFinish', async ({ groupid, userid, name }) => {
    console.log('unFinish', userid)
    // write finished state
    // await dataApi.setFinished({ groupid, userid, name })
    // update state to group
    io.to(groupid).emit('setUnFinished', {userid, name, groupid})
  })
})



app.get('/', async (req, res) => {
  const groupKeys = await redisPubClient.keys("group-*")
  const groups = []
  for (let i in groupKeys) { groups.push(JSON.parse(await redisPubClient.get(groupKeys[i]))) }
  const userKeys = await redisPubClient.keys("user-*")
  const users = []
  for (let i in userKeys) { users.push(JSON.parse(await redisPubClient.get(userKeys[i]))) }
  res.send({groups, users})
})

app.listen(80)