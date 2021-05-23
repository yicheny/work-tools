import {Button, DatePicker, Form, Select} from "antd";
import {useWorkDurationOptions, useWorkerNameOptions} from "../../common/options";
import React from "react";
import styles from './Select.module.scss'
import {IQueryParams} from "./ts-define";

const initialValues = {
    // name:'',
    // date:moment(),
    // duration:'',
    // createdAt:moment(),
}

export default function Selects(props:{setParams: (values: IQueryParams)=>void}){
    return <Form layout="inline" onFinish={(values)=>{
        values.date = values.date && values.date.startOf('day');
        values.createdAt = values.createdAt && values.createdAt.startOf('day');
        props.setParams(values);
    }} className={styles.form} initialValues={initialValues}>
        <Form.Item name={['name']} label="姓名">
            <Select options={useWorkerNameOptions()} placeholder='默认全选' mode="multiple" maxTagCount='responsive'/>
        </Form.Item>

        <Form.Item name={['date']} label="日期">
            <DatePicker/>
        </Form.Item>

        <Form.Item name={['duration']} label="时长">
            <Select options={useWorkDurationOptions()} placeholder='默认全选' mode="multiple" maxTagCount='responsive'/>
        </Form.Item>

        <Form.Item name={['createdAt']} label="录入">
            <DatePicker/>
        </Form.Item>

        <Form.Item>
            <Button htmlType={"submit"}>查询</Button>
        </Form.Item>
    </Form>
}
