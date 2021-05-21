import React from "react";
import {Link} from "react-router-dom";
import {Menu} from "antd";
import styles from  './Sider.module.scss';

const saveKey:string = 'menu-default-select-key';
const defaultSelectedKey = getDefaultSelectKey();

export default function Sider(){
    return <Menu className={styles.sider}
                 onClick={({ item, key })=>{
                     setDefaultSelectKey(key);
                 }}
                 defaultSelectedKeys={[defaultSelectedKey]}
                 style={{width:240}}>
        <Menu.Item key='0'>
            <Link to='/home'>首页</Link>
        </Menu.Item>
        <Menu.Item key='1'>
            <Link to='/overtime-record'>加班记录</Link>
        </Menu.Item>
    </Menu>
}

function getDefaultSelectKey(){
    const value = localStorage.getItem(saveKey);
    if(value) return value;
    localStorage.setItem(saveKey,'0');
    return '0';
}

function setDefaultSelectKey(value: string | number){
    localStorage.setItem(saveKey,value.toString())
}
