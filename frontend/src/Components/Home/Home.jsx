import React from 'react'
import './Home.css';
import { Link } from 'react-router-dom'
// import Inspiration from '../Inspiration/Inspiration'
import Secondpage from "../Secondpage/Secondpage";
import Thirdpage from "../Thirdpage/Thirdpage";
import footer from '../Footer/footer'


const Home = () => {

  return (
    <div className='mainContainer'>

      <div className="centerContents">
        <p className='topContent'>over # million ready-to-work creatives!</p>
        <p className='secondContent'>The world's destination for design</p>
        <p className="thirdContent">Get inspired by the work of millions of top-rated designers & agencies around the world.</p>
        <div className="contentBtn">
          <button type='submit'>Get started</button>
        </div>
      </div>

    < Secondpage/>
    <Thirdpage/>


<div className="findDesigner">

  <p className='findFirst'>Find your next designer today</p>

  <div className="texts">

  <p className='secondFind'>The world's leading brands use Digital Maven to hire creative talent. </p>
  <p className='thridFind'>Browse millions of top-rated portfilios to find your perfect creative match.</p>
  </div>

  <div className="btns">
    <button type='submit'  className='btn '>Get started now</button>
    <button type='submit' className='btn secondbtn'>learn about hiring</button>
  </div>

  <div className="JoinDribble">
    <p>Are you a designer? <Link>Join Digital Maven</Link></p>
  </div>
</div>
<footer/>











    </div>
  )

}


export default Home
