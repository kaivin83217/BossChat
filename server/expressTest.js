const express = require('express');
const app = express();
app.use(express.static('server',{maxAge:1000*3000}));	
const server = require('http').Server(app)
server.listen(3000, function(){
	console.log('Node app start at port 3000')
})