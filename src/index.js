import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import reducers from './reducer'
import './config'  //axios请求拦截器，每次请求数据会经过这个拦截器，用于加载数据时显示加载提示，加载完隐藏
import Login from './container/login/login'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import DashBoard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'
import './index.css'
//import App from './App';


/*import * as serviceWorker from './serviceWorker';*/
const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f
))
/*function BossInfo(){
	return <h2>Boss</h2>
}
*/
ReactDOM.render(
	(<Provider store={store}>
		<BrowserRouter>
			<div>
		    <AuthRoute></AuthRoute>
		    <Switch>
		    		<Route exact path='/' component={Login}></Route>
		  	    <Route path='/bossinfo' component={BossInfo}></Route>
		  	    <Route path='/geniusinfo' component={GeniusInfo}></Route>
						<Route path='/login' component={Login}></Route>
						<Route path='/register' component={Register}></Route>
						<Route path='/chat/:user' component={Chat}></Route>
						<Route component={DashBoard}></Route>
			</Switch>
			</div>
		</BrowserRouter>
	</Provider>), 
	document.getElementById('root'))
