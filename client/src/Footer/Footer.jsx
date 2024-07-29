import React from 'react'
import'./Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight,faHandsHoldingCircle,faRocket,faHourglassHalf,faCreditCard ,faLocationArrow  } from '@fortawesome/free-solid-svg-icons'


const Footer = () => {
  return (
    <div>
        <div className="footer">
       <div className="footer-details">
        <h3>Lost & Found </h3>
        <p>Your Online Avenue to Reunion</p>
        <p></p>
       </div>
       <div className="newsletter">
            <div className="news-container">
         <label htmlFor="">Newsletter signup</label>
         <input type="text" placeholder='Enter your email' />
         <button className='subscribe-btn'><FontAwesomeIcon icon={faLocationArrow} style={{color: "#74C0FC", fontSize: "20px"}} /></button>
        </div>
        <div className="use-legal">
          <div className="legal">
            <h3>Privacy Policy</h3>
            <h3>Term & Condition</h3>
          </div>
          <div className="useful-link">
        
            <h3>Report Lost items</h3>
            <h3>Report Found Items</h3>
            <h3>View reported items</h3>
            <h3>Offer and Pay Rewords</h3>
            
          </div>
        </div>
       </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright © 2024 MORINGA LOST & FOUND . All rights reserved.</p>

      </div>
    </div>
  )
}

export default Footer