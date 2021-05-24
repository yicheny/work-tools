import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Modal} from "antd";
import {Api} from "../../../base";
import {tryExecute} from "../../../common/utils";
import {getCommonColumns, RecordTable} from "../RecordTable";
import {Link, Links} from "../../../common/components";

function ApplyDetailModal(props: { visible: boolean, close: () => void, refresh: () => void }) {
    const {visible, close, refresh} = props;
    const {record, recordQuery} = useApplyRecord();

    useEffect(() => {
        visible && recordQuery && recordQuery();
    }, [visible, recordQuery])

    return <Modal title='申请记录'
                  visible={visible}
                  onOk={close}
                  onCancel={close}
                  width={840}
                  footer={null}>
        <RecordTable data={record} columns={useColumns()}/>
    </Modal>
}

export default ApplyDetailModal;

function useApplyRecord() {
    const [record, setData] = useState([]);

    const recordQuery = useCallback(() => {
        tryExecute(async () => {
            const res: any = await Api.post('/overtime-apply-record/query');
            setData(res.data);
        })
    }, []);

    return {record, recordQuery};
}

function useColumns() {
    return useMemo(() => {
        const columns = getCommonColumns();
        return columns.concat([
            {
                // @ts-ignore //TODO 待处理
                title: '操作', dataIndex: 'operation', render: () => {
                    return <Links data={[
                        {children:'通过'},
                        {children:'拒绝'},
                    ]}/>
                }
            }
        ]);
    }, [])
}
