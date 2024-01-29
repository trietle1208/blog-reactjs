import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../images/blog1.jpg';
import {FaBars} from 'react-icons/fa';
import {AiOutlineClose} from 'react-icons/ai';
const Header = () => {
    const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800 ? true : false);
    const closeNavHandler = () => {
        if(window.innerWidth < 800) {
            setIsNavShowing(false);
        } else {
            setIsNavShowing(true);
        }
    }
  return (
    <nav>
        <div className="container nav__container">
            <Link onClick={closeNavHandler} to="/" className='nav__logo'>
                <img src={Logo} alt="" />
            </Link>
            {
                isNavShowing 
                && 
                <ul className="nav__menu">
                    <li>
                        <Link onClick={closeNavHandler} to="/profile/daddasdas">Ernest Achiever</Link>
                    </li>
                    <li>
                        <Link onClick={closeNavHandler} to="/create">Create Post</Link>
                    </li>
                    <li>
                        <Link onClick={closeNavHandler} to="/authors">Authors</Link>
                    </li>
                    <li>
                        <Link onClick={closeNavHandler} to="/logout">Logout</Link>
                    </li>
                </ul>
            }
            <button onClick={() => setIsNavShowing(!isNavShowing)} className="nav__toggle-btn">
                {
                    isNavShowing
                    ?
                    <AiOutlineClose></AiOutlineClose>
                    :
                    <FaBars></FaBars>
                }
            </button>
        </div>
    </nav>
  )
}

export default Header