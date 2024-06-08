import {unstable_noStore as noStore} from 'next/cache';
import axios, {AxiosResponse} from "axios";
import {DataType, DictType, ResponseVO, ResultPage} from "@/lib/definitions";
export async function getTaskTreeResult(requestParam:string): Promise<ResponseVO<ResultPage<DataType>>> {
    noStore();
    try {

        // 使用 Axios 发送 POST 请求获取数据
        const response: AxiosResponse<ResponseVO<ResultPage<DataType>>> = await axios.get(
            'http://taskmanagerserver.com:8090/search/task_message_tree?search='+encodeURIComponent(requestParam));
        // 从响应中提取数据并返回
        return response.data;
    } catch (error) {
        // 处理错误
        console.error('Error fetching data:', error);
        // 返回一个默认值或者抛出错误
        throw new Error('Failed to fetch data');
    }
}
export async function commonUpdate(requestParam:any): Promise<ResponseVO<string>> {
    noStore();
    try {
        // 使用 Axios 发送 PUT 请求获取数据
        const response: AxiosResponse<ResponseVO<string>> = await axios.put(
            'http://taskmanagerserver.com:8090/search/task_message_tree',requestParam);
        // 从响应中提取数据并返回
        return response.data;
    } catch (error) {
        // 处理错误
        console.error('Error fetching data:', error);
        // 返回一个默认值或者抛出错误
        throw new Error('Failed to fetch data');
    }
}

export async function taskTreeResult(): Promise<ResponseVO<ResultPage<DataType>>> {
    noStore();
    try {
        // 使用 Axios 发送 POST 请求获取数据
        const response: AxiosResponse<ResponseVO<ResultPage<DataType>>> = await axios.post('http://taskmanagerserver.com:8090/task/tree', {
            pageSize: 10,
            pageNumber: 1
        });
        // 从响应中提取数据并返回
        return response.data;
    } catch (error) {
        // 处理错误
        console.error('Error fetching data:', error);
        // 返回一个默认值或者抛出错误
        throw new Error('Failed to fetch data');
    }
}
export async function getTask(id:number): Promise<ResponseVO<DataType>> {
    noStore();
    try {
        // 使用 Axios 发送 GET 请求获取数据
        const response: AxiosResponse<ResponseVO<DataType>> = await axios.get('http://taskmanagerserver.com:8090/task/'+id);
        // 从响应中提取数据并返回
        return response.data;
    } catch (error) {
        // 处理错误
        console.error('Error fetching data:', error);
        // 返回一个默认值或者抛出错误
        throw new Error('Failed to fetch data');
    }
}

export async function addTask(task:DataType): Promise<ResponseVO<string>> {
    noStore();
    try {
        // 使用 Axios 发送 POST 请求添加数据
        const response: AxiosResponse<ResponseVO<string>> = await axios.post('http://taskmanagerserver.com:8090/task', task);
        // 从响应中提取数据并返回
        return response.data;
    } catch (error) {
        // 处理错误
        console.error('Error fetching data:', error);
        // 返回一个默认值或者抛出错误
        throw new Error('Failed to fetch data');
    }
}
export async function updateTask(task:DataType): Promise<ResponseVO<string>> {
    noStore();
    try {
        // 使用 Axios 发送 PUT 请求修改数据
        const response: AxiosResponse<ResponseVO<string>> = await axios.put('http://taskmanagerserver.com:8090/task', task);
        // 从响应中提取数据并返回
        return response.data;
    } catch (error) {
        // 处理错误
        console.error('Error fetching data:', error);
        // 返回一个默认值或者抛出错误
        throw new Error('Failed to fetch data');
    }
}
export async function deleteTask(id:number): Promise<ResponseVO<string>> {
    noStore();
    try {
        // 使用 Axios 发送 DELETE 删除数据
        const response: AxiosResponse<ResponseVO<string>> = await axios.delete('http://taskmanagerserver.com:8090/task/'+id);
        // 从响应中提取数据并返回
        return response.data;
    } catch (error) {
        // 处理错误
        console.error('Error fetching data:', error);
        // 返回一个默认值或者抛出错误
        throw new Error('Failed to fetch data');
    }
}

//0，重要紧急红色，1,重要不紧急黄色，2，不重要紧急灰色，3不重要，不紧急绿色
export const taskPriorityList: DictType[] = [
    {
        id: 3,
        code: '3',
        name: '重要紧急',
        order: 0,
        color: 'red'
    }, {
        id: 2,
        code: '2',
        name: '重要不紧急',
        order: 1,
        color: 'yellow'
    }, {
        id:1,
        code: '1',
        name: '不重要紧急',
        order: 2,
        color: '#fafafa'
    }, {
        id: 0,
        code: '0',
        name: '不重要不紧急',
        order: 3,
        color: 'green'
    }
]
// 0,暂存，1,提交，2，审核，3通过4拒绝5排期中，6进行中，7完成，8bug修复，9修复完成，10确认，11,上线运行
export const taskStateList: DictType[] = [
    // {
    //     id: 0,
    //     code: '0',
    //     name: '暂存',
    //     order: 1,
    //     color: 'red'
    // },
    // {
    //     id: 1,
    //     code: '1',
    //     name: '提交',
    //     order: 1,
    //     color: 'red'
    // },
    // {
    //     id: 2,
    //     code: '2',
    //     name: '审核',
    //     order: 2,
    //     color: 'red'
    // },
    // {
    //     id: 3,
    //     code: '3',
    //     name: '通过',
    //     order: 3,
    //     color: 'red'
    // },
    // {
    //     id: 4,
    //     code: '4',
    //     name: '拒绝',
    //     order: 4,
    //     color: 'red'
    // },
    // {
    //     id: 5,
    //     code: '5',
    //     name: '排期中',
    //     order: 5,
    //     color: 'red'
    // },
    // {
    //     id: 6,
    //     code: '6',
    //     name: '排期中',
    //     order: 6,
    //     color: 'red'
    // },
    {
        id: 7,
        code: '7',
        name: '完成',
        order: 7,
        color: 'GREEN'
    },
    {
        id: 8,
        code: '8',
        name: '新建',
        order: 8,
        color: 'RED'
    },
    {
        id: 9,
        code: '9',
        name: '进行中',
        order: 9,
        color: 'YELLOW'
    }
]
export enum OPERATION_BUTTON_TYPE {
    DETAIL,
    ADD_CHILD,
    UPDATE,
    DELETE,
    COMPLETE,
    SHOW_FOUR,
    SHOW_CALENDAR,
    ADD,
}
