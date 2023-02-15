import Request from ".";
import { ApiRoutes } from "../constants/api_url";

const insertItem = async (formdata) => {
    try {
      const res = await Request.post(ApiRoutes.INSERTITEM, formdata);
      return res;
    } catch (error) {
      throw error;
    }
  };

  const insertUser = async (formdata) => {
    try {
      const res = await Request.post(ApiRoutes.INSERTUSER, formdata);
      return res;
    } catch (error) {
      throw error;
    }
  };

  const loginUser = async (formdata) => {
    try {
      const res = await Request.post(ApiRoutes.LOGINUSER, formdata);
      return res;
    } catch (error) {
      throw error;
    }
  };

  const getAllItems = async () => {
    try {
      const res = await Request.get(ApiRoutes.GETALLITEMS);
      return res;
    } catch (error) {
      throw error;
    }
  };

  const deleteItem = async (id) => {
    try {
      const res = await Request.get(ApiRoutes.DELETEITEM+"/"+id);
      return res;
    } catch (error) {
      throw error;
    }
  };


  const editItem=async (data)=>{
    try {
      const res = await Request.post(ApiRoutes.UPDATEITEM, data);
      return res;
    } catch (error) {
      throw error;
    }
  }



export  {
    insertItem,
    insertUser,
    loginUser,
    getAllItems,
    deleteItem,
    editItem
}