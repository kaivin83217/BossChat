import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form/imooc-form'

/*function WrapperHello(Comp){
	class WrapComp extends React.Component{
		componentDidMount(){
			console.log('高阶组件')
		}
		render(){
			return(
				<Comp {this.props}></Comp>
			)
		}
	}
	return WrapComp
}*/
@connect(
	state=>state.user,
	{login}
)
@imoocForm
class Login extends React.Component{
	constructor(props){
		super(props);
		/*this.state = {
			user:'',
			pwd:''
		}*/
		this.handleLogin = this.handleLogin.bind(this)
		this.register = this.register.bind(this)
	}

	/*handleChange(key, value){
		this.setState({
			[key]: value
		})
	}*/
	handleLogin(){
		this.props.login(this.props.state)
	}
	register(){
		this.props.history.push('/register')
	}
	render(){
		return (
				<div>
						{(this.props.redirectTo&&this.props.redirectTo!=='/login')?<Redirect to={this.props.redirectTo}/>:null}
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
							</List>
							<Button type='primary' onClick={this.handleLogin}>登陆</Button>
							<WhiteSpace />
							<Button onClick={this.register} type='primary'>注册</Button>
						</WingBlank>
				</div>
			)
	}
}
export default Login