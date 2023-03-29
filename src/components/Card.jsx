import React from 'react'
import '../index.css';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { removeCart } from '../redux/actions/card';
const Card = () => {
  const dispacth = useDispatch()
  const { cardItems } = useSelector(state => state.card);

  console.log(cardItems)

  const deleteCard = (id) => {
    dispacth(removeCart(id))
  }


  return (
    <div style={{ width: '40%', height: '100%', backgroundColor: '#eee', border: '1px solid', position: 'fixed', marginTop: '40px', right: '5px', zIndex: 1 }}>
      <div>
        <h1 style={{ fontSize: '20px', position: 'fixed', right: '50px' }}>
          SEPETİM
        </h1>
        <AiOutlineClose onClick={() => dispacth({ type: 'DRAWER', payload: false })} size={20} style={{ position: 'fixed', right: '10px', marginTop: '5px' }} />
      </div>

      {
        cardItems?.map((card, i) => (

          <div key={i} style={{ display: 'flex', flexWrap: 'wrap', marginTop: '50px', backgroundColor: 'bisque', marginBottom: '10px' }}>
            <img style={{ width: '10%' }}  src={card?.image} alt=""/>
            <div style={{ width: '65%', paddingBottom: '10px', fontSize: 20 }}>
              <div style={{ paddingBottom: '10px', fontSize: 12 }}>{card?.title} - ({card?.qty})</div>
              <div style={{ paddingBottom: '10px', fontSize: 10 }}>{(card?.description).substring(0,45)}...</div>
            </div>
            <div style={{ fontSize: 15, padding: 2 }}>{card?.price}</div>
            <div onClick={() => deleteCard(card.id)} style={{ height: '30px', marginLeft: '10px', padding: 2, fontSize: 15, backgroundColor: '#ee3433', color: 'white' }}>Sil</div>
          </div>

        ))
      }


    </div>
  )
}

export default Card
