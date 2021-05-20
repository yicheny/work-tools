import React from 'react';
import Sider from "./Sider";

import styles from './App.module.scss';
import MainPanel from "./MainPanel";

function App() {
  return (<div className={styles.app}>
      <Sider/>
      <MainPanel/>
    </div>);
}

export default App;
