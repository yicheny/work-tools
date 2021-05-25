import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Button, Card} from 'antd';
import {useOpenInfo, usePost} from "../../common/hooks";
import AddModal from "./AddModal";
import {Api, globalData} from "../../base";
import {tryExecute} from "../../common/utils";
import styles from './index.module.scss';
import Selects from "./Selects";
import {IQueryParams} from "./ts-define";
import ApplyDetailModal from "./ApplyDetailModal";
import {getCommonColumns, RecordTable} from "./RecordTable";
import {Links} from "../../common/components";

export default function OvertimeRecord() {
    const {openInfo, setOpenInfo, close} = useOpenInfo();
    const {data, request, loading} = useTableData();
    const [params, setParams] = useState<IQueryParams>({});

    const query = useCallback(() => request(params), [request, params]);

    useEffect(() => query(), [query]);

    return <div className={styles.main}>
        <div className={styles.options}>
            <Selects setParams={setParams}/>
            <AddButton setOpenInfo={setOpenInfo}/>
        </div>
        <Card title='记录' extra={<ApplyDetailButton setOpenInfo={setOpenInfo}/>}>
            <RecordTable data={data} columns={useColumns(useOperations(query))} loading={loading}/>
        </Card>
        <AddModal visible={openInfo.type === 'add'} close={close} refresh={query}/>
        <ApplyDetailModal visible={openInfo.type === 'applyDetail'}
                          close={close}
                          refresh={query}/>
    </div>
};

function useTableData() {
    const {data,doFetch,loading} = usePost();

    const request = useCallback((values?: IQueryParams) => {
        tryExecute(async () => {
            await doFetch(`/overtime-record/query`, values);
        })
    }, [doFetch])

    return {data, request,loading};
}

function useColumns(operations:any[]){
    return useMemo(()=>{
        const commonColumns = getCommonColumns();
        if(globalData.User.isManager) return commonColumns.concat(operations);
        return commonColumns;
    },[operations])
}

function useOperations(refresh: () => void) {
    return useMemo(() => {
        return [{
            title: '操作',
            dataIndex: 'operation',
            align:'center',
            render: (v: any, o: any) => <Links data={getOperationData(o)}/>
        }];

        function getOperationData(o: any) {
            return [
                {children: '调整', onClick: () => adjust(o._id)},
                {children: '删除', onClick: () => remove(o._id)},
            ];
        }

        function remove(id: string) {
            tryExecute(async () => {
                await Api.get(`/overtime-record/remove?id=${id}`);
                refresh();
            })
        }

        function adjust(id: string) {
            console.log('调整！',id);
            //setTypeInfo({type:'adjust',data})
        }
    }, [refresh])
}

function ApplyDetailButton(props: { setOpenInfo: (arg0: { type: string; }) => void; }) {
    return <Button onClick={() => props.setOpenInfo({type: 'applyDetail'})}>申请记录</Button>
}

function AddButton(props: { setOpenInfo: (arg0: { type: string; }) => void; }) {
    return <Button type='primary' onClick={() => props.setOpenInfo({type: 'add'})}>
        {globalData.User.isManager ? '新增' : '申请'}
    </Button>
}
