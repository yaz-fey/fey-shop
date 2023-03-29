import React, { useState} from 'react'
import { BsLightbulb, BsBasketFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { searchAction } from '../redux/actions/search'

const Navbar = () => {

    const dispacth = useDispatch()

    const { cardItems } = useSelector(state => state.card);
    const [search, setSearch]= useState('')
    const searchPost = (e) => {
        if(e.key==='Enter'){
            dispacth(searchAction(search))
        }
    }
    return (
        <div style={{ float: 'right', margin: '20px' }}>
            <div style={{ float: 'left' }}><input value={search} onKeyPress={searchPost} onChange={e => setSearch(e.target.value)} type="text" placeholder='search' /></div>
            <div style={{ float: 'left' }}>LOGO</div>
            <BsLightbulb style={{ float: 'left', marginRight: '20px' }} />
            <div onClick={() => dispacth({type:'DRAWER', payload:true})} className='relative' style={{ float: 'left' }}>
                <BsBasketFill size={35} style={{ float: 'left' }} />
                <span   style={{ float: 'left',backgroundColor:'#ee3433',padding:'2px', color:'white' ,borderRadius:'0.5rem'}} >
                    {cardItems?.length}
                </span>
            </div>
            <br />
        </div>

    )
}

export default Navbar
