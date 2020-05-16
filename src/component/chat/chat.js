import React from 'react'
import { List, InputItem, NavBar, Icon } from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg, readMsg} from '../../redux/chat.redux'
import { getChatId } from '../../util'
@connect(
		state=>state,
		{getMsgList, sendMsg, recvMsg, readMsg}
)

class Chat extends React.Component{
	constructor(props){
		super(props)
		this.state = {text:'',msg:[]}
	}

	componentDidMount(){
		if(!this.props.chat.chatmsg.length){
			this.props.getMsgList()
			this.props.recvMsg()
		}
		
	}
	componentWillUnmount(){
		const to = this.props.match.params.user
		this.props.readMsg(to)
	}
	handleSubmit(){
		//socket.emit('sendmsg',{text:this.state.text})
		const from = this.props.user._id //本人id
		const to = this.props.match.params.user //对方id
		const msg = this.state.text
		this.props.sendMsg({from, to, msg})
		this.setState({text:''})
	}


	render(){
		const userid = this.props.match.params.user //聊天对象id
		const Item = List.Item
		const users = this.props.chat.users//所有用户
		if(!users[userid]){
			return null
		}
		const chatid = getChatId(userid,this.props.user._id)
		const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid===chatid)//筛选出用户与当前聊天对象的所有信息
		return (
			<div id='chat-page'>
				<NavBar 
				mode='dark'
				icon={<Icon type='left'/>}
				onLeftClick={()=>{
					this.props.history.goBack()
				}}
				>
					{users[userid].name}
				</NavBar>
				<div style={{marginBottom:45,overFlow:'auto'}}>
				{chatmsgs.map(v=>{
					const avatar = require(`../images/${users[v.from].avatar}.jpg`)
					return (//如果是从对方发过来的信息，则显示在左边
						<List key={v._id}>
						{v.from==userid?
							<Item
								thumb={avatar}
							>
							<div className="chatYouMsg">{v.content}</div>
							</Item>: ////否则显示在右边，即本人的显示在右边
							<Item 
								extra={<img src={avatar} alt=""/>}
								className="chat-me"
							><div className="chatMeMsg">{v.content}</div></Item>}
						</List>
						)/*:( //否则显示在右边，即本人的显示在右边
						<List  key={v._id}>
							<Item 
								extra={<img src={avatar} alt=""/>}
								className="chat-me"
							>{v.content}</Item>
						</List>
						)*/
				})}
				</div>
				<div className="stick-footer">
					<List>
						<InputItem
							placeholder='请输入'
							value={this.state.text}
							onChange={v=>{
								this.setState({text:v})
							}}
							extra={<span onClick={()=>this.handleSubmit()}>发送</span>}
						>信息
						</InputItem>
					</List>
				</div>
			</div>
		)
	}
}

export default Chat
