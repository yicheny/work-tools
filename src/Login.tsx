import React from 'react';
import {Card,Input,Button,Form,Checkbox,message} from 'antd';
import styles from './Login.module.scss';
import {Api, globalData} from "./base";
import {RouteComponentProps} from "react-router-dom";
import {tryExecute} from "./common/utils";
import {setDefaultSelectKey} from "./Sider";

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};

interface ILoginRequestParams{
    name:string,
    password:string,
    encrypted?:boolean,
    remember:boolean
}

const Login:React.FunctionComponent<RouteComponentProps> = function Login({history}) {

    const commit = (values: ILoginRequestParams) => {
        tryExecute(async ()=>{
            const result:any = await loginRequest(values)
            globalData.User = result.data;
            message.success('登录成功!');
            setDefaultSelectKey(0);
            history.push("/home");
        })
    };

    return <div className={styles.login}>
        <Card title='登录' className={styles.card}>
            <Form
                name="basic"
                {...layout}
                initialValues={{ remember: true }}
                onFinish={commit}
            >
                <Form.Item
                    label="账号"
                    name="name"
                    rules={[{ required: true, message: '请输入您的账号!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="密码" name="password"
                           rules={[{ required: true, message: '请输入您的密码' }]}>
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8 }} name="remember" valuePropName="checked">
                    <Checkbox>记住账号信息</Checkbox>
                </Form.Item>

                <Form.Item  wrapperCol={{ offset: 9 }}>
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    </div>
};

export default Login;

function loginRequest(params:ILoginRequestParams) {
    const {name,password,encrypted=false,remember} = params;

    const data = new FormData();
    data.append('name', name);
    data.append('password', password);
    data.append('remember', remember.toString());
    data.append('encrypted', encrypted.toString());

    return Api.post('/user/login', data);
}
