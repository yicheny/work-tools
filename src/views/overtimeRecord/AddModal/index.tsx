import {tryExecute} from "../../../common/utils";
import {Api} from "../../../base";
import {Button, DatePicker, Form, Input, message, Modal, Select} from "antd";
import React from "react";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    // eslint-disable-next-line no-template-curly-in-string
    required: '${label} 是必填项！',
};

const durationOptions = [
    {label:'整天(8小时以上)',value:1},
    {label:'半天(4小时以上)',value:0.5},
]

export default function AddModal(props:{visible:boolean,close:()=>void}){
    const {visible,close} = props;

    const onFinish = (values: any) => {
        tryExecute(async ()=>{
            await Api.post('/overtime-record/add',values).then(()=>{
                message.success("请求成功！");
            })
        })
    };
    return <Modal title='新增' visible={visible} onOk={close} onCancel={close}>
        <Form {...layout} onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item name={['date']} label="日期" rules={[{ required: true }]}>
                <DatePicker />
            </Form.Item>
            <Form.Item name={['duration']} label="时长" rules={[{ required: true }]}>
                <Select options={durationOptions}/>
            </Form.Item>
            <Form.Item name={['memo']} label="原因" rules={[{ required: true }]}>
                <Input.TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>
        </Form>
    </Modal>
}
