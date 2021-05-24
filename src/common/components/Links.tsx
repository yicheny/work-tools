import _ from "lodash";
import { Link } from "./index";
import React from "react";
import {ILink} from "./Link";

export default function Links(props: { style?: React.CSSProperties | undefined; data: ILink[] }){
    return <div className="links" style={props.style}>
        {
            _.map(props.data, (x, i) => {
                return <Link onClick={ x.onClick }
                             style={{fontSize:12,display:"inline-block",margin:'0px 16px 8px 0'}}
                             key={ i }>
                    { x.children }
                </Link>
            })
        }
    </div>
}
