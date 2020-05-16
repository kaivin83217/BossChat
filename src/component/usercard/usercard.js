import React from 'react'
import PropTypes from 'prop-types'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

@withRouter
class UserCard extends React.Component{
	static propTypes = {
		userlist:PropTypes.array.isRequired
	}
	handleClick(v){
		this.props.history.push(`/chat/${v._id}`)
	}
	render(){
		const { Header, Body } = Card
		return(
		<WingBlank>
		<WhiteSpace></WhiteSpace>
			{this.props.userlist.map(v=>(
				v.avatar?
					(	
						<Card key={v._id}
						onClick={()=>this.handleClick(v)}>
						<Header
							title={v.user}/*boss对应牛人列表用户名，牛人对应boss用户名*/
							thumb={require(`../images/${v.avatar}.jpg`)}/*头像*/
							extra={<span>{v.title}</span>}/*职位名称*/
						></Header>
						<Body>
						{v.type==='boss'?(<div>公司:{v.company}</div>):null}
						{v.desc.split('\n').map(item=>(
							<div key={item}>{item}</div>))}
						{v.type==='boss'?(<div>薪资:{v.money}</div>):null}{/*发布岗位的薪资*/}
						</Body>
					</Card>):null
				))}
			<WhiteSpace></WhiteSpace>
		</WingBlank>
		)
	}
}
export default UserCard