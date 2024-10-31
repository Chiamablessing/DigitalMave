import React from 'react'
import { IoMdCheckmark } from "react-icons/io";
import { FiAlertCircle } from "react-icons/fi";
import img1 from '../images/React1.png';
import img2 from '../images/React2.png';
import img3 from '../images/React3.png';
import img4 from '../images/React4.png';
import img6 from '../images/React6.png';
import img11 from '../images/React11.png';
import img7 from '../images/React7.png';
import img9 from '../images/React9.png';
import img5 from '../images/React5.png';
import img8 from '../images/React8.png';
import img10 from '../images/React10.png';
import img12 from '../images/React12.png';
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import img13 from '../images/React13.png';
import img14 from '../images/React14.png';
import img15 from '../images/React15.png';
import img16 from '../images/React16.png';
import { PiFramerLogoFill } from "react-icons/pi";
import { FaMeta } from "react-icons/fa6";
import { SiAdobe } from "react-icons/si";
import img17 from '../images/amazon.webp';
import { FaSquarespace } from "react-icons/fa6";
import { FaApple, FaTimes } from "react-icons/fa";
import { BiLogoFigma } from "react-icons/bi";
import img18 from '../images/google.png';
import { FaMicrosoft } from "react-icons/fa";
import { useState } from 'react';



