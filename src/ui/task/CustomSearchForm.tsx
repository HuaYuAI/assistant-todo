import {
    ProFormDatePicker, ProFormSelect,
    ProFormText,
    QueryFilter,
} from '@ant-design/pro-components';
import '@/ui/task/CustomSearchForm.module.css'
import {taskStateList} from "@/lib/task/project/data";
const CustomSearchForm= () => {
    return (
        <QueryFilter defaultCollapsed split style={{paddingTop:0}}>
            <ProFormSelect mode="tags" name='state' label='任务状态'
                           request={async () => taskStateList}/>
            {/*</ProFormSelect>*/}
            <ProFormText name="name" label="应用名称" />
            <ProFormDatePicker name="createDate" label="创建时间" />
            <ProFormText name="status" label="应用状态" />
            <ProFormDatePicker name="replyDate" label="响应日期" />
            <ProFormDatePicker name="startDate" label="创建时间" />
            <ProFormDatePicker name="endDate" label="结束时间" />
        </QueryFilter>
    );
};

export default CustomSearchForm
