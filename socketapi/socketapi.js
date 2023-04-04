import { Server } from 'socket.io'
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from 'redis';

// launch socket server
const io = new Server(2224)

const pubClient = createClient({ url: 'redis://widt-redis:6379' });
const subClient = pubClient.duplicate();

pubClient.on("error", function (err) {
  console.log("Redis Error:", err);
});

io.adapter(createAdapter(pubClient, subClient));
io.listen(3000);

io.on('connection', (socket) => {

  socket.on('createGroup', (id) => {
    // create mysql

    // create redis group
    pubClient.set(`group-${id}`)
    // join group
    socket.join(id)
  })

  socket.on('joinRoom', async (id) => {
    console.log('joinRoom', id)
    if (pubClient)
    await pubClient.connect()
    const rgroup = await pubClient.get(`group-${id}`)
    console.log("rgroup", rgroup)
    await pubClient.disconnect()
    
    // join socket room
    socket.join(id)

    // continue

  })

  socket.on('test', (data) => {
    console.log(io.sockets.adapter.rooms)
  })

  socket.on('createUser', (id) => {

  })

  socket.on('submitAnswer', ({key, value}) => {
    // write to mysql

    // update redit user-{userid}

    // send to group

  })

  
   
  socket.on('howdy', async (arg) => {
    console.log(arg)
    // await pubClient.connect()
    // const group = pubClient.get('group')
    // console.log('group', group)
    // await pubClient.disconnect()
  })
})