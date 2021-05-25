import React, {useCallback, useEffect, useMemo} from 'react';
import {Modal} from "antd";
import {Api, globalData} from "../../../base";
import {tryExecute} from "../../../common/utils";
import {getCommonColumns, RecordTable} from "../RecordTable";
import {Links} from "../../../common/components";
import {usePost} from "../../../common/hooks";

function ApplyDetailModal(props: { visible: boolean, close: () => void, refresh: () => void }) {
    const {visible, close, refresh} = props;
    const {record, recordQuery, loading} = useApplyRecord();

    useEffect(() => {
        visible && recordQuery && recordQuery();
    }, [visible, recordQuery])

    return <Modal title='申请记录'
                  visible={visible}
                  onOk={close}
                  onCancel={close}
                  width={840}
                  footer={null}>
        <RecordTable data={record} loading={loading}
                     columns={useColumns(useOperations(recordQuery,refresh))}/>
    </Modal>
}

export default ApplyDetailModal;

function useApplyRecord() {
    const {data: record,doFetch,loading} = usePost();

    const recordQuery = useCallback(() => {
        tryExecute(async () => {
            await doFetch('/overtime-apply-record/query');
        })
    }, [doFetch]);

    return {record, recordQuery, loading };
}

function useColumns(operations:Object[]) {
    return useMemo(() => {
        const columns = getCommonColumns();
        // @ts-ignore //TODO 待解决
        return columns.concat(operations);
    }, [operations])
}

function useOperations(recordQuery: ()=>void,refresh:()=>void){
    return useMemo(()=>{
        return [{
                title: '操作', dataIndex: 'operation', render: (v:any,o:any) => {
                    return <Links data={getOperationData(o)}/>
                }
            }];

        function getOperationData(o:any){
            return [
                {children:'通过',onClick:()=>pass(o._id),visible:globalData.User.isManager},
                {children:'撤销',onClick:()=>reject(o._id),visible: true},
            ].filter(x=>x.visible);
        }

        function pass(id:string){
            tryExecute(async ()=>{
                await Api.get(`/overtime-apply-record/pass?id=${id}`);
                recordQuery();
                refresh();
            })
        }

        function reject(id:string){
            // console.log('拒绝！',id);
            tryExecute(async ()=>{
                await Api.get(`/overtime-apply-record/reject?id=${id}`);
                recordQuery();
            })
        }
    },[recordQuery,refresh])
}
