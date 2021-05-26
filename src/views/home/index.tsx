import React from 'react';
import {useHistory} from 'react-router-dom';
import {Box} from "../../common/components";

export default function Home() {
    const history = useHistory();

    return (<div>
        <Box onClick={()=>history.push('/login')}>登录</Box>
    </div>)
};
