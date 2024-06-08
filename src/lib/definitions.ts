import React from "react";
import {Dayjs} from "dayjs";

export type Invoice = {
    id: string;
    customer_id: string;
    amount: number;
    date: string;
    // In TypeScript, this is called a string union type.
    // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
    status: 'pending' | 'paid';
};
type Status={
    success:boolean;
    code:number ;
    message: string;
}
export type ResultPage<T> = {
    content:T[];
    totalPages:number;
    totalElements:number;

}
export type ResponseVO<T>={
    data:T;
    timeStamp:number;
    status:Status;
}

export type  DataType ={
    key: React.ReactNode;
    id: number;
    pid:number;
    pPid:number;
    code: string;
    name: string;
    description: string;
    state: number|string|undefined;
    priority: number|string|undefined;
    type:number;
    action?:React.ReactNode;
    expectedStartTime?:Date|string;
    expectedEndTime?:Date;
    expectedTimeRange?:(string|Dayjs|undefined)[];
    actualStartTime?:Date;
    actualEndTime?:Date;
    actualTimeRange?:(string|Dayjs|undefined)[]
    children: DataType[]|undefined;
}
export type DictType={
    id:number;
    code:string
    name:string;
    order:number;
    color:string;
}
export type SearchObject={
    name: string,
    value: any,
    operateType:string,
}
