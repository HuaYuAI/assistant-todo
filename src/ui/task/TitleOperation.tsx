import React, {Fragment, useContext} from "react";
import {Button, DatePicker, Select, Space} from "antd";
import {usePathname, useRouter} from "next/navigation";
import {DetailModelForm} from "@/ui/task/project/DetailModelForm";
import {OPERATION_BUTTON_TYPE, taskStateList} from "@/lib/task/project/data";
import '@/ui/task/TitleOperation.modules.css'
import LocalContext from "@/ui/LocalContent";
import {RequestDateType} from "@/ui/task/RequestDateType";
import dayjs, {Dayjs} from "dayjs";

interface TitleOperationProps {
    setTaskState: (value: string) => void;
    setExpectedStartTime: (value: string) => void;
    refreshData: () => void;
}

export const TitleOperation: React.FC<TitleOperationProps> = ({
                                                                  setTaskState,
                                                                  setExpectedStartTime,
                                                                  refreshData
                                                              }: TitleOperationProps) => {
    const {replace} = useRouter();
    console.log('usePathname()', usePathname());
    const data = useContext(LocalContext);
    const {RangePicker} = DatePicker;
    const expectStartTimeParseResult: RequestDateType[] = data.expectedStartTime.length > 0 ? JSON.parse(data.expectedStartTime) : [undefined, undefined]
    expectStartTimeParseResult.map(item => item && item.value ? dayjs(item.value.toString()) : undefined)
    const defaultExpectStartTime: [start: Dayjs | null | undefined, end: Dayjs | null | undefined] = [
        expectStartTimeParseResult[0] && expectStartTimeParseResult[0].value ? dayjs(expectStartTimeParseResult[0].value.toString()) : undefined,
        expectStartTimeParseResult[1] && expectStartTimeParseResult[1].value ? dayjs(expectStartTimeParseResult[1].value.toString()) : undefined
    ];
    return <Space style={{marginTop: 0, "height": "42px", "alignContent": "center"}}>
        <DetailModelForm haveButton={true} open={false} operationId={OPERATION_BUTTON_TYPE.ADD}
                         description='添加主线任务' reloadData={refreshData}/>
        {
            !usePathname().startsWith("/task/project") &&
            <Button type="primary" onClick={() => {
                replace("/task/project");
                // setCurrentPath("/task/project")
            }}>任务树</Button>
        }
        {
            !usePathname().startsWith("/task/four") &&
            <Button type="primary" onClick={() => {
                replace("/task/four");
                // setCurrentPath("/task/four");
            }}>四象限显示</Button>
        }
        {
            !usePathname().startsWith("/task/calendar") &&
            <Button type="primary" onClick={() => {
                replace("/task/calendar");
                // setCurrentPath("/task/project")
            }}>日历显示</Button>
        }
        {
            /*日历需要状态*/
            !usePathname().startsWith("/task/project") && <Fragment>
                <span style={{whiteSpace: 'nowrap'}}>任务状态:</span>
                <Select
                    mode="multiple"
                    allowClear
                    style={{minWidth: '100px'}}
                    placeholder="任务状态"
                    defaultValue={data.taskState.split(",")}
                    onChange={(value) => {
                        console.log('onChange')
                        setTaskState(value.join(','))
                    }}
                    options={taskStateList.map(item => {
                        return {label: item.name, value: item.code}
                    })}
                />
            </Fragment>
        }
        {
            /*四相线需要状态时间*/
            usePathname().startsWith("/task/four") && <Fragment>
                <span style={{whiteSpace: 'nowrap'}}>期望开始时间范围:</span>
                <RangePicker
                    placeholder={['开始时间', '结束时间']}
                    defaultValue={defaultExpectStartTime}
                    allowEmpty={[true, true]}
                    onChange={(dates, dateStrings) => {
                        console.log('onChange:', dates, dateStrings);
                        if (!dates) {
                            setExpectedStartTime('')
                            return
                        }
                        let expectStartTimeList = [];
                        if (dates[0]) {
                            expectStartTimeList.push({
                                'name': "expectedStartTime",
                                'value': dates[0],
                                'operateType': ">="
                            });
                        } else {
                            expectStartTimeList.push(undefined)
                        }
                        if (dates[1]) {
                            expectStartTimeList.push({
                                'name': "expectedStartTime",
                                'value': dates[1].add(1, 'day'),
                                'operateType': "<"
                            })
                        } else {
                            expectStartTimeList.push(undefined)
                        }
                        setExpectedStartTime(JSON.stringify(expectStartTimeList))
                    }}
                />
            </Fragment>
        }


    </Space>
}
