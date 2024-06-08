'use client'
import {
    CheckSquareFilled,
    QuestionCircleOutlined
} from '@ant-design/icons';
import type {ActionType, FormInstance, ProColumns, ProFormInstance} from '@ant-design/pro-components';
import {ProTable, TableDropdown} from '@ant-design/pro-components';
import {Button, DatePicker, Dropdown, Space, Switch, Tag, Tooltip} from 'antd';
import React, {useContext, useEffect, useRef} from 'react';
import {DataType} from "@/lib/definitions";
import {
    getTaskTreeResult,
    OPERATION_BUTTON_TYPE,
    taskPriorityList,
    taskStateList,
} from "@/lib/task/project/data";
import {DetailModelForm} from "@/ui/task/project/DetailModelForm";
import OperationButton from "@/ui/task/OperationButton";
import dayjs from "dayjs";
import '@/ui/task/project/TreeTablePro.modules.css'

const TreeTablePro: React.FC = () => {
    const actionRef = useRef<ActionType>();
    const formRef = useRef<ProFormInstance>();
    const [switchChecked, setSwitchChecked] = React.useState(true);
    const [filterChecked, setFilterChecked] = React.useState(true);
    const [current,setCurrent] = React.useState(1);
    const [pageSize,setPageSize] = React.useState(5);
    const { RangePicker } = DatePicker;
    const columns: ProColumns<DataType>[] = [
        {
            key:'code',
            title: '任务编码',
            dataIndex: 'code',
            width: '10%',
        },
        {
            key: 'name',
            title: '任务名称',
            dataIndex: 'name',
            width: '15%',
            copyable: true,
            ellipsis: true,
            tooltip: '标题过长会自动收缩',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '此项为必填项',
                    },
                ],
            },
        },
        {
            key: 'description',
            title: '任务描述',
            dataIndex: 'description',
        },
        {
            key: 'priority',
            title: '任务优先级',
            dataIndex: 'priority',
            order:2,
            valueType: 'select',
            fieldProps: {
                mode:"tags",
                options: taskPriorityList.map(item => {
                    return {label: item.name, value: item.code}
                })
            },
            // renderFormItem: (_, { defaultRender }) => {
            //     return defaultRender(_);
            // },
            render: (_, record) => (
                <Space>
                    {
                        // <Tag color={taskPriorityList.find(item => item.code === record.priority?.toString())?.color}
                        //      key={taskPriorityList.find(item => item.code === record.priority?.toString())?.code}>
                        //     {taskPriorityList.find(item => item.code === record.priority?.toString())?.name}
                        // </Tag>
                        <div>
                            {/*< HeartFilled/>*/}
                            <CheckSquareFilled style={{color:taskPriorityList.find(item => item.code === record.priority?.toString())?.color}}/>
                            {taskPriorityList.find(item => item.code === record.priority?.toString())?.name}
                        </div>
                    }
                </Space>
            ),
        }, {
            key: 'state',
            title: '任务状态',
            dataIndex: 'state',
            valueType: 'select',
            order:3,
            initialValue:['8','9'],
            fieldProps: {
                defaultValue:['8','9'],
                mode:"tags",
                options: taskStateList.map(item => {
                    return {label: item.name, value: item.code}
                }),
            },
        }, {
            key: 'expectedStartTime',
            title: '期望开始时间',
            dataIndex: 'expectedStartTime',
            valueType: 'date',
            order:1,
            renderFormItem:()=><RangePicker allowEmpty={[true,true]}/>
        }, {
            key:'expectedEndTime',
            title: '期望结束时间',
            dataIndex: 'expectedEndTime',
            valueType: 'date',
        }, {
            key: 'actualStartTime',
            title: '实际开始时间',
            dataIndex: 'actualStartTime',
            valueType: 'date',
        }, {
            key: 'actualEndTime',
            title: '期望结束时间',
            dataIndex: 'actualEndTime',
            valueType: 'date',
        }, {
            key: 'option',
            title: '操作',
            valueType: 'option',
            render: (_, record) => <OperationButton itemId={record.id} pid={record.pid} pPid={record.pPid} refreshDate={()=>{
                actionRef.current?.reload( false);
            }}/>,
        }
    ];
    let toolBarRenderList = [
        <DetailModelForm open={false} haveButton={true} key={1} operationId={OPERATION_BUTTON_TYPE.ADD} description='添加主线任务' reloadData={()=>{
            actionRef.current?.reload( false);
        }}/>,
        <Switch key={2} checkedChildren="树" unCheckedChildren="列表" checked={switchChecked}
                onChange={(checked, event) => {setSwitchChecked(checked);actionRef.current?.reset?.();}} />,
    ];
    if (switchChecked){
        toolBarRenderList.push(<><span>树子集是否参与过滤</span> <Tooltip title="开启树子集过滤后儿子不满足条件，孙子满足条件，儿子和孙子都不会显示。"><QuestionCircleOutlined /></Tooltip>
            <Switch checkedChildren="是" unCheckedChildren="否" checked={filterChecked}
                    onChange={(checked, event) => {setFilterChecked(checked);
                        actionRef.current?.reload( false);
                    }} /></>)
    }
    return (
        <ProTable<DataType>
            columns={columns}
            actionRef={actionRef}
            cardBordered
            request={async (params, sort, filter) => {
                console.log('request',params,params.keyword,sort, filter);
                const searchList=[]
                if (switchChecked) {
                    searchList.push({name:'pid',value:'0',operateType:"="},{name:'tree',value:'TRUE',operateType:"TREE"})
                }
                if (filterChecked) {
                    searchList.push({name:'tree',value:'TRUE',operateType:"TREE-FILTER"})
                }
                if (params.state instanceof Array&&params.state.length>0){
                    searchList.push({name:'state',value:params.state.join(','),operateType:"IN"})
                }
                if (params.priority instanceof Array&&params.state.length>0){
                    searchList.push({name:'priority',value:params.priority.join(','),operateType:"IN"})
                }
                if (params.expectedStartTime instanceof Array&&params.expectedStartTime.length>0){
                    if (params.expectedStartTime[0]){
                        searchList.push({name:'expectedStartTime',value:dayjs(params.expectedStartTime[0]),operateType:">="})
                    }
                    if (params.expectedStartTime[1]){
                        searchList.push({name:'expectedStartTime',value:dayjs(params.expectedStartTime[1]),operateType:"<="})
                    }
                }
                if (params.name){
                    searchList.push({name:'name',value:params.name,operateType:"LIKE"})
                }
                if (params.description){
                    searchList.push({name:'description',value:params.description,operateType:"LIKE"})
                }
                if (params.code){
                    searchList.push({name:'code',value:params.code,operateType:"="})
                }
                let request = JSON.stringify({
                    pageSize:params.pageSize,
                    pageNumber:params.current,
                    data: searchList
                })
                const response = await getTaskTreeResult(request)
                return {
                    data: response.data.content,
                    success: response.status.success,
                    total :response.data.totalElements,
                }
            }}
            editable={{
                type: 'multiple',
            }}
            columnsState={{
                persistenceKey: 'pro-table-singe-demos',
                persistenceType: 'localStorage',
                defaultValue: {
                    option: {fixed: 'right', disable: true},
                },
                // onChange(value) {
                //     console.log('value: ', value);
                // },
            }}
            rowKey="id"
            rowClassName={(record, i) => (i % 2 === 1 ? "even" : "odd")}
            pagination={{
                current: current,
                pageSize: pageSize,
                onChange: (current,pageSize) => {
                    console.log('onChange',current,pageSize)
                    setCurrent(current)
                    setPageSize(pageSize)
                }
            }}
            dateFormatter="string"
            scroll={{y: 580}}
            // headerTitle="任务管理"
            toolBarRender={()=>toolBarRenderList}>
        </ProTable>
    );
};
export default TreeTablePro
