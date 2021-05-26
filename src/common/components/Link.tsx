import React from 'react';
import clsx from "clsx";
import styles from "./Link.module.scss"
import {IComponentBaseProps} from "../../ts-base";

export interface ILink extends IComponentBaseProps{
    children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
}

export default function Link(props:ILink) {
    return <span className={clsx(styles.link,props.className)} style={props.style} onClick={props.onClick}>
        {props.children}
    </span>
};
