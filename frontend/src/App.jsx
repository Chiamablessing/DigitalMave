import React from 'react'
import "./App.css";
import Inspiration from './Components/Inspiration/Inspiration'
import Home from './Components/Home/Home'
// import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login';
import Jobs from './Components/Jobs/Board'
import Navbar from './Components/Navbar/Navbar'
import {Routes, Route} from 'react-router-dom'
import Footer from './Components/Footer/footer';
import AboutUs from './pages/AboutUS/AboutUS';
import ContactUs from './pages/ContactUs/ContactUs';
import Post from './pages/Post/Post';
import Signup from './pages/Signup/Signup';


function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
  <Route path="/"  element={<Home/>}/>
  <Route path="/inspiration"  element={<Inspiration/>}/>
  <Route path="/Jobs"  element={<Jobs/>}/>
  <Route path="/about"  element={<AboutUs/>}/>
  <Route path="/post"  element={<Post/>}/>
  <Route path="/signup"  element={<Signup/>}/>
  
  <Route path="/contactus"  element={<ContactUs/>}/>
 
  <Route path="/signup"  element={<Signup/>}/>
  <Route path="/login"  element={<Login/>}/>
  {/* <Link to="/signup">
    <button>Get Started</button>
</Link> */}
  {/* <Route path="/Go pro"  element={<Home/>}/> */}

</Routes>

<Footer/>

    </div>
  )
}

export default App
