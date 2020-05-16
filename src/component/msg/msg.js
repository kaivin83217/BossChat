import React from 'react'
import {connect} from 'react-redux'
import { List, Badge } from 'antd-mobile'
@connect(
	state=>state
)
class Msg extends React.Component{
	getLast(arr){ 
		return arr[arr.length-1]
	}
	render(){
		//if(!this.props)
		const Item = List.Item
		const Brief = Item.Brief
		const userid = this.props.user._id //本人id
		const userinfo = this.props.chat.users//所有用户
		const msgGroup = {}
		this.props.chat.chatmsg.forEach(v=>{
			msgGroup[v.chatid] = msgGroup[v.chatid] || []
			msgGroup[v.chatid].push(v)  //将本人与不同人的聊天记录分组存放
		})
		const chatList =Object.values(msgGroup).sort((a,b)=>{ //根据时间进行降序排列，也就是最后发消息的组排在前头
			const a_last = this.getLast(a).create_time  //获取聊天组a最后一条信息的时间
			const b_last = this.getLast(b).create_time  //获取聊天组b最后一条信息的时间
			return b_last - a_last
		})
		//按照聊天用户分组，根据chatid
		return (
			<div>
				
					{chatList.map(v=>{
						const lastItem = this.getLast(v) //获取每个聊天组最后一条信息的相关信息
						const targetId = v[0].from===userid?v[0].to:v[0].from //targetId是与本人聊过天的人的id，如果是本人from发信息给别人to，即from=本人id，则targetId=to，若是别人from发信息给本人to，即，targetid=from
						const unreadNum = v.filter(v=>!v.read&&v.to===userid).length//筛选出发给本人的信息中未读信息数量
						if(!userinfo[targetId]){//如果本人还没有与其他人聊天则列表显示为空
							return null
						}
						return(
							<List key={lastItem._id}>
								<Item 
									extra={<Badge text={unreadNum}></Badge>}
									thumb={require(`../images/${userinfo[targetId].avatar}.jpg`)}
									arrow="horizontal"
									onClick={()=>{
										this.props.history.push(`/chat/${targetId}`)
									}}
								>
								<Brief>{userinfo[targetId].name}</Brief>
								{lastItem.content}
								</Item>
							</List>
						)
					})}
				
			</div>
			)
	}
}
export default Msg 