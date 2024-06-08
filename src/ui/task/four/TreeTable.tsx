'use client'
import React, {useContext} from 'react';
import {ConfigProvider, Table} from 'antd';
import type {TableColumnsType, TableProps} from 'antd';
import {taskPriorityList, taskStateList} from "@/lib/task/project/data";
import {DataType} from "@/lib/definitions";
import OperationButton from "@/ui/task/OperationButton";
import "@/ui/task/four/detailForm.modules.css"
import LocalContext from "@/ui/LocalContent";
import {useSearchParams} from "next/dist/client/components/navigation";
import {RequestDateType} from "@/ui/task/RequestDateType";

type TableRowSelection<T> = TableProps<T>['rowSelection'];


// rowSelection objects indicates the need for row selection
const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
    },
};

interface TableSearchType {
    priority: string,
    resultDataTypeList: DataType[],
    refreshDate?: () => void,
    loadingState:boolean
}

const TreeTable: React.FC<TableSearchType> = (props) => {
    const dataLocalContext = useContext(LocalContext);
    console.log('dataLocalContext', dataLocalContext)
    const checkLocal:boolean = useSearchParams().get('pid')!=undefined;
    const columns: TableColumnsType<DataType> = [
        {
            title: '任务编码',
            dataIndex: 'code',
            key: 'code',
            width: '10%',
        },
        {
            title: '任务名称',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
        },
        // {
        //     title: '任务描述',
        //     dataIndex: 'description',
        //     // width: '30%',
        //     key: 'description',
        // },
        {
            title: '任务状态',
            dataIndex: 'state',
            width: '10%',
            key: 'state',
            filtered: checkLocal&&dataLocalContext.taskState.length > 0,
            defaultFilteredValue: dataLocalContext.taskState.split(','),
            onFilter: (text, record) => {
                // console.log('&record.priority.toString()===props.priority',record.priority,text,props.priority)
                // &record.priority.toString()===props.priority 不重要紧急 0 0
                if (dataLocalContext.taskState.length === 0) {
                    return true;
                }
                var dataLocalContextTaskStateList = dataLocalContext.taskState.split(",");
                console.log('dataLocalContextTaskStateList', dataLocalContext.taskState.length > 0, dataLocalContextTaskStateList);
                return taskStateList.filter(taskState => dataLocalContextTaskStateList.includes(taskState.code))
                    .find(taskState => taskState.name === record.state) != undefined;
            }
        },
        {
            title: '优先级',
            dataIndex: 'priority',
            width: '10%',
            key: 'priority',
            hidden: true,
            filters: taskPriorityList.map(taskState => {
                return {
                    'text': taskState.name,
                    'value': taskState.code
                }
            }),
            filtered: true,
            defaultFilteredValue: [props.priority],
            onFilter: (text, record) => {
                console.log('&record.priority.toString()===props.priority',record.priority,text,props.priority,props.priority === record.priority)
                // &record.priority.toString()===props.priority 不重要紧急 0 0
                return props.priority === record.priority+''
            }
        },
        {
            title: '期望开始时间',
            dataIndex: 'expectedStartTime',
            width: '10%',
            key: 'expectedStartTime',
            filtered: checkLocal&&dataLocalContext.expectedStartTime.length > 0,
            // defaultFilteredValue: JSON.parse(dataLocalContext.expectedStartTime),
            onFilter: (text, record) => {
                console.log('dataLocalContext.expectedStartTime',dataLocalContext.expectedStartTime)
                if (dataLocalContext.expectedStartTime.length === 0) {
                    return true;
                }
                const expectStartTimeParseResult:RequestDateType[] = JSON.parse(dataLocalContext.expectedStartTime);
                console.log('expectStartTimeParseResult',expectStartTimeParseResult)
                if (expectStartTimeParseResult[0]!=undefined){
                    let le:boolean;
                    if (expectStartTimeParseResult[0].operateType==='<='){
                        le=record.expectedStartTime!=undefined&&record.expectedStartTime<=expectStartTimeParseResult[0].value
                    }else {
                        le=record.expectedStartTime!=undefined&&record.expectedStartTime>=expectStartTimeParseResult[0].value
                    }
                    if (!le){
                        return le;
                    }
                }
                if(expectStartTimeParseResult[1]!=undefined){
                    let ge:boolean = record.expectedStartTime!=undefined&&record.expectedStartTime<=expectStartTimeParseResult[1].value
                    if (!ge){
                        return ge;
                    }
                }
                return true;
            }
        },
        {
            title: '操作',
            dataIndex: 'action',
            width: '10%',
            key: 'action',
        },
    ];
    return (
        <>
            <ConfigProvider
                theme={{
                    components: {
                        Table: {
                            headerBg: taskPriorityList.find((item) => item.code === props.priority)?.color
                            /* 这里是你的组件 token */
                        },
                    },
                }}
            >
                <Table
                    columns={columns}
                    // rowSelection={{ ...rowSelection, checkStrictly}}
                    dataSource={props.resultDataTypeList.filter(resultDataType=>{
                            resultDataType.action= <OperationButton itemId={resultDataType.id} pid={resultDataType.pid} pPid={resultDataType.pPid} refreshDate={props.refreshDate}/>
                            if (dataLocalContext.expectedStartTime.length === 0) {
                                return true;
                            }
                            const expectStartTimeParseResult:RequestDateType[] = JSON.parse(dataLocalContext.expectedStartTime);
                            if (expectStartTimeParseResult[0]!=undefined){
                                let le:boolean;
                                if (expectStartTimeParseResult[0].operateType==='<='){
                                    le=resultDataType.expectedStartTime!=undefined&&resultDataType.expectedStartTime<=expectStartTimeParseResult[0].value
                                }else {
                                    le=resultDataType.expectedStartTime!=undefined&&resultDataType.expectedStartTime>=expectStartTimeParseResult[0].value
                                }
                                if (!le){
                                    return le;
                                }
                            }
                            if(expectStartTimeParseResult[1]!=undefined){
                                let ge:boolean = resultDataType.expectedStartTime!=undefined&&resultDataType.expectedStartTime<=expectStartTimeParseResult[1].value
                                if (!ge){
                                    return ge;
                                }
                            }
                            return true;

                    })}
                    pagination={{pageSize: 5}}
                    scroll={{y: 280}}
                    loading={props.loadingState}
                />
            </ConfigProvider>
            {/*<Space align="center" style={{ marginBottom: 16 }}>*/}
            {/*    CheckStrictly: <Switch checked={checkStrictly} onChange={setCheckStrictly} />*/}
            {/*</Space>*/}
            {/*<ColorPicker defaultValue="#1677ff" showText/>*/}
        </>
    );
};

export default TreeTable;
