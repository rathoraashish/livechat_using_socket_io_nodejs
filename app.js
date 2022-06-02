const express = require('express');
const cors = require('cors');
const { Socket } = require('socket.io');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
    cors:{origin:"*"}
})
const path = require('path');
app.use(express.static('public')); 
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../public')));

app.set('view engine', 'ejs');
app.use(cors());

app.get('/chat',(req,res)=>{
    res.render('index');
});

server.listen(3001,()=>{
    console.log("Server is running on port 3001")
})

io.on("connection",(socket)=>{
    console.log("Socket id is: ",socket.id)

    socket.on('message',(data,room) => {
        console.log("This is room id",room);
        if(room === ''){
            socket.broadcast.emit('message',data)     
        }else{
            socket.to(room).emit('message',data);
        }
    })
})
