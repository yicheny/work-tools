import React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import _ from 'lodash';
import Sider from "./Sider";
import styles from './App.module.scss';
import MainPanel from "./MainPanel";
import {globalData} from "./base";

const App:React.FunctionComponent<RouteComponentProps> = function ({history}) {

    if (_.isNil(globalData.User)){
        history.replace('/login');
        return null;
    }

  return (<div className={styles.app}>
      <Sider/>
      <MainPanel/>
    </div>);
}

export default App;
