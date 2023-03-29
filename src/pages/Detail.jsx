import React, { useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {productsActionDetail} from '../redux/actions/products'
import {CgMathMinus,CgMathPlus} from 'react-icons/cg'
import { productsCard } from '../redux/actions/card';

const Detail = () => {

  const {id} =useParams();
  const dispatch =useDispatch();
  const {product} = useSelector(state => state.product)
  const [count, setCount] = useState(0)

  useEffect(() => {
    dispatch(productsActionDetail(id))
  }, [id,dispatch])

  console.log("id", id)

  console.log("product", product)

  const increment = (stock) => {

    if(count<stock){
      setCount(count + 1)
    }
    
  }

  const decrement = () => {

    if(count>0){
      setCount(count - 1)
    }

  }

  const addCard = () => {
      dispatch(productsCard(id,count))
      dispatch({type:'DRAWER', payload:true})
  }


  return (
    <div style={{width:'60%',marginLeft:'60px', marginTop:'100px'}} >
      <img style={{width:'60%',paddingTop:'20px',paddingBottom:'20px' }} src={product?.image} alt=""/>
      <div style={{width:'90%',paddingTop:'10px',paddingBottom:'10px', fontSize:16 }}> {product?.title}</div>
      <div style={{width:'90%',paddingTop:'10px',paddingBottom:'10px', fontSize:12 }}> {product?.description}</div>
      <div style={{width:'90%',paddingTop:'10px',paddingBottom:'10px', fontSize:16 }}> Category: {product?.category}</div>
      <div style={{width:'90%',paddingTop:'10px',paddingBottom:'10px', fontSize:16 }}> Rate: {product?.rating?.rate} - Stok:{product?.rating?.count}</div>
      <div style={{width:'90%',paddingTop:'10px',paddingBottom:'10px', fontSize:16 }}> Fiyat: {product?.price}</div>

      <div style={{ display:'flex',flexWrap:'wrap', marginTop:'10px', marginLeft:'20px'}}>
        <CgMathMinus onClick={decrement}  style={{  marginLeft:'5px', marginTop:'3px',backgroundColor:'#ee3433', color:'white' ,borderRadius:'0.5rem'}} size={18}/>
        <span style={{  marginLeft:'10px'}}>{count}</span>
        <CgMathPlus onClick={()=>increment(product?.rating?.count)}  style={{  marginLeft:'10px',marginTop:'3px',backgroundColor:'#ee3433', color:'white' ,borderRadius:'0.5rem'}} size={18} />
      </div>
      <button  onClick={addCard}  style={{  marginLeft:'10px', marginTop:'10px',backgroundColor:'#ee3433', color:'white' ,borderRadius:'0.2rem', padding:'5px'}} >Sepete Ekle</button>
    </div>
  )
}

export default Detail
