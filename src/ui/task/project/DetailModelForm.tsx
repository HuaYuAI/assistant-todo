import {PlusOutlined, QuestionCircleOutlined} from '@ant-design/icons';
import {
    ModalForm,
    ProForm,
    ProFormDateRangePicker, ProFormDateTimeRangePicker,
    ProFormSelect,
    ProFormText, ProFormTextArea, ProFormTreeSelect,
} from '@ant-design/pro-components';
import {Button, Form, message, Popconfirm} from 'antd';
import React, {useEffect, useState} from "react";
import {
    addTask, deleteTask, getTask,
    getTaskTreeResult,
    OPERATION_BUTTON_TYPE,
    taskPriorityList,
    taskStateList, updateTask
} from "@/lib/task/project/data";
import {DataType} from "@/lib/definitions";
import dayjs, {Dayjs} from "dayjs";

export type DetailModelFormProps={
    // 当前内容id
    itemId?: number,
    pid?:number,
    // 祖宗任务id
    pPid?:number,
    // 操作id
    operationId: number,
    // 标题描述
    description:string,
    // 是否打开界面，用于非按钮操作
    open:boolean,
    // 使用按钮操作
    haveButton:boolean,
    expectedStartTime?:Dayjs,
    expectedEndTime?:Dayjs,
    // 重新加载数据
    reloadData?: () => void
}
export type PidSelectTree= { label: string; value: number;pid:number; children?: PidSelectTree[] }

