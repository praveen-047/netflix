import {Routes,Route} from "react-router-dom"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Login from './pages/Login/index.js'
import Home from './pages/Home/index.js'
import MovieDetails from './pages/MovieDetails/index.js'
import Popular from './pages/Popular/index.js'
import Account from "./pages/Account/index.js";
import NotFound from './pages/NotFound/index.js'
import ProtectedRoute from "./pages/ProtectedRoute/index.js";
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='/moviedetails/:id' element={<ProtectedRoute><MovieDetails/></ProtectedRoute>}/>
        <Route path='/popular' element={<ProtectedRoute><Popular/></ProtectedRoute>}/>
        <Route path='/account' element={<ProtectedRoute><Account/></ProtectedRoute>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
