import {  Card, Row, Table } from "antd"
import { Button, Checkbox, Form, Input } from 'antd';
import { useContext, useEffect, useState } from "react";
import { deleteItem, editItem, getAllItems, insertItem } from "../api/common_api";
import { DeleteFilled,EditFilled } from '@ant-design/icons';
import socketIO from "socket.io-client";
import { useNavigate } from "react-router-dom";
// import {ItemStore} from "../store/itemStore";
import { observer } from 'mobx-react'
import { Indexstore } from "../store/indexStore";
import { toJS } from "mobx";

const Item = observer(({socket} )=>{
    // const socket = socketIO.connect('http://localhost:3000');
    const store = Indexstore()
    // const store=useContext(Indexstore)
    const auth=localStorage.getItem("isAuthenticated");
    const navigate=useNavigate()
    const[itemList,setItemList]=useState([])
    const [data,setData]=useState({});
    const [step,setStep]=useState(0);

    console.log("tosre",toJS(store.itemStore.itemList))

    const onFinish=async(val)=>{
        if(step==1)
        { 
          store.itemStore.addItem({i_id:100,...data});
          setStep(0);
              setData({})
              // getAllItem();
        
          // const insertData=await insertItem(data);
          //   if(insertData?.status==1)
          // {
          //     setStep(0);
          //     setData({})
          //     getAllItem();
          // }
        }
        if(step==2)
        {
       
          const eData=await editItem(data);

          if(eData?.status==1)
          {
            setStep(0);
            setData({})
            getAllItem();
          }
        }
        

  
    }
    const onFinishFailed=(err)=>{
        console.log(err)
    }

    const deleteData=async(id)=>{
        const itemdelete=await deleteItem(id);

        if(itemdelete?.status==1)
        {
            alert(itemdelete.descripation);
            getAllItem();
        }
        
    }

    const editData=async(record)=>{
      setStep(2);
      setData(record);
    }

    // useEffect(() => {
    //   console.log("useEfefctx")
    //   socket.on('getAllItem', function(data) {console.log("data socket",data)});
    //   socket.on('insertItem', function(data) {console.log("data socket",data)});
    // }, [socket]);

    const getAllItem=async()=>{
       store.itemStore.getAllItem();
        const getItems=await getAllItems();
        setItemList(getItems.data)

    }

    useEffect(()=>{
        if(auth)
        {
          getAllItem();
        }
        else{
          navigate("/login");
        }
        
    },[])



  

const columns = [ 
    { 
    key: "itemName", 
    title: "Item Name", 
    dataIndex: "itemName", 
    }, 
    { 
    key: "price", 
    title: "Price", 
    dataIndex: "price", 
    }, 
    { 
    key: "i_type", 
    title: "Item Type", 
    dataIndex: "i_type", 
    }, 

    { 
       
        title: "Action", 
        dataIndex: "action", 
        render: (text,record,index) => {

            return <>
                <DeleteFilled title="Delete Item" style={{color:"red",margin:"2px"}} onClick={()=>{deleteData(record.i_id)}}></DeleteFilled>
                <EditFilled title="Edit Item" style={{color:"orange",margin:"2px"}} onClick={()=>{editData(record)}}></EditFilled>
            </> 
        
        }
}, 
 
 ] 

    return <>
    {
        step ==0 ?    <div>
            <Card>
                
            <Button type="primary" htmlType="submit" style={{textAlign:"center", position:"relative"}} onClick={()=>{setStep(1)}}>
             Add Item
         </Button>
        <Table dataSource={toJS(store.itemStore.itemList)} columns={columns} pagination={false} /> 
            </Card>
        
       
</div> :<div>
<Card>
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
         
          autoComplete="on"
        >
              <Form.Item
            wrapperCol={{
              offset: 8,
              span: 8,
            }}
          >
          <Button type="default" onClick={()=>{setStep(0)}} htmlType="button" style={{textAlign:"center", position:"relative"}}>
              Back
            </Button>
          
            </Form.Item>
        <Form.Item
            label="Item Name"
            name="itemName"
            rules={[
              {
                required: true,
                message: 'Please Enter Your ItemName!',
              },
            ]}
            initialValue={data.itemName}
          >
            <Input placeholder='Enter Item Name' value={data.itemName} onChange={(e)=>setData({...data,itemName:e.target.value})}/>
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: 'Please Item Price!',
              },
            ]}
            initialValue={data.price}
          >
            <Input type="number" placeholder='Enter Price' defaultValue={data.price} onChange={(e)=>setData({...data,price:e.target.value})}/>
          </Form.Item>
          <Form.Item
            label="Type"
            name="i_type"
            rules={[
              {
                required: true,
                message: 'Please Enter Item type!',
              },
            ]}
            initialValue={data.i_type}
          >
            <Input placeholder='Enter Item Type' defaultValue={data.i_type} onChange={(e)=>setData({...data,i_type:e.target.value})}/>
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
          
            </Form.Item>
    </Form>
    </Card>
        
    </div>
    }

    

    </>
})


export default Item