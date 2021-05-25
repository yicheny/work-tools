import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Modal} from "antd";
import {Api, globalData} from "../../../base";
import {tryExecute} from "../../../common/utils";
import {getCommonColumns, RecordTable} from "../RecordTable";
import {Links} from "../../../common/components";

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
        <RecordTable data={record} columns={useColumns(useOperations(recordQuery))}/>
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

function useColumns(operations:Object[]) {
    return useMemo(() => {
        const columns = getCommonColumns();
        if(!globalData.User.isManager) return columns;
        // @ts-ignore //TODO 待解决
        return columns.concat(operations);
    }, [operations])
}

function useOperations(recordQuery: ()=>void){
    return useMemo(()=>{
        return [
            {
                title: '操作', dataIndex: 'operation', render: (v:any,o:any) => {
                    return <Links data={[
                        {children:'通过',onClick:()=>pass(o._id)},
                        {children:'拒绝',onClick:()=>reject(o._id)},
                    ]}/>
                }
            }
        ];

        function pass(id:string){
            // console.log('通过！',id)
        }

        function reject(id:string){
            // console.log('拒绝！',id);
            tryExecute(async ()=>{
                await Api.get(`/overtime-apply-record/reject?id=${id}`);
                recordQuery();
            })
        }
    },[recordQuery])
}
