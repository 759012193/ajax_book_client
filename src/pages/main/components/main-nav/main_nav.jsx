import React from 'react'
import {Link} from 'react-router-dom'
import {UserOutlined,ReadOutlined,HomeOutlined,AppstoreAddOutlined } from '@ant-design/icons';
import './main_nav.css'
// 引入路由组件
class Main_Nav extends React.Component{
    
    render(){
        return(
            <div className="footer-nav">
                <div className="nav-container">
                <div className="nav-item">
                <Link className="nav-item-link" to="/home">
                    <div className="nav-item-content">
                    <span><HomeOutlined /></span>
                    <span>首页</span>
                    </div>
                </Link>
                </div>
                <div className="nav-item">
                <Link className="nav-item-link" to="/category">
                <div className="nav-item-content">
                    <span><AppstoreAddOutlined /></span>
                    <span>分类</span>
                </div>
                </Link>
                </div>
                <div className="nav-item">
                <Link className="nav-item-link" to="/bookshelf">
                <div className="nav-item-content">
                    <span><ReadOutlined /></span>
                    <span>书架</span>
                </div>
                
                </Link>
                </div>
                <div className="nav-item">
                <Link className="nav-item-link" to="/mine">
                <div className="nav-item-content">
                    <span><UserOutlined /></span>
                    <span>我的</span>
                </div>
                
                </Link>
                </div>
                </div>
            </div>
            
        ) 
    }
}

export default Main_Nav;