export const DetailModelForm: React.FC<DetailModelFormProps> = (props) => {
    console.log("DetailModelForm:props:",props)
    const [form] = Form.useForm<DataType>();
    const [pid, setPid] = useState<number>(props.pid?props.pid:0);
    const [editFormDisable, setEditFormDisable] = useState(props.operationId === OPERATION_BUTTON_TYPE.DETAIL)
    useEffect(() => {
        if (props.itemId!=undefined&&(
            props.operationId === OPERATION_BUTTON_TYPE.DETAIL || props.operationId === OPERATION_BUTTON_TYPE.UPDATE)) {
            getTask(props.itemId).then(task => {
                console.log('DetailModelForm:getTask(props.itemId)', props.itemId, task);
                if (task.status.success) {
                    // setTaskMessage(task.data)
                    task.data.state = taskStateList.find(taskState => taskState.code === task.data.state?.toString())?.name;
                    task.data.priority = taskPriorityList.find(taskPriority => taskPriority.code === task.data.priority?.toString())?.name;
                    task.data.actualTimeRange = [task.data.actualStartTime ? dayjs(task.data.actualStartTime) : undefined,
                        task.data.actualEndTime ? dayjs(task.data.actualEndTime) : undefined];
                    task.data.expectedTimeRange = [task.data.expectedStartTime ? dayjs(task.data.expectedStartTime) : undefined,
                        task.data.expectedEndTime ? dayjs(task.data.expectedEndTime) : undefined];
                    form.setFieldsValue(task.data)
                } else {
                    message.error(task.status.message);
                    props.reloadData?.()
                }
            })
        }else if(props.operationId === OPERATION_BUTTON_TYPE.ADD|| props.operationId === OPERATION_BUTTON_TYPE.ADD_CHILD){
            let data={'expectedTimeRange':[props.expectedStartTime?props.expectedStartTime:dayjs(), props.expectedEndTime],'pid':props.pid};
            form.setFieldsValue(data)
        }
    }, [props])
    function childReduce(child:DataType[]):PidSelectTree[]{
        const result:PidSelectTree[] = [];
        child.map(data=>  {
            const resultData:PidSelectTree = {label:data.name,value:data.id,pid:data.pid};
            if (data.children){
                resultData.children=childReduce(data.children);
            }
            result.push(resultData);
        })
        return result;
    }
    // 如果不是添加任务需要回显
    return (
        <ModalForm<DataType>
            title={props.description}
            open={props.open&&!props.haveButton}
            trigger={props.haveButton?
                <Button type="primary">
                    <PlusOutlined />
                    {props.description}
                </Button>:undefined
            }
            form={form}
            autoFocusFirstInput
            modalProps={{
                destroyOnClose: true,
                onCancel: () => {
                    console.log('run');
                    props.reloadData?.();
                },
            }}
            submitter={props.itemId!==undefined&&props.itemId!==-1?{
                render: (prop, defaultDoms) => {
                    return [
                        editFormDisable?<Button
                            key="edit"
                            onClick={() => {
                                // props.submit();
                                setEditFormDisable(false)
                            }}
                        >
                            编辑
                        </Button>:undefined,
                        props.operationId === OPERATION_BUTTON_TYPE.DETAIL||props.operationId === OPERATION_BUTTON_TYPE.UPDATE?<Popconfirm
                            key ='delete'
                            title="删除任务"
                            description="确认要删除任务?"
                            icon={<QuestionCircleOutlined style={{color: 'red'}}/>}
                            okText="确认"
                            cancelText="取消"
                            onConfirm={() => {
                                if (props.itemId!==undefined) {
                                    deleteTask(props.itemId).then((response => {
                                        console.log('response', response)
                                        if (response.status.success) {
                                            message.success("删除任务成功：" + response.data)
                                            props.reloadData?.()
                                        }
                                    }));
                                }
                            }}
                        ><Button type="primary" danger>
                            删除
                        </Button>
                        </Popconfirm>:undefined
                        ,
                        ...defaultDoms
                    ];
                },
            }:undefined}
            onFinish={async (values) => {
                console.log('Received values of form: ', values);
                if (values.pid===undefined){
                    values.pid=0
                }
                if (values.expectedTimeRange?.[0]!=undefined) {
                    values.expectedStartTime=dayjs(values.expectedTimeRange[0]).toDate()
                }
                if (values.expectedTimeRange?.[1]!=undefined) {
                    values.expectedEndTime=dayjs(values.expectedTimeRange[1]).toDate()
                }
                if (values.actualTimeRange?.[0]!=undefined) {
                    values.actualStartTime=dayjs(values.actualTimeRange[0]).toDate()
                }
                if (values.actualTimeRange?.[1]!=undefined) {
                    values.actualEndTime=dayjs(values.actualTimeRange[1]).toDate()
                }
                values.pid=pid;
                var result:boolean=false;

                let state = taskStateList.find(taskState => taskState.name === values.state?.toString());
                if (state) {
                    values.state = state.code
                }
                let priority = taskPriorityList.find(taskPriority => taskPriority.name === values.priority?.toString())
                if (priority) {
                    values.priority = priority.code
                }
                // todo 修改
                if (props.operationId === OPERATION_BUTTON_TYPE.UPDATE||(props.operationId === OPERATION_BUTTON_TYPE.DETAIL&&!editFormDisable)) {
                    await updateTask(values).then(response => {
                            console.log('response', response)
                            if (response.status.success) {
                                message.success("修改任务成功：" + response.data)
                                // 树任务重新刷新
                                // 四象限任务重新刷新
                                // 如果可以直接更新列表而不请求。。。。。。
                                console.log('props.reloadData?.()',props.reloadData)
                                props.reloadData?.()
                                result= true
                            }else {
                                message.error(response.status.message)
                                result= false
                            }
                        }
                    );
                }else {
                    await addTask(values).then(response => {
                            console.log('response', response)
                            if (response.status.success) {
                                message.success("添加任务成功：" + response.data)
                                // 树任务重新刷新
                                // 四象限任务重新刷新
                                // 如果可以直接更新列表而不请求。。。。。。
                                console.log('props.reloadData?.()',props.reloadData)
                                props.reloadData?.()
                                result= true
                            }else {
                                message.error(response.status.message)
                                result= false
                            }
                        }
                    );
                }
                return result;
            }}
        >
            <ProFormText width="sm" name="id"  hidden={true} label="主键" />
            <ProFormText width="sm" name="code" initialValue={props.itemId}  hidden={true} label="任务编码" />
            <ProFormText width="sm" name="pPid"  initialValue={props.pPid} hidden={true} label="祖宗id" />
            <ProForm.Group>
                <ProFormTreeSelect
                    width="md"
                    request={() =>{
                        return getTaskTreeResult(JSON.stringify(
                            {pageSize:1000,pageNumber:1,data:[{code:'pid',value:'0',operateType:'='},{code:'',value:true,operateType: "TREE"}]}
                        )).then(result=> childReduce(result.data.content))
                    }}
                    name="pid"
                    label="父级任务"
                    fieldProps={{onSelect: (e,node) => {console.log('onSelect',e,node);setPid(e)}}}
                    disabled ={editFormDisable}
                />
                <ProFormText
                    width="md"
                    name="name"
                    label="任务名称"
                    tooltip="最长为 24 位"
                    placeholder="请输入任务名称"
                    disabled ={editFormDisable}
                />
            </ProForm.Group>
            <ProFormTextArea
                // width="md"
                name="description"
                label="任务描述"
                // tooltip="最长为 24 位"
                placeholder="请输入任务描述"
                disabled ={editFormDisable}
            />

            <ProForm.Group>
                <ProFormSelect
                    request={async () => taskPriorityList.map(taskState => {
                        return {
                            'label': taskState.name,
                            'value': taskState.code
                        }
                    })}
                    width="sm"
                    name="priority"
                    label="任务优先级"
                    initialValue='3'
                    disabled ={editFormDisable}
                />
                <ProFormSelect
                    width="sm"
                    options={taskStateList.map(taskState => {
                        return {
                            'label': taskState.name,
                            'value': taskState.code
                        }
                    })}
                    name="state"
                    label="任务状态"
                    initialValue='8'
                    disabled ={editFormDisable}
                />
            </ProForm.Group>

            <ProForm.Group>
                <ProFormDateTimeRangePicker
                    initialValue={[dayjs(), undefined]}
                    name="expectedTimeRange"
                    label="期望时间"
                    fieldProps={{allowEmpty:[true, true],showTime:true,needConfirm:false}}
                    placeholder={['开始时间','结束时间']}
                    disabled ={editFormDisable}
                />
                <ProFormDateTimeRangePicker
                    name="actualTimeRange"
                    label="实际时间"
                    fieldProps={ {allowEmpty:[true, true],showTime:true,needConfirm:false}}
                    placeholder={['开始时间','结束时间']}
                    disabled ={editFormDisable}
                />
            </ProForm.Group>

        </ModalForm>
    );
};
