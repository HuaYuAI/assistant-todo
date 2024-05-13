'use client'
import React, {useEffect, useState} from 'react';
import '@/ui/task/four/detailForm.modules.css'
import {
    Button,
    DatePicker,
    Form,
    Input,
    message,
    Select,
    Space,
} from 'antd';
import {RangePickerProps} from "antd/es/date-picker";
import dayjs from "dayjs";
import {
    addTask,
    getTask,
    OPERATION_BUTTON_TYPE,
    taskPriorityList,
    taskStateList,
    updateTask
} from "@/lib/task/project/data";
import {DataType} from "@/lib/definitions";

export interface DetailFormProps {
    itemId: number,
    pPid: number,
    operationId: number | undefined,
    handleCancel: () => void,
    setUpdatePriority?: (value: (((prevState: (string | undefined)) => (string | undefined)) | string | undefined)) => void
}

export const DetailForm: React.FC<DetailFormProps> = (props) => {
    const [form] = Form.useForm();
    const [componentDisabled] = useState<boolean>(props.operationId === OPERATION_BUTTON_TYPE.DETAIL);
    const {RangePicker} = DatePicker;
    const {TextArea} = Input;
    // const [taskMessage,setTaskMessage]=useState<any>({name:"useState没效果吗,是这样的"});
    let defaultPriority:string|undefined;
    useEffect(() => {
        if (props.operationId === OPERATION_BUTTON_TYPE.DETAIL || props.operationId === OPERATION_BUTTON_TYPE.UPDATE) {
            getTask(props.itemId).then(task => {
                console.log('getTask(props.itemId)', props.itemId, task);
                if (task.status.success) {
                    // setTaskMessage(task.data)
                    task.data.state = taskStateList.find(taskState => taskState.code === task.data.state?.toString())?.name;
                    task.data.priority = taskPriorityList.find(taskPriority => taskPriority.code === task.data.priority?.toString())?.name;
                    defaultPriority = task.data.priority
                    task.data.actualTimeRange = [task.data.actualStartTime ? dayjs(task.data.actualStartTime) : '',
                        task.data.actualEndTime ? dayjs(task.data.actualEndTime) : ''];
                    task.data.expectedTimeRange = [task.data.expectedStartTime ? dayjs(task.data.expectedStartTime) : '',
                        task.data.expectedEndTime ? dayjs(task.data.expectedEndTime) : ''];
                    form.setFieldsValue(task.data)
                } else {
                    message.error(task.status.message);
                    props.handleCancel()
                }
            })
        }else if(props.operationId === OPERATION_BUTTON_TYPE.ADD|| props.operationId === OPERATION_BUTTON_TYPE.ADD_CHILD){
            let data={'expectedTimeRange':[dayjs(), undefined]};
            form.setFieldsValue(data)
        }
    }, [])
    const range = (start: number, end: number) => {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    };
    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        // return current && current < dayjs().endOf('day');
        console.log('current', current, current && current < dayjs().endOf('day'), current < dayjs().endOf('day'))
        return current < dayjs().startOf('day');
    };
    const disabledRangeTime: RangePickerProps['disabledTime'] = (_, type) => {
        console.log('current', _)
        if (type === 'start') {
            return {
                disabledHours: () => range(0, 60).splice(4, 20),
                disabledMinutes: () => range(30, 60),
                disabledSeconds: () => [55, 56],
            };
        }
        return {
            disabledHours: () => range(0, 60).splice(20, 4),
            disabledMinutes: () => range(0, 31),
            disabledSeconds: () => [55, 56],
        };
    };
    const onFinish = (values: any) => {
        console.log(values);
        let request: DataType = {
            key: values.id,
            id: values.id,
            pPid: props.operationId === OPERATION_BUTTON_TYPE.ADD_CHILD ? props.pPid : values.pPid,
            pid: props.operationId === OPERATION_BUTTON_TYPE.ADD_CHILD ? props.itemId : props.operationId === OPERATION_BUTTON_TYPE.UPDATE ? values.pid : 0,
            code: values.code,
            name: values.name,
            description: values.description,
            state: values.state,
            priority: values.priority,
            type: values.type,
            children: []
        }
        if (values.expectedTimeRange) {
            if (values.expectedTimeRange[0]) {
                request.expectedStartTime = values.expectedTimeRange[0]
            }
            if (values.expectedTimeRange[1]) {
                request.expectedEndTime = values.expectedTimeRange[1]
            }
        }
        if (values.actualTimeRange) {
            if (values.actualTimeRange[0]) {
                request.actualStartTime = values.actualTimeRange[0]
            }
            if (values.actualTimeRange[1]) {
                request.actualEndTime = values.actualTimeRange[1]
            }
        }
        if (props.operationId === OPERATION_BUTTON_TYPE.ADD_CHILD) {
            addTask(request).then(response => {
                    console.log('response', response)
                    if (response.status.success) {
                        message.success("添加任务成功：" + response.data)
                        props.handleCancel()
                    }
                }
            )
        } else if (props.operationId === OPERATION_BUTTON_TYPE.UPDATE) {
            var stateFind = taskStateList.find(taskState => taskState.name === request.state?.toString());
            if (stateFind) {
                request.state = stateFind.code;
            }
            var priorityFind = taskPriorityList.find(taskPriority => taskPriority.name === request.priority?.toString());
            if (priorityFind) {
                request.priority = priorityFind.code;
            }
            updateTask(request).then(response => {
                    console.log('response', response)
                    if (response.status.success) {
                        message.success("修改任务成功：" + response.data)
                        props.handleCancel()
                    }else {
                        message.error(response.status.message)
                    }
                }
            )
        }


    };
    return (
        <>
            {/*<Checkbox*/}
            {/*    checked={componentDisabled}*/}
            {/*    onChange={(e) => setComponentDisabled(e.target.checked)}*/}
            {/*>*/}
            {/*    Form disabled*/}
            {/*</Checkbox>*/}
            <Form
                labelCol={{span: 4}}
                wrapperCol={{span: 18}}
                layout="horizontal"
                disabled={componentDisabled}
                size='large'
                onFinish={onFinish}
                // initialValues={taskMessage}
                form={form}
                // style={{maxWidth: '70%'}}
            >
                <Form.Item<DataType> name='id' label="id" hidden={true}>
                    <Input name='id'/>
                </Form.Item>
                <Form.Item<DataType> name='pid' label="pid" hidden={true}>
                    <Input name='pid'/>
                </Form.Item>
                <Form.Item<DataType> name='code' label="code" hidden={true}>
                    <Input name='code'/>
                </Form.Item>
                <Form.Item<DataType> name='pPid' label="pPid" hidden={true}>
                    <Input name='pPid'/>
                </Form.Item>

                <Form.Item<DataType> name='name' label="任务名称"
                                     rules={[{required: true, message: '任务名称不能为空'}]}>
                    <Input name='name'/>
                </Form.Item>
                <Form.Item<DataType> name='description' label="任务描述">
                    <TextArea name='description' rows={4}/>
                </Form.Item>
                <Form.Item<DataType> name='priority' initialValue='3' label="任务优先级">
                    <Select
                            allowClear={true} options={
                        taskPriorityList.map(taskState => {
                            return {
                                'label': taskState.name,
                                'value': taskState.code
                            }
                        })
                    }>
                    </Select>
                </Form.Item>
                <Form.Item<DataType> name='state' initialValue='8' label="任务状态">
                    <Select  allowClear={true} options={
                        taskStateList.map(taskState => {
                            return {
                                'label': taskState.name,
                                'value': taskState.code
                            }
                        })
                    }>
                    </Select>
                </Form.Item>

                <Form.Item<DataType> name={'expectedTimeRange'} label="期望">
                    <RangePicker
                        disabledDate={disabledDate}
                        disabledTime={disabledRangeTime}
                        placeholder={['开始时间', '结束时间']}
                        allowEmpty={[true, true]}
                        needConfirm={false}
                        showTime={{
                            hideDisabledOptions: true,
                            defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('23:59:59', 'HH:mm:ss')],
                        }}
                        // format="YYYY-MM-DD HH:mm:ss"
                    />
                </Form.Item>
                <Form.Item<DataType> name='actualTimeRange' label="实际">
                    <RangePicker
                        disabledDate={disabledDate}
                        disabledTime={disabledRangeTime}
                        placeholder={['开始时间', '结束时间']}
                        allowEmpty={[true, true]}
                        needConfirm={false}
                        showTime={{
                            hideDisabledOptions: true,
                            defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('11:59:59', 'HH:mm:ss')],
                        }}
                        // format="YYYY-MM-DD HH:mm:ss"
                    />
                </Form.Item>
                {/*<Form.Item label="InputNumber">*/}
                {/*    <InputNumber/>*/}
                {/*</Form.Item>*/}
                {/*<Form.Item label="Checkbox" name="disabled" valuePropName="checked">*/}
                {/*    <Checkbox>Checkbox</Checkbox>*/}
                {/*</Form.Item>*/}
                {/*<Form.Item label="Radio">*/}
                {/*    <Radio.Group>*/}
                {/*        <Radio value="apple"> Apple </Radio>*/}
                {/*        <Radio value="pear"> Pear </Radio>*/}
                {/*    </Radio.Group>*/}
                {/*</Form.Item>*/}
                {/*<Form.Item label="TreeSelect">*/}
                {/*    <TreeSelect*/}
                {/*        treeData={[*/}
                {/*            {title: 'Light', value: 'light', children: [{title: 'Bamboo', value: 'bamboo'}]},*/}
                {/*        ]}*/}
                {/*    />*/}
                {/*</Form.Item>*/}
                {/*<Form.Item label="Cascader">*/}
                {/*    <Cascader*/}
                {/*        options={[*/}
                {/*            {*/}
                {/*                value: 'zhejiang',*/}
                {/*                label: 'Zhejiang',*/}
                {/*                children: [*/}
                {/*                    {*/}
                {/*                        value: 'hangzhou',*/}
                {/*                        label: 'Hangzhou',*/}
                {/*                    },*/}
                {/*                ],*/}
                {/*            },*/}
                {/*        ]}*/}
                {/*    />*/}
                {/*</Form.Item>*/}
                {/*<Form.Item label="DateTimePicker">*/}
                {/*    <DatePicker/>*/}
                {/*</Form.Item>*/}
                {/*<Form.Item label="Switch" valuePropName="checked">*/}
                {/*    <Switch/>*/}
                {/*</Form.Item>*/}
                {/*<Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>*/}
                {/*    <Upload action="/upload.do" listType="picture-card">*/}
                {/*        <button style={{border: 0, background: 'none'}} type="button">*/}
                {/*            <PlusOutlined/>*/}
                {/*            <div style={{marginTop: 8}}>Upload</div>*/}
                {/*        </button>*/}
                {/*    </Upload>*/}
                {/*</Form.Item>*/}
                {/*<Form.Item label="Button">*/}
                {/*    <Button>Button</Button>*/}
                {/*</Form.Item>*/}
                {/*<Form.Item label="Slider">*/}
                {/*    <Slider/>*/}
                {/*</Form.Item>*/}
                {/*<Form.Item label="ColorPicker">*/}
                {/*    <ColorPicker/>*/}
                {/*</Form.Item>*/}
                <Form.Item>
                    <Space>
                        {props.operationId === OPERATION_BUTTON_TYPE.DETAIL ? (
                            // <Button htmlType="button">关闭</Button>
                            <>
                            </>
                        ) : (<>
                                <Button type="primary" htmlType="submit">确认</Button>
                                <Button htmlType="button">取消</Button>
                            </>
                        )
                        }
                    </Space>
                </Form.Item>
            </Form>
        </>
    );

}
