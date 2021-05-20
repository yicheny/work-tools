import React from "react";
import {Route, Switch} from "react-router-dom";
import OvertimeRecord from "./views/overtimeRecord";
import Home from "./views/home";
import styles from './MainPanel.module.scss';

export default function MainPanel(){
    return <div className={styles.mainPanel}>
        <Switch>
            <Route path='/home' component={Home}/>
            <Route path='/overtime-record' component={OvertimeRecord}/>
        </Switch>
    </div>
}
