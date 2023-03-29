import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Card from './components/Card';
import { useSelector } from 'react-redux';
function App() {

  const  {drawer} = useSelector(state => state.drawer);

  console.log("drawer",drawer)
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        {drawer && <Card/>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="detail/:id" element={<Detail />} />
        </Routes>
       
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
