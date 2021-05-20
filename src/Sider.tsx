import React from "react";
import {Link} from "react-router-dom";
import {Menu} from "antd";
import styles from  './Sider.module.scss';

export default function Sider(){
    return <Menu className={styles.sider}
                 onClick={console.log}
                 defaultSelectedKeys={['0']}
                 style={{width:240}}>
        <Menu.Item key='0'>
            <Link to='/home'>首页</Link>
        </Menu.Item>
        <Menu.Item key='1'>
            <Link to='/overtime-record'>加班记录</Link>
        </Menu.Item>
    </Menu>
}
