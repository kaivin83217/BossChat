import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form/imooc-form'

@connect(
	state=>state.user,
	{register}
)
@imoocForm
class Register extends React.Component{
	constructor(props){
		super(props)
		/*this.state ={
			user:'',
			pwd:'',
			repaetpwd:'',
			type:'genius' //或boss
		}*/
		this.handleRegister = this.handleRegister.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
	}
	
componentDidMount(){
	this.props.handleChange('type','genius')
}
	/*handleChange(key, value){
		this.setState({
			[key]: value
		})
	}*/
	handleRegister(){
		this.props.register(this.props.state)
	}
	handleLogin(){
		this.props.history.push('/login')
	}

	render(){
		const RadioItem = Radio.RadioItem
			return (
				<div>
						{this.props.redirectTo&&this.props.redirectTo!=='/login'?<Redirect to={this.props.redirectTo}/>:null}
						<Logo></Logo>
						<WingBlank>
							<List>
							{this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
								<InputItem
									onChange={ v=>this.props.handleChange('user',v)}>用户名</InputItem>
								<WhiteSpace />
								<InputItem
									type="password"
									onChange={ v=>this.props.handleChange('pwd',v)}>密码</InputItem>
								<WhiteSpace />
								<InputItem
									type="password"
									onChange={ v=>this.props.handleChange('repeatpwd',v)}>确认密码</InputItem>
								<WhiteSpace />
								<RadioItem 
									checked={this.props.state.type==='genius'}
									onChange={ ()=>this.props.handleChange('type','genius')}>牛人</RadioItem>
								<WhiteSpace />
								<RadioItem 
								checked={this.props.state.type==='boss'}
								onChange={ ()=>this.props.handleChange('type','boss')}>BOSS</RadioItem>
							</List>
							<Button type='primary' onClick={this.handleRegister}>注册</Button>
							<WhiteSpace />
							<Button type='primary' onClick={this.handleLogin}>返回登陆</Button>
							<WhiteSpace />
						</WingBlank>
				</div>
			)
	}
}
export default Register