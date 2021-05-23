import React from "react";
import {Button, DatePicker, Form, Input, message, Modal, Select} from "antd";
import {tryExecute} from "../../../common/utils";
import {Api} from "../../../base";
import moment from 'moment';
import {useWorkDurationOptions, useWorkerNameOptions} from "../../../common/options";

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    // eslint-disable-next-line no-template-curly-in-string
    required: '${label} 是必填项！',
};

const initialValues = {
    name:'杨吕锋',
    date:moment(),
    duration:1,
    memo:null
}

export default function AddModal(props:{visible:boolean,close:()=>void,query:()=>void}){
    const {visible,close,query} = props;

    return <Modal title='新增' visible={visible} onOk={close} onCancel={close} footer={null}>
        <Form {...layout}
              onFinish={commit}
              initialValues={initialValues}
              validateMessages={validateMessages}>

            <Form.Item name={['name']} label="姓名" rules={[{ required: true }]}>
                <Select options={useWorkerNameOptions()}/>
            </Form.Item>

            <Form.Item name={['date']} label="日期" rules={[{ required: true }]}>
                <DatePicker/>
            </Form.Item>

            <Form.Item name={['duration']} label="时长" rules={[{ required: true }]}>
                <Select options={useWorkDurationOptions()}/>
            </Form.Item>

            <Form.Item name={['memo']} label="备注" rules={[{ required: true }]}>
                <Input.TextArea maxLength={100} showCount/>
            </Form.Item>

            <Form.Item wrapperCol={{offset:5}}>
                <Button type='primary' htmlType="submit">提交</Button>
            </Form.Item>
        </Form>
    </Modal>

    function commit(values:any){
        tryExecute(async () => {
            await Api.post('/overtime-record/add', values);
            message.success("请求成功！");
            close();
            query();
        })
    }
}
