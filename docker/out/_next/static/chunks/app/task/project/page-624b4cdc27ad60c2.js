(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[430],{61534:function(e,t,a){Promise.resolve().then(a.bind(a,24520))},1653:function(e,t,a){"use strict";a.d(t,{Q:function(){return g}});var i=a(57437),d=a(56115),l=a(26218),n=a(51031),o=a(12415),r=a(31024),s=a(8384),p=a(44951),c=a(32696),u=a(80809),m=a(46682),y=a(58569),h=a(2265),v=a(67098),T=a(62737),x=a.n(T);let g=e=>{let[t]=u.Z.useForm(),[a,T]=(0,h.useState)(0);return(0,i.jsxs)(l.Y,{title:e.operationId===v.yU.DETAIL?"任务详情":e.operationId===v.yU.ADD?"添加任务":e.operationId===v.yU.ADD?"修改任务":"",trigger:(0,i.jsxs)(m.ZP,{type:"primary",children:[(0,i.jsx)(d.Z,{}),e.description]}),form:t,autoFocusFirstInput:!0,modalProps:{destroyOnClose:!0,onCancel:()=>console.log("run")},onFinish:async t=>{console.log("Received values of form: ",t),void 0===t.pid&&(t.pid=0),(null===(i=t.expectedTimeRange)||void 0===i?void 0:i[0])!=void 0&&(t.expectedStartTime=x()(t.expectedTimeRange[0]).toDate()),(null===(d=t.expectedTimeRange)||void 0===d?void 0:d[1])!=void 0&&(t.expectedEndTime=x()(t.expectedTimeRange[1]).toDate()),(null===(l=t.actualTimeRange)||void 0===l?void 0:l[0])!=void 0&&(t.actualStartTime=x()(t.actualTimeRange[0]).toDate()),(null===(n=t.actualTimeRange)||void 0===n?void 0:n[1])!=void 0&&(t.actualEndTime=x()(t.actualTimeRange[1]).toDate()),t.pPid=a;var i,d,l,n,o=!1;return await (0,v.gI)(t).then(t=>{if(console.log("response",t),t.status.success){var a;y.ZP.success("添加任务成功："+t.data),console.log("props.reloadData?.()",e.reloadData),null===(a=e.reloadData)||void 0===a||a.call(e),o=!0}else y.ZP.error(t.status.message),o=!1}),o},children:[(0,i.jsx)(n.Z,{width:"sm",name:"id",hidden:!0,label:"主键"}),(0,i.jsx)(n.Z,{width:"sm",name:"code",hidden:!0,label:"任务编码"}),(0,i.jsx)(n.Z,{width:"sm",name:"pPid",initialValue:e.pPid,hidden:!0,label:"祖宗id"}),(0,i.jsxs)(o.A.Group,{children:[(0,i.jsx)(r.Z,{width:"md",request:()=>(0,v.GD)(JSON.stringify({pageSize:1e3,pageNumber:1,data:[{code:"pid",value:"0",operateType:"="},{code:"",value:!0,operateType:"TREE"}]})).then(e=>(function e(t){let a=[];return t.map(t=>{let i={label:t.name,value:t.id,pPid:t.pPid};t.children&&(i.children=e(t.children)),a.push(i)}),a})(e.data.content)),name:"pid",label:"父级任务",fieldProps:{onSelect:(e,t)=>{console.log("onSelect",e,t),T(t.pPid)}},disabled:e.operationId===v.yU.DETAIL}),(0,i.jsx)(n.Z,{width:"md",name:"name",label:"任务名称",tooltip:"最长为 24 位",placeholder:"请输入任务名称",disabled:e.operationId===v.yU.DETAIL})]}),(0,i.jsx)(s.Z,{name:"description",label:"任务描述",placeholder:"请输入任务描述",disabled:e.operationId===v.yU.DETAIL}),(0,i.jsxs)(o.A.Group,{children:[(0,i.jsx)(p.Z,{request:async()=>v.Lu.map(e=>({label:e.name,value:e.code})),width:"sm",name:"priority",label:"任务优先级",initialValue:"3",disabled:e.operationId===v.yU.DETAIL}),(0,i.jsx)(p.Z,{width:"sm",options:v.g.map(e=>({label:e.name,value:e.code})),name:"state",label:"任务状态",initialValue:"8",disabled:e.operationId===v.yU.DETAIL})]}),(0,i.jsxs)(o.A.Group,{children:[(0,i.jsx)(c.Z,{initialValue:[x()(),void 0],name:"expectedTimeRange",label:"期望时间",fieldProps:{allowEmpty:[!0,!0],showTime:!0,needConfirm:!1},placeholder:["开始时间","结束时间"],disabled:e.operationId===v.yU.DETAIL}),(0,i.jsx)(c.Z,{name:"actualTimeRange",label:"实际时间",fieldProps:{allowEmpty:[!0,!0],showTime:!0,needConfirm:!1},placeholder:["开始时间","结束时间"],disabled:e.operationId===v.yU.DETAIL})]})]})}},24520:function(e,t,a){"use strict";var i=a(57437),d=a(64961),l=a(78288),n=a(39482),o=a(41306),r=a(23288),s=a(71423),p=a(88625),c=a(2265),u=a(67098),m=a(1653),y=a(42465),h=a(62737),v=a.n(h);t.default=()=>{let e=(0,c.useRef)();(0,c.useRef)();let[t,a]=c.useState(!0),[h,T]=c.useState(!0),[x,g]=c.useState(1),[I,f]=c.useState(5),{RangePicker:E}=o.default,b=[{key:"code",title:"任务编码",dataIndex:"code",width:"10%"},{key:"name",title:"任务名称",dataIndex:"name",width:"15%",copyable:!0,ellipsis:!0,tooltip:"标题过长会自动收缩",formItemProps:{rules:[{required:!0,message:"此项为必填项"}]}},{key:"description",title:"任务描述",dataIndex:"description"},{key:"priority",title:"任务优先级",dataIndex:"priority",order:2,valueType:"select",fieldProps:{mode:"tags",options:u.Lu.map(e=>({label:e.name,value:e.code}))},render:(e,t)=>{var a,l;return(0,i.jsx)(r.Z,{children:(0,i.jsxs)("div",{children:[(0,i.jsx)(d.Z,{style:{color:null===(a=u.Lu.find(e=>{var a;return e.code===(null===(a=t.priority)||void 0===a?void 0:a.toString())}))||void 0===a?void 0:a.color}}),null===(l=u.Lu.find(e=>{var a;return e.code===(null===(a=t.priority)||void 0===a?void 0:a.toString())}))||void 0===l?void 0:l.name]})})}},{key:"state",title:"任务状态",dataIndex:"state",valueType:"select",order:3,initialValue:["8","9"],fieldProps:{defaultValue:["8","9"],mode:"tags",options:u.g.map(e=>({label:e.name,value:e.code}))}},{key:"expectedStartTime",title:"期望开始时间",dataIndex:"expectedStartTime",valueType:"date",order:1,renderFormItem:()=>(0,i.jsx)(E,{allowEmpty:[!0,!0]})},{key:"expectedEndTime",title:"期望结束时间",dataIndex:"expectedEndTime",valueType:"date"},{key:"actualStartTime",title:"实际开始时间",dataIndex:"actualStartTime",valueType:"date"},{key:"actualEndTime",title:"期望结束时间",dataIndex:"actualEndTime",valueType:"date"},{key:"option",title:"操作",valueType:"option",render:(t,a)=>(0,i.jsx)(y.Z,{itemId:a.id,pid:a.pid,pPid:a.pPid,refreshDate:()=>{var t;null===(t=e.current)||void 0===t||t.reload(!1)}})}],j=[(0,i.jsx)(m.Q,{operationId:u.yU.ADD,description:"添加主线任务",reloadData:()=>{var t;null===(t=e.current)||void 0===t||t.reload(!1)}},1),(0,i.jsx)(s.Z,{checkedChildren:"树",unCheckedChildren:"列表",checked:t,onChange:(t,i)=>{var d,l;a(t),null===(l=e.current)||void 0===l||null===(d=l.reset)||void 0===d||d.call(l)}},2)];return t&&j.push((0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("span",{children:"树子集是否参与过滤"})," ",(0,i.jsx)(p.Z,{title:"开启树子集过滤后儿子不满足条件，孙子满足条件，儿子和孙子都不会显示。",children:(0,i.jsx)(l.Z,{})}),(0,i.jsx)(s.Z,{checkedChildren:"是",unCheckedChildren:"否",checked:h,onChange:(t,a)=>{var i;T(t),null===(i=e.current)||void 0===i||i.reload(!1)}})]})),(0,i.jsx)(n.Z,{columns:b,actionRef:e,cardBordered:!0,request:async(e,a,i)=>{console.log("request",e,e.keyword,a,i);let d=[];t&&d.push({name:"pid",value:"0",operateType:"="},{name:"tree",value:"TRUE",operateType:"TREE"}),h&&d.push({name:"tree",value:"TRUE",operateType:"TREE-FILTER"}),e.state instanceof Array&&e.state.length>0&&d.push({name:"state",value:e.state.join(","),operateType:"IN"}),e.priority instanceof Array&&e.state.length>0&&d.push({name:"priority",value:e.priority.join(","),operateType:"IN"}),e.expectedStartTime instanceof Array&&e.expectedStartTime.length>0&&(e.expectedStartTime[0]&&d.push({name:"expectedStartTime",value:v()(e.expectedStartTime[0]),operateType:">="}),e.expectedStartTime[1]&&d.push({name:"expectedStartTime",value:v()(e.expectedStartTime[1]),operateType:"<="})),e.name&&d.push({name:"name",value:e.name,operateType:"LIKE"}),e.description&&d.push({name:"description",value:e.description,operateType:"LIKE"}),e.code&&d.push({name:"code",value:e.code,operateType:"="});let l=JSON.stringify({pageSize:e.pageSize,pageNumber:e.current,data:d}),n=await (0,u.GD)(l);return{data:n.data.content,success:n.status.success,total:n.data.totalElements}},editable:{type:"multiple"},columnsState:{persistenceKey:"pro-table-singe-demos",persistenceType:"localStorage",defaultValue:{option:{fixed:"right",disable:!0}}},rowKey:"id",pagination:{current:x,pageSize:I,onChange:(e,t)=>{console.log("onChange",e,t),g(e),f(t)}},dateFormatter:"string",scroll:{y:600},toolBarRender:()=>j})}}},function(e){e.O(0,[412,167,231,746,186,268,465,971,23,744],function(){return e(e.s=61534)}),_N_E=e.O()}]);