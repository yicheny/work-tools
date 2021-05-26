import React from 'react';
import styles from './Box.module.scss';
import {IComponentBaseProps} from "../../ts-base";

interface IProps extends IComponentBaseProps{
    children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
}

export default function Box(props:IProps) {
    return (<div className={styles.box} style={props.style} onClick={props.onClick}>
            {props.children}
        </div>);
}
