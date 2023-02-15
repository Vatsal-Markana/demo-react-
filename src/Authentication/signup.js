import React, { useEffect, useState } from'react';
import { useNavigate  } from 'react-router';
import { Button, Checkbox, Form, Input } from 'antd';
import { insertUser } from '../api/common_api';

const SignUp=()=>{
    const navigate=useNavigate()
    const [data,setData]=useState({})
    const onFinish=async(val)=>{
        console.log(val)
        console.log("data",data)
        const insertData=await insertUser(data)
        console.log("insertData",insertData)
        if(insertData.status ==1)
        {
          setData({})
          navigate("/login")
        }
    }
    const onFinishFailed=(err)=>{
        console.log(err)
    }

    const gotologin = () => {
      navigate('/login')
    }
    return <>
      <h3 style={{textAlign:"center", position:"relative",color:"gray"}}>SIGNUP</h3>
      <Form
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
            label="Name"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please Enter Your Name!',
              },
            ]}
  
          >
            <Input placeholder='Enter Your Name' value={data.username} onChange={(e)=>setData({...data,username:e.target.value})}/>
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please Enter Your Email!',
              },
            ]}
  
          >
            <Input placeholder='Enter Email' value={data.email} onChange={(e)=>setData({...data,email:e.target.value})}/>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please Enter Paassword!',
              },
            ]}
  
          >
            <Input.Password placeholder='Enter Password' value={data.password} onChange={(e)=>setData({...data,password:e.target.value})}/>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 8,
            }}
          >
          <Button type="primary" htmlType="submit" style={{textAlign:"center", position:"relative"}}>
              Submit
            </Button>
            <Button type="link" style={{textAlign:"center", position:"relative"}}  onClick={gotologin}>Already has an account Click here ...</Button>
            </Form.Item>
    </Form>
    </>
}


export default SignUp;