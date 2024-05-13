'use client'
import {Button, Col, Form, Input, Row, Select, Space, theme} from "antd";
import React, {useState} from "react";

const AdvancedSearchForm = () => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const [searchFields, setSearchFields] = useState<any[]>([
            // <Select
            //     defaultValue="state"
            //     style={{ width: 120 }}
            //     allowClear
            //     options={[{ value: 'state', label: '任务状态' }]}
            // />,
            // <Select
            //     defaultValue='='
            //     style={{ width: 120 }}
            //     allowClear
            //     options={[{ value: '=', label: '等于' },{value:'IN',label:"多个选择"}]}
            // />,
            <Select key='1'
                mode="tags"
                defaultValue={['8','9']}
                style={{ width: 180 }}
                allowClear
                options={[{ value: '8', label: '新建' },{ value: '9', label: '进行中' },{ value: '7', label: '完成' },]}
            />


    ])

    const formStyle: React.CSSProperties = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
    };

    const getFields = () => {
        const count = 10;
        const children = [];
        for (let i = 0; i < count; i++) {
            children.push(
                <Col span={8} key={i}>
                    {i % 3 !== 1 ? (
                        <Form.Item
                            name={`field-${i}`}
                            label={`Field ${i}`}
                            rules={[
                                {
                                    required: true,
                                    message: 'Input something!',
                                },
                            ]}
                        >
                            <Input placeholder="placeholder" />
                        </Form.Item>
                    ) : (
                        <Form.Item
                            name={`field-${i}`}
                            label={`Field ${i}`}
                            rules={[
                                {
                                    required: true,
                                    message: 'Select something!',
                                },
                            ]}
                            initialValue="1"
                        >
                            <Select>
                            </Select>
                        </Form.Item>
                    )}
                </Col>,
            );
        }
        return children;
    };

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
            {/*<Form.Item>*/}
            {/*<Row gutter={24}>{searchFields}</Row>*/}
            {/*    </Form.Item>*/}
            {/*<div style={{ textAlign: 'right' }}>*/}
            {/*    <Space size="small">*/}
            {/*<Form.Item>*/}
            {/*    <Button type="primary">*/}
            {/*        添加*/}
            {/*    </Button>*/}
            {/*<Form.Item>*/}

                {searchFields}

                <Button type="primary" htmlType="submit">
                    搜索
                </Button>
            {/*<CustomSearchForm/>*/}
            {/*</Form.Item>*/}
                {/*<Button type="primary" htmlType="submit">*/}
                {/*    自定义搜索*/}
                {/*</Button>*/}
                {/*<Button*/}
                {/*    onClick={() => {*/}
                {/*        form.resetFields();*/}
                {/*    }}*/}
                {/*>*/}
                {/*    清空*/}
                {/*</Button>*/}
            {/*</Form.Item>*/}
                    {/*<a*/}
                    {/*    style={{ fontSize: 12 }}*/}
                    {/*    onClick={() => {*/}
                    {/*        setExpand(!expand);*/}
                    {/*    }}*/}
                    {/*><DownOutlined rotate={expand ? 180 : 0} /> Collapse*/}
                    {/*</a>*/}
            {/*    </Space>*/}
            {/*</div>*/}
        </Form>
    );
};
export default AdvancedSearchForm;
