import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login, getUserData } from './Auth.redux'
import axios from 'axios'
@connect(
	state=>state.auth,
	{login, getUserData}
)

class Auth extends React.Component{
	/*constructor(props){
		super(props);
		this.state={
			data:{}
		}
	}*/
	componentDidMount(){
		this.props.getUserData()
	}
	render(){
		console.log('tt',this.props)
		return (
			<div>
			<h2>我的名字是{this.props.user}</h2>
			{ this.props.isAuth? <Redirect to='/project'/> : null }
				<h2>Auth Page</h2>
				<button onClick={this.props.login}>登陆</button>
			</div>
		)
	}
}

export default Auth
