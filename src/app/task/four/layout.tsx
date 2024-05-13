/**
 * A layout is UI that is shared between multiple routes. On navigation, layouts preserve state, remain interactive, and do not re-render.
 */
'use client'
import TreeTable from "@/ui/task/four/TreeTable";
import '@/ui/task/four/index.modules.css'
import {useContext, useEffect, useState} from "react";
import LocalContext from "@/ui/LocalContent";
import {useSearchParams} from "next/dist/client/components/navigation";
import {getTaskTreeResult, taskStateList} from "@/lib/task/project/data";
import {DataType, ResponseVO, ResultPage} from "@/lib/definitions";

export default function Layout({children}: { children: React.ReactNode }) {
    const [resultDataTypeList, setResultDataTypeList] = useState<DataType[]>([]);
    const [loadingState,setLoadingState] =useState(true)
    const refreshDate = (): void => {
        setLoadingState(true)
        getTaskTreeResult(JSON.stringify({
            pageSize:1000,
            pageNumber:1,
            data: leftUp
        })).then((result: ResponseVO<ResultPage<DataType>>) => {
            if (result.status.success) {
                // recursionActionChild(result.data.content);
                result.data.content.forEach(dataType=>{
                    dataType.state=taskStateList.find(taskState=>taskState.code===dataType.state+'')?.name
                })
                setResultDataTypeList(result.data.content)
                setLoadingState(false)
            }
        })
    }
    useEffect(() => {
        // @ts-ignore
        const divWidth = document.getElementById('tenUp').offsetWidth;
        // @ts-ignore
        document.getElementById('upUp').style.fontSize = divWidth + 'px';
        // @ts-ignore
        document.getElementById('upDown').style.fontSize = divWidth + 'px';
        // @ts-ignore
        const divHeight = document.getElementById('left').offsetHeight;
        // @ts-ignore
        document.getElementById('tenLeft').style.fontSize = divHeight/6*4 + 'px';
        refreshDate()
    }, [useContext(LocalContext)]);
    const data = useContext(LocalContext);
    const leftUp:{name:string,operateType:string,value:string|number|boolean}[] = []
    var pid = useSearchParams().get('pid');
    // 如果有pid,在前端过滤（防止中间数据不满足条件，导致子数据丢失），
    // 无pid在后端过滤（防止数据量过大）。
    console.log('data',data);
    console.log('pid!=null',pid!=null);
    if (pid!=null) {
        leftUp.push({name:"pid",value:pid,operateType:"="},{name:'TREE',value:"false",operateType: "TREE"});
    }else {
        if (data.taskState.length>0){
            leftUp.push({name:"state",value:data.taskState,operateType:"IN"});
        }
        if (data.expectedStartTime.length>0){
            const parse = JSON.parse(data.expectedStartTime);
            leftUp.push(...parse);
        }
    }
    return (
        <div>
            <div className='firstRow' style={{display: 'flex'}}>
                <div className='leftUp'>
                    <TreeTable loadingState={loadingState}  refreshDate={refreshDate} priority='3' resultDataTypeList={resultDataTypeList}/>
                </div>

                <div id='tenUp' className='up'>
                    <span id='upUp'>向上重要</span>
                </div>

                <div className='rightUp' >
                    <TreeTable loadingState={loadingState} refreshDate={refreshDate}  priority='2' resultDataTypeList={resultDataTypeList}/>
                </div>
            </div>
            <div id='left' className='left'>
                <span  id='tenLeft' style={{fontSize:'1vh'}}>←向左紧急←向左紧急←向左←向左紧急←向左紧急←向左紧急</span>
            </div>
            <div className='secondRow' style={{display: 'flex'}}>
                <div className='leftDown'>
                    <TreeTable loadingState={loadingState} refreshDate={refreshDate}  priority='1' resultDataTypeList={resultDataTypeList}/>
                </div>
                <div className='up'>
                    <span id='upDown'>向上重要</span>
                </div>
                {/*<div style={{float:'left',width:'48%',height: '48vh',background:"gray"}}>{children}</div>*/}
                <div className='rightDown'>
                    <TreeTable loadingState={loadingState} refreshDate={refreshDate}  priority='0'  resultDataTypeList={resultDataTypeList}/>
                </div>
            </div>
        </div>
    );
}
