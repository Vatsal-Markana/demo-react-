import React, { useEffect, useState } from'react';

import { Button, Checkbox, Form, Input } from 'antd';
import { loginUser } from '../api/common_api';
import { useNavigate } from 'react-router-dom';

const Login=()=>{
    const navigate=useNavigate()
    const onFinish = async(values) => {
        console.log("values",values)
        const user=await loginUser(values);
        if(user?.status==1)
        {
            localStorage.setItem('token', user.token);
            localStorage.setItem('isAuthenticated',true)
            navigate("/item")
        }
        
      };

      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      const gotosignUp=()=>{
        navigate("/")
      }

      const submithandler = (e) =>{
        console.log("submit");
        e.preventDefault() ;
      }
     return <>   
      <h1 style={{textAlign:"center", position:"relative"}}>LOGIN</h1>
     <Form
     onSubmit={submithandler}
     name="basic"
     labelCol={{
       span: 8,
     }}
     wrapperCol={{
       span: 8,
     }}
     initialValues={{
       remember: true,
     }}
     onFinish={onFinish}
     onFinishFailed={onFinishFailed}
     autoComplete="off"
   >
     <Form.Item
       label="Email"
       name="email"
       rules={[
         {
           required: true,
           message: 'Please Enter Yout Email!',
         },
       ]}
     >
       <Input />
     </Form.Item>

     <Form.Item
       label="Password"
       name="password"
       rules={[
         {
           required: true,
           message: 'Please Enter Your Password!',
         },
       ]}
     >
       <Input.Password />
     </Form.Item>

     {/* <Form.Item
       name="remember"
       valuePropName="checked"
       wrapperCol={{
         offset: 8,
         span: 8,
       }}
     >
       <Checkbox>Remember me</Checkbox>
     </Form.Item> */}

     <Form.Item
       wrapperCol={{
         offset: 8,
         span: 8,
       }}
     >
       <Button type="primary" htmlType="submit">
         Submit
       </Button>
       <Button type="link" style={{textAlign:"center", position:"relative"}}  onClick={gotosignUp}>Create an account Click here ...</Button>
     </Form.Item>
   </Form></>
}

export default Login
