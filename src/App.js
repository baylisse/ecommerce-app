import { Routes, Route } from 'react-router-dom';
import Home from "./routes/home/Home.js";
import NavBar from './routes/navbar/NavBar.js';
import Login from './routes/login/Login.js';


const App = () => {

  return (
    <>
      <Routes>
        <Route path='/' element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
