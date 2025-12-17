import './index.css'
import { FaGoogle } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io5";
export default function Footer(){
    return(
        <div className='footer-container'>
            <div className='footer-icons-container'>
                <FaGoogle  className='footer-icon'/>
                <FaTwitter className='footer-icon'/>
                <FaInstagram className='footer-icon'/>
                <IoLogoYoutube className='footer-icon'/>
            </div>
            <h1>Contact Us</h1>
        </div>
    )
}