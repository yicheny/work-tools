import React from 'react';
import clsx from "clsx";
import styles from "./Link.module.scss"

export interface ILink{
    className?: any;
    style?: React.CSSProperties | undefined;
    onClick?: React.MouseEventHandler<HTMLSpanElement> | undefined;
    children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
}

export default function Link(props:ILink) {
    return <span className={clsx(styles.link,props.className)} style={props.style} onClick={props.onClick}>
        {props.children}
    </span>
};
