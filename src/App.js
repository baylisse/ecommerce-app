import { Routes, Route } from 'react-router-dom';
import Home from "./routes/home/Home.js";
import NavBar from './routes/navbar/NavBar.js';
import Authentication from './routes/authentication/Authentication';
import Shop from './routes/shop/Shop.js';


const App = () => {

  return (
    <>
      <Routes>
        <Route path='/' element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path='shop' element={<Shop />}/>
          <Route path='auth' element={<Authentication />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
