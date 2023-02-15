import { observable, computed, action, autorun, makeObservable,toJS } from 'mobx';
import { getAllItems } from '../api/common_api';


class ItemStore {
    
    itemList =[];
    editindex="";
    addvalue=""

    constructor() {
        makeObservable(this, {
            itemList: observable,
            getAllItem:action,
            addItem: action,
            deletItem: action,
            editItem: action,
            allItems: computed,
        })
    }

    addItem = (value) => {
        console.log("value",value)
        this.itemList.push(value)
        // if(this.editvalue){
        //      this.addvalue = this.todoitem.find(this.editvalue)
        // }
        //     this.todoitem.push(value)
        console.log("this.itemList",toJS(this.itemList))
    }

    deletItem = (item) =>{
        // let index = this.todoitem.indexOf(item)
        // this.todoitem.splice(index,1)
    }

    editItem = (item) =>{
        // const result = this.todoitem.indexOf(item);
        // console.log(result);
        // this.editindex= result
    }
    getAllItem=async()=>{
        const data=await getAllItems();
        this.itemList=data.data  
    }

   
    
    // edittodoarr = (value) => {
    //     this.todoitem.fill(value,this.editindex,this.editindex+1)
    // }

    get allItems() {
        // return this.itemList;
        
    }

}



export default ItemStore;