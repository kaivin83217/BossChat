import React from 'react'
import { InputItem, Button, NavBar, TextareaItem } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import AvatarSelector from '../../component/avatarSelector/avatarSelector'
import { update } from '../../redux/user.redux'
@connect(
	state=>state.user,
	{update}
)
class BossInfo extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			title:'',
			company:'',
			money:'',
			desc:'',
		}
	}
	onChange(key,value){
		this.setState({
			[key]:value
		})

	}
	render(){
		return (
			<div>
			{this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:null}
		    <NavBar mode="dark">Boss完善信息</NavBar>
		    <AvatarSelector selectAvatar={(imgname)=>{
		    	this.setState({
		    		avatar:imgname
		    	})}}></AvatarSelector>
		    <InputItem onChange={(v)=>this.onChange('title',v)}>招聘职位</InputItem>
		    <InputItem onChange={(v)=>this.onChange('company',v)}>公司名称</InputItem>
		    <InputItem onChange={(v)=>this.onChange('money',v)}>职位薪资</InputItem>
		    <TextareaItem onChange={(v)=>this.onChange('desc',v)}
		    rows={3}
		    autoHeight
		    title='职位要求'></TextareaItem>
		    <Button onClick={()=>{
		    	this.props.update(this.state)
		    	}}
		   		 type="primary">保存</Button>
			</div>
		)
	}
}

export default BossInfo