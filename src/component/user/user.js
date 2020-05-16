import React from 'react'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import browserCookie from 'browser-cookies'
import { connect } from 'react-redux'
import { logoutSubmit } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
 
@connect(
	state=>state.user,
	{logoutSubmit}
)
class User extends React.Component{
 constructor(props){
 		super(props)
 		this.state ={}
 		this.handleLogOut = this.handleLogOut.bind(this) 
 	}

 	handleLogOut(){
 		const alert = Modal.alert
    alert('注销', '确认退出登陆吗?', [
          { text: '取消'},
          { text: '确定', onPress: () => {
          	browserCookie.erase('userid')
           	this.props.logoutSubmit()
           	//window.location.href = window.location.href
           }}
      ])
 	}
	render(){
		const props = this.props
		const Item = List.Item
		const Brief = Item.Brief
		return(
		props.user?
			(<div>
				<Result
					img={<img src={require(`../images/${this.props.avatar}.jpg`)} alt=""/>}
					title={props.user}
					message={props.type==='boss'?props.company:null}
				/>
				<List renderHeader={()=>'简介'}>
					<Item	
						multipleLine
					>
						{props.title}
						{props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
						{props.money?(<Brief>薪资:{props.money}</Brief>):null}
					</Item>
				</List>
				<WhiteSpace></WhiteSpace>
				<List>
					<Item style={{zIndex:1}} onClick={this.handleLogOut}>退出登录</Item>
				</List>
			</div>):<Redirect to={props.redirectTo} />
		)
	}
}
export default User