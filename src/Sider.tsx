import React, {useCallback, useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {Menu} from "antd";
import styles from  './Sider.module.scss';

const saveKey:string = 'menu-default-select-key';

export default function Sider(){
    const history = useHistory();
    const [selectedKey,setSelectedKey] = useState<string>("");

    const setKey = useCallback((k)=>{
        setDefaultSelectKey(k);
        setSelectedKey(k);
    },[])

    useEffect(()=>{
        return history.listen((location)=>{
            setKey(location.pathname);
        });
    },[history,setKey])

    useEffect(()=>{
        setSelectedKey(getDefaultSelectKey);
    },[])

    return <Menu className={styles.sider}
                 onClick={({ item, key })=>{
                     setKey(key.toString())
                 }}
                 selectedKeys={[selectedKey]}
                 style={{minWidth:240}}>
        <Menu.Item key='/home'>
            <Link to='/home'>首页</Link>
        </Menu.Item>
        <Menu.Item key='/overtime-record'>
            <Link to='/overtime-record'>记录</Link>
        </Menu.Item>
    </Menu>
}

function getDefaultSelectKey(){
    const value = localStorage.getItem(saveKey);
    if(value) return value;
    localStorage.setItem(saveKey,'/home');
    return '/home';
}

export function setDefaultSelectKey(value: string | number){
    localStorage.setItem(saveKey,value.toString())
}