function Gopro() {
        const [moveSpan, setMoveSpan] = useState(false);

        const toggleSpan = () =>{
           setMoveSpan(!moveSpan)
        };

  return (
    <div className='maincon'>

        <div className="wrapper">



    <div className='con1'>
    <button className='drib'>DRIBBBLE PRO</button>
        <p className='lead'>Get more leads,
        pay no fees.</p>
        <p className='beat'>Unbeatable ROI for professional designers growing their business.</p>
    </div>
    <div className='con2'>
    <p className='billing'>SAVE 50% WITH ANNUAL BILLING</p>
        <p className='con2p'><span className='dollar'>$8</span><span className='per'>per month</span></p>
<div className="wholeContainer">

<div className="leftCon">

<div className='dividee' onClick={toggleSpan} > 
        <span className={`divide ${ moveSpan ? 'spaning' :'' }`}></span> 
</div>

        <span className='year'>Yearly</span>
</div>

<div className="rightCon">

        <span>you save 50%</span>
</div>
</div>
<div>
        <p className='blue'>< IoMdCheckmark className='mark'/>No fee transactions (annual plans only)<FiAlertCircle /></p>
        <p className='blue'><IoMdCheckmark className='mark' />Ranking boost in feeds</p>
        <p className='blue'><IoMdCheckmark className='mark' />Advanced profiles</p>
        <p className='blue'><IoMdCheckmark className='mark' />Ad free browsing</p>
</div>

        <button className='pay'>pay now</button>
    </div>


        </div>


<div className="secondSection">

        <div className='image1'>
<img src={img1} alt="" />
<div className='text'>
<p className='stand'>Stand out from the crowd</p>
<p className='rank'>Rank higher in feeds to generate more leads.</p>
</div>
</div>


        <div className='image1'>
<img src={img2} alt="" />
<div className='text'>
<p className='stand'>Improve conversion</p>
<p className='rank'>Access advanced features that will help convert more leads.</p>
</div>
</div>


        <div className='image1'>
<img src={img3} alt="" />
<div className='text'>
<p className='stand'>Transact for free</p>
<p className='rank'>Pay no fees on transactions completed through Dribbble.</p>
</div>
</div>

</div>
<div className="thirdsection">
        <img className='imag4' src={img4} alt="" />
        <div className='present'>
        <p className='work'>Present yourself and your work in a more compelling way.</p>
        <p className='pros'>Pros get advanced profile features like Pitch, Projects, and much more.</p>
</div>
</div>
<div className='fourthsection'>
        <div className="Texts">
        <p className='fourthsectionText'>Showcase your portfolio with a custom domain.</p>
        <p className='fourthsectionTextonly'>Showcase your work on a portfolio website powered by Dribbble.</p>
        </div>

        <div className="imageCon">

        <img src={img6}  className='images' />
        <img src={img7}  className='images' />
        <img src={img7}  className='images' />
        <img src={img9}  className='images' />
        <img src={img5}  className='images' />
        <img src={img8} className='images' />

        </div>
        <div className="enlagedPic">

        <img src={img11}  className='images big' />
        </div>

</div>
<div className='fifthsection'>
        <img className='imag10' src={img10} alt="" />
        <div className='convert'>
        <p className='deliver'>Convert leads, deliver work, and get paid through Dribbble
        (for free).</p>
        <p className='plat'>Platform fees are waived for Pros who transact through Dribbble.</p>
        </div>
</div>
<div className='sixthsection'>
        <div className='webflow'>
        <p className='twelve'>12 Months of Webflow Included</p>
        <p className='web'>Sign up for Dribbble Pro and get your first 12 months of Webflow's Agency or Freelancer workspace plans - for free!</p>

        <button className='up'>sign-up now</button>
        </div>
        <img src={img12} alt="" />
</div>

<div className='GseventhSection'>
<p className='what'>What designers have to say</p>

<div className="seventhSection">
{/* <p className='what'>What designers have to say</p> */}

        <div className='image7'>
        <p className='solid'><BiSolidQuoteAltLeft /></p>
<p className='manage'>Because of Dribbble I managed to increase my profit more then 10 times in just a year. It was the most amazing experience of my life and I am still living it!</p>
<div className='cioba'>
<img className='img13' src={img13} alt="" />
<div className='visual'>
<p className='cloud'>Claudiu Cioba</p>
<p className='ui'>UI / Visual Design, Product Design</p>
</div>
</div>
</div>


        <div className='image8'>
        <p className='quote'><BiSolidQuoteAltLeft /></p>
<p className='florida'>I recently moved to LA from Florida and I’ve had steady freelance work all thanks to Dribbble. Best investment I’ve made was becoming Pro.</p>
<div className='waite'>
<img src={img14} alt="" />
<div className='brown'>
<p className='shane'>Shane Waite</p>
<p className='brand'>Brand Design</p>
</div>
</div>
</div>


        <div className='image9'>
        <p className='alt'><BiSolidQuoteAltLeft /></p>
<p className='days'>12 work enquiries in 2 days. The money spent for Dribbble Pro is the best money you can spend if you are a designer.</p>
<div className='design'>
<img src={img15} alt="" />
<div className='kyee'>
<p className='kye'>Kyee</p>
<p className='des'>Product Design</p>
</div>
</div>
</div>


</div>
</div>
<div className='eightsection'>
        <div className='computer'>
        <p className='comp'>The most design-forward companies on the planet</p>
                <p className='comp'> hire designers from Dribbble.</p>
        <p className='commune'>Our community partners with some of the most valuable companies on the planet.</p>
        </div>
        <div className='deu'>
        <div className='end1'>
       <img className='img16' src={img16} alt="" />
       <p className='pi'><PiFramerLogoFill /> <span className='frame'>Framer</span></p>
       <p className='micro'><FaMicrosoft /> <span className='microsoft'>Microsoft</span></p>
       <p className='meta'><FaMeta /> <span className='met'>Meta</span></p>
       <p className='sia'><SiAdobe /> <span className='adobe'>Adobe</span></p>
       <img className='img17' src={img17} alt="" />
       </div>
       <div className='end2'>
       <p className='squad'><FaSquarespace /> <span className='square'>SQUARESPACE</span></p>
       <p className='apple'><FaApple /></p>
       <p className='bil'><BiLogoFigma /> <span className='figma'>Figma</span></p>
       <p className='uber'>Uber</p>
       <img className='img18' src={img18} alt="" />
       <p className='stripe'>Stripe</p>
       </div>
       </div>


</div>
<div className='ninthsection'>
        <p className='career'>Level up your career with Pro</p>
        <div className='ninthsection-one'>
                <p>SAVE 50% WITH ANNUAL BILLING</p>
                <h3><span>$8</span>per month</h3>
                <div className='btnyearly'>
                        <div className='btn1'>

                                <div className='dividee' onClick={toggleSpan}>
                                <span className={`divide ${ moveSpan ? 'spaning' : ''}`}><span className='month'>Monthly</span></span>
                                </div>
                                </div>
                        <h6>Yearly</h6>

                </div>
                <div className="subscribe">
                        <div className="firstsub">
                                <p className='ash'>< IoMdCheckmark className='mark'/>No fee transactions (annual plans only)<FiAlertCircle /></p>
                                <p className='ash'><IoMdCheckmark className='mark' />Custom Website</p>
                                <p className='ash'><IoMdCheckmark className='mark' />Advanced profiles</p>
                                <p className='ash'><IoMdCheckmark className='mark' />Ad free browsing</p>

                        </div>

                        <div className="secondsub">
                                <p className='blue'>< IoMdCheckmark className='mark'/>Ranking boost in feeds</p>
                                <p className='blue'><IoMdCheckmark className='mark' />Team accounts</p>
                                <p className='blue'><IoMdCheckmark className='mark' />Advanced analytics</p>
                                <p className='blue'><IoMdCheckmark className='mark' />12 months of Webflow</p>
                        </div>
                </div>
                <button className='pay'>pay now</button>
        </div>
</div>
   </div>

  )
}

export default Gopro
