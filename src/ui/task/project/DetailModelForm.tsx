import { PlusOutlined } from '@ant-design/icons';
import {
    ModalForm,
    ProForm,
    ProFormDateRangePicker, ProFormDateTimeRangePicker,
    ProFormSelect,
    ProFormText, ProFormTextArea, ProFormTreeSelect,
} from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';
import React, {useState} from "react";
import {
    addTask,
    getTaskTreeResult,
    OPERATION_BUTTON_TYPE,
    taskPriorityList,
    taskStateList
} from "@/lib/task/project/data";
import {DataType} from "@/lib/definitions";
import dayjs from "dayjs";

export type DetailModelFormProps={
    itemId?: number,
    pPid?:number,
    operationId: number,
    description:string,
    reloadData?: () => void
}
export type PidSelectTree= { label: string; value: number;pPid:number; children?: PidSelectTree[] }
export const DetailModelForm: React.FC<DetailModelFormProps> = (props) => {
    const [form] = Form.useForm<DataType>();
    const [pPid, setPPid] = useState<number>(0);
    function childReduce(child:DataType[]):PidSelectTree[]{
        const result:PidSelectTree[] = [];
        child.map(data=>  {
            const resultData:PidSelectTree = {label:data.name,value:data.id,pPid:data.pPid};
            if (data.children){
                resultData.children=childReduce(data.children);
            }
            result.push(resultData);
        })
        return result;
    }
    return (
        <ModalForm<DataType>
            title={
                props.operationId === OPERATION_BUTTON_TYPE.DETAIL ? "任务详情":
                    props.operationId === OPERATION_BUTTON_TYPE.ADD?"添加任务":
                    props.operationId === OPERATION_BUTTON_TYPE.ADD?"修改任务":''
            }
            trigger={
                <Button type="primary">
                    <PlusOutlined />
                    {props.description}
                </Button>
            }
            form={form}
            autoFocusFirstInput
            modalProps={{
                destroyOnClose: true,
                onCancel: () => console.log('run'),
            }}
            // submitTimeout={2000}
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
                values.pPid=pPid;
                var result:boolean=false;
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
                return result;
            }}
        >
            <ProFormText width="sm" name="id"  hidden={true} label="主键" />
            <ProFormText width="sm" name="code"  hidden={true} label="任务编码" />
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
                    fieldProps={{onSelect: (e,node) => {console.log('onSelect',e,node);setPPid(node.pPid)}}}
                    disabled ={props.operationId === OPERATION_BUTTON_TYPE.DETAIL}
                />
                <ProFormText
                    width="md"
                    name="name"
                    label="任务名称"
                    tooltip="最长为 24 位"
                    placeholder="请输入任务名称"
                    disabled ={props.operationId === OPERATION_BUTTON_TYPE.DETAIL}
                />
            </ProForm.Group>
            <ProFormTextArea
                // width="md"
                name="description"
                label="任务描述"
                // tooltip="最长为 24 位"
                placeholder="请输入任务描述"
                disabled ={props.operationId === OPERATION_BUTTON_TYPE.DETAIL}
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
                    disabled ={props.operationId === OPERATION_BUTTON_TYPE.DETAIL}
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
                    disabled ={props.operationId === OPERATION_BUTTON_TYPE.DETAIL}
                />
            </ProForm.Group>

            <ProForm.Group>
                <ProFormDateTimeRangePicker
                    initialValue={[dayjs(), undefined]}
                    name="expectedTimeRange"
                    label="期望时间"
                    fieldProps={{allowEmpty:[true, true],showTime:true,needConfirm:false}}
                    placeholder={['开始时间','结束时间']}
                    disabled ={props.operationId === OPERATION_BUTTON_TYPE.DETAIL}
                />
                <ProFormDateTimeRangePicker
                    name="actualTimeRange"
                    label="实际时间"
                    fieldProps={ {allowEmpty:[true, true],showTime:true,needConfirm:false}}
                    placeholder={['开始时间','结束时间']}
                    disabled ={props.operationId === OPERATION_BUTTON_TYPE.DETAIL}
                />
            </ProForm.Group>

        </ModalForm>
    );
};
