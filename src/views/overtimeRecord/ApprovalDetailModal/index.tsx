import React from 'react';
import {Modal} from "antd";

function ApprovalDetailModal(props:{visible:boolean,close:()=>void,query:()=>void}) {
    const {visible,close,query} = props;

    return <Modal title='申请记录' visible={visible} onOk={close} onCancel={close} footer={null}>

    </Modal>
}

export default ApprovalDetailModal;
