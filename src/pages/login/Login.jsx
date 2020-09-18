import React from 'react'
import {connect} from 'react-redux'
import { Form, Input, Button,message} from 'antd';
import { UserOutlined, LockOutlined ,ReadFilled,WechatFilled,AlipayCircleFilled} from '@ant-design/icons';
import {checkLogin,checkLogOut} from './../../api/adminApi'
import md5 from 'blueimp-md5';
import config from './../../config/config';
import {saveObj} from './../../tools/cache-tool';
import { Row, Col } from 'antd';
import './css/reset.css';
import './css/login.css';

class Login extends React.Component{


    render(){

        
        const onFinish = values => {
            
            console.log('表单提交的数据: ', values);
            // 1. 对密码进行MD5加密
            const md5_pwd = md5(values.password, config.KEY);
            // 2. 发起登录请求
            checkLogin(values.account, md5_pwd).then((result)=>{
                let res = result.data;
                console.log(res);
                // 2.1 判断
                if(res && res.status === 1){
                     // 提示用户
                     message.success(res.msg);
                     // 把登录信息本地化
                    saveObj(config.AJAX_ADMIN_KEY,res.data);
                    // 跳转到主面板
                    this.props.history.replace('/');
                }else {
                    message.warn(res.msg);
                }
            }).catch((error)=>{
                // console.log(error);
                message.error('网络出现一点问题!');
            });
        };

        return(
            <div className="login-wrapper">
                <div className="wrapper">
                    <div className="wrap">
                        <div className="layout_panel">
                            <div className="layout">
                                <div className="mainbox">
                                    <div className="lgnheader">
                                        <div className="header_tit t_c">
                                            <ReadFilled className="header-logo"/>
                                            <h4 className="header_tit_txt">爬爬帐号登录</h4>
                                            <div className="site_info"></div>
                                        </div>
                                    </div>
                                    <div className="tabs-con tabs_con now">
                                        <div>
                                            <div className="login_area">
                                            <Form
                                                name="normal_login"
                                                className="login-form"
                                                onFinish={onFinish}
                                            >
                                                    <div className="loginbox c_b">
                                                        <div className="lgn_inputbg c_b login-panel pwdLogin">
                                                            <Form.Item
                                                                name="account"
                                                                rules={[{ required: true, message: '账户名不能为空!' }]}
                                                                
                                                            >
                                                                <Input  className="login-form-input" style={{height:38,borderRadius:20}} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入账户名" />
                                                            </Form.Item>

                                                            <Form.Item
                                                                name="password"
                                                                rules={[{ required: true, message: '密码不能为空!' }]}
                                                            >
                                                                <Input.Password className="login-form-input"
                                                                    style={{height:38,borderRadius:20}}
                                                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                                                    type="password"
                                                                    placeholder="请输入密码"
                                                                />
                                                            </Form.Item>
                                                        </div>
                                                        <Form.Item>
                                                            <Button type="primary" 
                                                            style={{height:38,borderRadius:20,background: "#000"}}
                                                            htmlType="submit" 
                                                            className="login-form-button">
                                                                登录
                                                            </Button>
                                                        </Form.Item>
                                                        <div className="other_panel clearfix">
                                                            
                                                            <div className="reverse">
                                                                <div className="n_links_area">
                                                                    <a  className="outer-link" onClick={()=>{
                                                                        message.success("注册成功！")
                                                                    }}>立即注册</a>
                                                                    <a href="/out" className="outer-link">忘记密码</a>
                                                                </div>
                                                                <div className="other_login_type sns-login-container">
                                                                    <fieldset className="oth_type_tit">
                                                                        <legend className="oth_type_txt">其他方式登录</legend>
                                                                    </fieldset>
                                                                    <div className="oth_type_links" style={{display: 'flex'}}>
                                                                        <WechatFilled className="other_type"/>
                                                                        <WechatFilled className="other_type"/>
                                                                        <WechatFilled className="other_type"/>
                                                                        <WechatFilled className="other_type"/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="custom_display_4" className="n-footer">
                    <div className="nf-link-area clearfix">
                        <ul class="lang-select-list">
                            <li><a href="" data-lang="zh_CN" className="lang-select-li current">简体</a>|</li>
                            <li><a href="" data-lang="zh_TW" className="lang-select-li">繁体</a>|</li>
                            <li><a href="" data-lang="en" className="lang-select-li">English</a>|</li>
                            <li><a href="" target="_blank">常见问题</a></li>
                        </ul>
                    </div>
		        </div>
            </div>
        )
    }
}

export default connect(null,null)(Login);