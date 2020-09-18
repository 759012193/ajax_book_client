import React from 'react'
import {connect} from 'react-redux'
import {isLogin,removeAdmin,checkLogOut} from '../../api/adminApi'
import {Switch, Redirect, Route} from 'react-router-dom'
import {Layout,Button,message,Modal} from 'antd'
import { ExclamationCircleOutlined,UserOutlined,ReadOutlined,HomeOutlined,AppstoreAddOutlined } from '@ant-design/icons';
import Main_Nav from './components/main-nav/main_nav'
import NotFound from './../notfound/NotFound'
import BookShelf from './../bookshelf/BookShelf'
import Category from './../category/Category'
import Mine from './../mine/Mine'
import Home from './../home/Home'
import './main.css'
const {confirm}=Modal
const { Content, Footer} = Layout;
// 引入路由组件
class Main extends React.Component{
    
    render(){
        if(!isLogin()){

            console.log(isLogin());
            // 如果没有登录, 则切换到登录界面
            return <Redirect to={'/login'}/>
        }
        return(
            <Layout className="client-panel">
                <Main_Nav/>
                <Layout className="client-content">
                <Content className="admin-content">
                       <Switch>
                               <Redirect from={"/"} to={"/home"} exact />
                               <Route path={"/home"} component={Home}/>
                               <Route path={"/category"} component={Category}/>
                               <Route path={"/bookshelf"} component={BookShelf}/>
                               <Route path={"/mine"} component={Mine}/>
                               <Route path={"/notfound"} component={NotFound}/>
                               <Redirect to="/notfound" component={NotFound} />
                        </Switch>
                </Content>
                </Layout>
            </Layout>
            
        ) 
    }

    // 退出登录
    _logOut(){
        confirm({
            title: '确定退出登录吗?',
            icon: <ExclamationCircleOutlined />,
            okText: '确定',
            cancelText: '取消',
            onOk: ()=>{
                // 发起退出登录请求
                checkLogOut().then((result)=>{
                    let res = result.data;
                    if(res && res.status === 1){ // 退出登录成功
                        // 清除本地的管理员信息
                        removeAdmin();
                        message.success(res.msg);
                        // 跳转登录界面
                        this.props.history.replace('/login');
                    }else {
                       message.error('退出登录失败, 服务器内部错误!');
                    }
                }).catch((error)=>{
                    console.log(error);
                    message.error('网络出现一点问题!');
                });
            },
            onCancel: ()=>{}
        })
    }
}

export default connect(null,null)(Main);