import React from "react";
import {Link} from "react-router-dom";
import {Menu} from "antd";
import styles from  './Sider.module.scss';

const saveKey:string = 'menu-default-select-key';

export default function Sider(){
    return <Menu className={styles.sider}
                 onClick={({ item, key })=>{
                     setDefaultSelectKey(key);
                 }}
                 defaultSelectedKeys={[getDefaultSelectKey()]}
                 style={{width:240}}>
        <Menu.Item key='0'>
            <Link to='/home'>首页</Link>
        </Menu.Item>
        <Menu.Item key='1'>
            <Link to='/overtime-record'>记录</Link>
        </Menu.Item>
    </Menu>
}

function getDefaultSelectKey(){
    const value = localStorage.getItem(saveKey);
    if(value) return value;
    localStorage.setItem(saveKey,'0');
    return '0';
}

export function setDefaultSelectKey(value: string | number){
    localStorage.setItem(saveKey,value.toString())
}
