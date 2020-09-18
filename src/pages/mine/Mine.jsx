import React from 'react'
import {connect} from 'react-redux'
import {Button,Modal,message, Layout} from 'antd'

import {checkLogOut, removeAdmin} from './../../api/adminApi'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import logo from './images/logo.png'
import './mine.css'
const {confirm} = Modal;

class Mine extends React.Component{
    
    render(){
        return(
            <div className="mine-header">
                <div className="mine-header-logo">
                    <img src={logo} alt=""/>
                </div>
            </div>
            

        ) 
    }

    // 退出登录
    _logOut(){
        confirm({
            title: '确定退出登录吗?',
            icon: <ExclamationCircleOutlined />,
            content: '鱼儿不能忘记水的拥抱, 你确定要走吗?',
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

export default connect(null,null)(Mine);