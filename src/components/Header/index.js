import "./index.css";
import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import logo from "../../assets/logo.png";
import avatar from '../../assets/profile.png'
import avatar2 from '../../assets/profile2.png'
import { IoSearch } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
export default function Header() {
  const [openmenu, setOpenMenu] = useState(false);
  const [searchInput,setSearchInput] = useState("")



  let menuClass = openmenu ? "open" : "close";
  const navigate = useNavigate()

  return (
    <nav className="navbar-container">
      <div className="navbar-image-options">
        <div className="logo-image-container gap-4 d-flex align-item-center">
          <img src={logo} alt="image-logo" className="logo-image" />
          <ul className="d-none d-md-flex menu-list gap-3">
          <li onClick={()=>navigate('/',{replace:true})}>Home</li>
          <li onClick={()=>navigate('/popular',{replace:true})}>Popular</li>
          <li onClick={()=>navigate('/account',{replace:true})}>Account</li>
        </ul>
        </div>
        <div className="navbar-ul">
            <div className="search-input-icon">
              <input type="text" placeholder="Movie name" onChange={(e)=>setSearchInput(e.target.value)} onKeyDown={(e)=>{if (e.key==="Enter"){
                navigate(`/search?query=${searchInput}`);
              }}}/>
              <IoSearch className="navbar-icons" onClick={()=>navigate(`/search?query=${searchInput}`,{replace:true})}/>
            </div>
            <IoMenu className="d-md-none navbar-icons" onClick={() => setOpenMenu(true)}/>
              <img className="d-none d-md-block" src={avatar} alt="profile"/>
        </div>
      </div>

      <div className={`d-lg-none menu-overlay ${menuClass}`}>
        <ul className="menu-list">
          <li onClick={()=>navigate('/',{replace:true})}>Home</li>
          <li onClick={()=>navigate('/popular',{replace:true})}>Popular</li>
          <li onClick={()=>navigate('/account',{replace:true})}>Account</li>
          <li><IoIosCloseCircle className="close-btn" onClick={() => setOpenMenu(false)}/></li>
        </ul>
      </div>
    </nav>
  );
}
