import React, {Fragment} from "react";
import {Button, Dropdown, MenuProps, message, Modal, Popconfirm, Space} from "antd";
import {DownOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {DetailForm} from "@/ui/task/four/DetailForm";
import {commonUpdate, deleteTask, OPERATION_BUTTON_TYPE} from "@/lib/task/project/data";
import Link from "next/link";

export interface OperationButtonProps {
    itemId: number,
    pid: number,
    pPid: number,
    operationId?: string,
    refreshDate?: () => void,
}

interface OperationModelProps {
    operationId: number | undefined,
    pPid: number,
    pid: number,
    openModal: boolean
}

class OperationButton extends React.Component<OperationButtonProps, OperationModelProps> {

    constructor(props: OperationButtonProps) {
        super(props);
        this.state = {
            pid: props.pid,
            pPid: props.pPid,
            operationId: undefined,
            openModal: false
        };
    }

    render() {
        const handleCancel = () => {
            this.setState({...this.state, openModal: false})
            if (this.state.operationId !== OPERATION_BUTTON_TYPE.DETAIL) {
                this.props.refreshDate?.()
            }
        }
        const onClick: MenuProps['onClick'] = ({key}) => {
            console.log(key)
        };
        const items: MenuProps['items'] = [
            {
                key: OPERATION_BUTTON_TYPE.DETAIL,
                label: <a onClick={(e) => {
                    this.setState({openModal: true, operationId: OPERATION_BUTTON_TYPE.DETAIL})
                }}>任务详情</a>,
            },
            {
                key: OPERATION_BUTTON_TYPE.ADD_CHILD,
                label: <a onClick={(e) => {
                    this.setState({openModal: true, operationId: OPERATION_BUTTON_TYPE.ADD_CHILD})
                }}>添加支线任务</a>,
            },
            {
                key: OPERATION_BUTTON_TYPE.UPDATE,
                label: <a onClick={(e) => {
                    this.setState({openModal: true, operationId: OPERATION_BUTTON_TYPE.UPDATE})
                }}>修改任务</a>,
            },
            {
                key: OPERATION_BUTTON_TYPE.DELETE,
                label: <Popconfirm
                    title="删除任务"
                    description="确认要删除任务?"
                    icon={<QuestionCircleOutlined style={{color: 'red'}}/>}
                    okText="确认"
                    cancelText="取消"
                    onConfirm={() => {
                        deleteTask(this.props.itemId).then((response => {
                            console.log('response', response)
                            if (response.status.success) {
                                message.success("删除任务成功：" + response.data)
                                this.props.refreshDate?.()
                            }
                        }));
                    }}
                ><a>删除任务</a></Popconfirm>,
            },
            {
                key: OPERATION_BUTTON_TYPE.COMPLETE,
                label: <Popconfirm
                    title="完成任务"
                    description="确认要完成任务?"
                    okText="确认"
                    cancelText="取消"
                    onConfirm={() => {
                        commonUpdate({
                            updateColoumList:[{
                                name:'state',
                                code:'state',
                                value:'7'
                            }],
                            conditionColoumList:[{
                                name:'id',
                                code:'id',
                                operateType:'=',
                                value:this.props.itemId
                            }]
                        }).then((response => {
                            console.log('response', response)
                            if (response.status.success) {
                                message.success("完成任务成功")
                                this.props.refreshDate?.()
                            }
                        }));
                    }}
                ><a>完成任务</a></Popconfirm>,
            },
            {
                key: OPERATION_BUTTON_TYPE.SHOW_FOUR,
                label: <Link href={"/task/four?pid=" + this.props.itemId}>四象限显示子任务</Link>,
            }
        ];
        return <Fragment>
            <Dropdown menu={{items, onClick}}>
                <a onClick={(e) => {
                    e.preventDefault()
                }}>
                    <Space>
                        操作<DownOutlined/>
                    </Space>
                </a>
            </Dropdown>
            <Modal
                maskClosable={false}
                destroyOnClose={true}
                open={this.state.openModal}
                title={this.state.operationId === OPERATION_BUTTON_TYPE.DETAIL ? '任务详情' :
                    this.state.operationId === OPERATION_BUTTON_TYPE.ADD_CHILD ? '添加支线任务' :
                        this.state.operationId === OPERATION_BUTTON_TYPE.UPDATE ? '修改任务' : '未知操作'}
                // open={open}
                // onOk={handleOk}
                onCancel={handleCancel}
                footer={[]}
                width={800}
                // footer={[
                //     <Button key="back" onClick={handleCancel}>
                //         Return
                //     </Button>,
                //     <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                //         Submit
                //     </Button>,
                //     <Button
                //         key="link"
                //         href="https://google.com"
                //         type="primary"
                //         loading={loading}
                //         onClick={handleOk}
                //     >
                //         Search on Google
                //     </Button>,
                // ]}
            >
                <DetailForm itemId={this.props.itemId}
                            operationId={this.state.operationId}
                            handleCancel={handleCancel}
                            pPid={this.props.pPid}
                />
            </Modal>
        </Fragment>
    }
}

export default OperationButton;
