import React from 'react';
import '../Footer.css';
import Logo from '../assets/logo.svg' ;
import { SiMinutemailer } from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section logo">
            <img src={Logo} className="logo-footer" alt="logo" />
        </div>
        <div className="footer-section about-us">
          <h2 className='footer-header'>About Us</h2>
          <p>Your Online Avenue to Reunion</p>
        </div>
        <div className="footer-section our-services">
          <h2 className='footer-header'>Our Services</h2>
          <ul>
            <li>Report lost items</li>
            <li>Report found items</li>
            <li>View reported items</li>
            <li>Offer and pay rewards</li>
          </ul>
        </div>
        <div className="footer-section contact-us">
          <h2 className='footer-header'>Contact Us
          <SiMinutemailer className='icon'/>
          <FaWhatsapp className='icon'/>
          </h2>
          <p>Email: group3@company.com</p>
          <p>Phone: (254) 011- 011 - 011</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Group 3. All rights reserved. Privacy Policy</p>
      </div>
    </footer>
  );
}

export default Footer;
