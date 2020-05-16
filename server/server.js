const express = require('express') 
const utils =require('utility')
const bodyParser = require('body-parser') //需要使用body-parser的中间件来执行，使post请求可以通过req.body获取请求的参数（get请求直接可以用req.query获取请求的参数，post不行）
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')
const app = express()
//work with express
const server = require('http').Server(app)
const io = require('socket.io').listen(server)
io.on('connection',function(socket){
	socket.on('sendmsg',function(data){
		const {from, to, msg} = data
		const chatid = [from,to].sort().join('_')
		Chat.create({chatid,from,to,content:msg},function(err,doc){ //往数据库写入信息
			io.emit('recvmsg',Object.assign({},doc._doc))
		})
		/*console.log(data)
		io.emit('recvmsg',data)*/
	})
	
})

const userRouter =require('./user')


app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)
server.listen(82, function(){
	console.log('Node app start at port 82')
})