import React from 'react';
import styles from './Box.module.scss';
import {IComponentBaseProps} from "../../ts-base";
import clsx from "clsx";

interface IProps extends IComponentBaseProps{
    children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
}

export default function Box(props:IProps) {
    return (<div className={clsx('c-box',styles.box)} style={props.style} onClick={props.onClick}>
            {props.children}
        </div>);
}
