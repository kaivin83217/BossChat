import React from 'react'
import { List, Grid } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component{
	static propTypes = {
		selectAvatar: PropTypes.func.isRequired
	}
	constructor(props){
		super(props)
		this.state={
		}
	}
	render(){
		const avatarList = 'boy,girl,mouse,dog,monkey,pig,crayon,pikaqiu'
		.split(',')
		.map(v=>({
			icon:require(`../images/${v}.jpg`),
			text:v
		}))
	const gridHeader = this.state.text?
	<div>
		<span>已选择头像</span>
		<img style={{width:20}} src={this.state.icon} alt=""/>
	</div>
	:<div>请选择头像</div>
		return (
			<div>
		    <List renderHeader={()=>gridHeader}>
		    	<Grid data={avatarList} 
			    columnNum={4}
			    onClick={elm=>{
			    	this.setState(elm)
			    	this.props.selectAvatar(elm.text)
			    }} />
		    </List>
			</div>
		)
	}
}

export default AvatarSelector