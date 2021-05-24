import React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import Sider from "./Sider";
import styles from './App.module.scss';
import MainPanel from "./MainPanel";
import {globalData} from "./base";

const App:React.FunctionComponent<RouteComponentProps> = function ({history}) {

    if (globalData.User.isNull){
        history.replace('/login');
        return null;
    }

  return (<div className={styles.app}>
      <Sider/>
      <MainPanel/>
    </div>);
}

export default App;
