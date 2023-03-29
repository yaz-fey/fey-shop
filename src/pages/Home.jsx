import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard';
import { productsAction } from '../redux/actions/products';
import { searchAction } from '../redux/actions/search';

const Home = () => {

  const dispacth = useDispatch();
  const { products } = useSelector(state => state.products);
  const { search } = useSelector(state => state.search);

  useEffect(() => {
    dispacth(productsAction())
    dispacth(searchAction())
  }, [dispacth])

  console.log("products", products)
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '40px', marginLeft: '20px' }}>
      {
        search.length > 0 ?
          search.map((prd, i) => (
            <ProductCard key={i} prd={prd} />
          )) : products && products.map((prd, i) => (
            <ProductCard key={i} prd={prd} />
          ))


      }
    </div>
  )
}

export default Home
