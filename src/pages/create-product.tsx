import axios from "axios";
import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { nanoid } from 'nanoid';
type CreateProductProps = {};

type ProductItem = {
    id: string;
    title: string;
    price: number;
    qty: number;
  };
const CreateProduct: React.FC<CreateProductProps> = ({ }) => {

    const navigate=useNavigate();
const [data,setData]=useState<ProductItem>({
    id:nanoid(),
    title:'',
    price:0,
    qty:0
});

const hanldeChangeInput=(event:any)=>{
    setData({
        ...data,
        [event.target.name]: event.target.value,
      });
}

    const handlesubmit=async(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const {status}=await axios.post("http://localhost:3000/products",data);
        if(status===201)
        {
            setData({ id:'',
            title:'',
            price:0,
            qty:0});
            navigate('/product');
        }
    }
    console.log(data);
    return (


        <form className="max-w-sm mx-auto" onSubmit={handlesubmit}>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">Product Title:</label>
                <input type="text" name="title" value={data.title} onChange={hanldeChangeInput} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">Product price</label>
                <input type="number" name="price" value={data.price} onChange={hanldeChangeInput} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">Product qty</label>
                <input type="number" name="qty" value={data.qty} onChange={hanldeChangeInput} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
            </div>
            <button type="submit" className="text-white  bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">create product</button>
        </form>

    )
}

export default CreateProduct;