import React from 'react'

const ProductCard = ({prd}) => {
  return (
    <div  style={{ alignItems:'center', width:'20%',height:'240px',borderWidth:'1px',borderRadius:'0.5rem',padding:'20px',margin:'10px' }}>
      <img onClick={() => window.location = `detail/${prd.id}`} style={{ width:'90%',height:'100px'}} src={prd?.image} alt=""/>
      <div style={{font:'bold', fontSize:12}}>{(prd?.title).substring(0,20)}...</div>
      <div style={{fontSize:10}}>{(prd?.description).substring(0,40)}...</div>
      <div style={{fontSize:18}}>{prd?.price} TL</div>

      <div  style={{ alignItems:'center', backgroundColor:'#ee3433', color:'white',width:'100%',borderRadius:'0.5rem',padding:'2px', paddingLeft:'20px'  ,fontSize:16, font:'bold'}}>Sepete Ekle</div>


    </div>
  )
}

export default ProductCard
