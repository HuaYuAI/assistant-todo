'use client'
import { useRouter} from "next/navigation";
import dayjs from "dayjs";
import {useEffect} from "react";

export default function Home() {
    const {replace} = useRouter();
    useEffect(()=>{
        replace("/task/four")
    },[])
    dayjs.locale('zh-cn')
    return (
        <main className="flex min-h-screen flex-col p-6">
        </main>
    );
}
