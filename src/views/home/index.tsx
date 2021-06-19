import React from 'react';
import {useHistory} from 'react-router-dom';
import {Box} from "../../common/components";
import styles from "./index.module.scss";

export default function Home() {
    const history = useHistory();

    return (<div className={styles.view}>
        <Box onClick={()=>history.push('/login')}>登录</Box>
        <Box onClick={()=>history.push('/overtime-record')}>记录</Box>
    </div>)
};
