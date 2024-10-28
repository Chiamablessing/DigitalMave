import React from 'react'
import "./App.css";
import Inspiration from './Components/Inspiration/Inspiration'
import Home from './Components/Home/Home'
// import Signup from './Components/Signup/Signup'
import Jobs from './Components/Jobs/Board'
import Navbar from './Components/Navbar/Navbar'
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
  <Route path="/"  element={<Home/>}/>
  <Route path="/inspiration"  element={<Inspiration/>}/>
  <Route path="/Jobs"  element={<Jobs/>}/>
  {/* <Link to="/signup">
    <button>Get Started</button>
</Link> */}
  {/* <Route path="/Go pro"  element={<Home/>}/> */}

</Routes>



    </div>
  )
}

export default App
