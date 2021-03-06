import {Table} from "antd";
import _ from "lodash";
import React from "react";
import moment from "moment";
import {ColumnsType} from "antd/lib/table";

export function getCommonColumns() {
    return [
        {title: "#", dataIndex: '#', width: 60, render: (v: any, record: Object, i: number) => i + 1},
        {title: '加班人员', dataIndex: 'name', width: 100},
        {
            title: '加班日期', dataIndex: 'date', width: 120,
            render: (v: string) => moment(v).format('YYYY-MM-DD'),
        },
        {title: '时长', dataIndex: 'duration', render: (v: number) => `${v}天`, width: 80},
        {
            title: '创建时间', dataIndex: 'createdAt', width: 160,
            render: (v: string) => moment(v).format('YYYY-MM-DD HH:MM:SS')
        },
        {title: '是否使用', dataIndex: 'used', render: (v: number) => v ? '是' : '否', width: 100},
        {title: '备注', dataIndex: 'memo'},
    ];
}

interface IProps {
    data: readonly any[] | undefined;
    columns: ColumnsType<any> | undefined;
    loading?: boolean
}

export function RecordTable(props:IProps) {
    return <Table scroll={{y: 640}}
                  dataSource={props.data}
                  columns={props.columns}
                  loading={props.loading}
                  pagination={false}
                  rowKey={(x) => _.get(x, '_id')}/>
}
