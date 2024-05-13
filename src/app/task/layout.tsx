'use client'
import React, {Fragment} from "react";
import {TitleOperation} from "@/ui/task/TitleOperation";
import LocalContext from "@/ui/LocalContent";
import dayjs from "dayjs";
import {ConfigProvider} from "antd";

export default function Layout({children}: { children: React.ReactNode }) {
    const [taskState, setTaskState] = React.useState<string>('8,9')
    let expectStartTimeList = [];
    expectStartTimeList.push({'name': "expectedStartTime", 'value': dayjs().subtract(7, 'day'), 'operateType': ">="});
    expectStartTimeList.push({'name': "expectedStartTime", 'value': dayjs().add(7, 'day'), 'operateType': "<"})
    const [expectedStartTime, setExpectedStartTime] = React.useState<string>(JSON.stringify(expectStartTimeList))
    const [refreshDataFlag, setRefreshDataFlag] = React.useState<boolean>(true)

    function refreshData() {
        setRefreshDataFlag(!refreshDataFlag)
    }

    console.log('taskState,expectedStartTime,refreshDataFlag', taskState, expectedStartTime, refreshDataFlag)
    return (
        <Fragment>
                <ConfigProvider
                    theme={{
                        components: {
                            Table: {
                                rowHoverBg: '#4096ff'
                                /* 这里是你的组件 token */
                            },
                        },
                    }}
                >
                    <LocalContext.Provider value={{
                        'taskState': taskState,
                        'expectedStartTime': expectedStartTime,
                        'refreshData': refreshDataFlag
                    }}>
                        <TitleOperation setTaskState={setTaskState} setExpectedStartTime={setExpectedStartTime}
                                        refreshData={refreshData}/>
                        {children}
                    </LocalContext.Provider>
                </ConfigProvider>
        </Fragment>
    );
}
