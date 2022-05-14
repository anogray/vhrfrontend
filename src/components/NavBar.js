import React, { useState } from 'react';
import { useEffect } from 'react';
import {Link} from "react-router-dom"
import  {useResponsive}  from 'react-hooks-responsive'
import { useHistory } from 'react-router-dom';
import { fontSize } from '@mui/system';
import {Button} from "react-bootstrap";

export default function Navbar(){
    const breakpoints = { xs: 0, sm: 480, md: 1024 }

    const { size, orientation, screenIsAtLeast, screenIsAtMost } = useResponsive(breakpoints)
    const [state, setstate] = useState(true);
    const history = useHistory();

    useEffect(()=>{

        if(size=="xs"){
            setstate(false);
        }
        else{
            setstate(true);  
        }
    },[size])

    const handleHome = ()=>{
            
        history.push("/");
    }

    return(
        <>
        <div className="navbar-container">
            <div className="nav-container">
            <div className="nav-feature">
           {  state && <div className="logo-image">
              <img src="/logo.png" alt="image" className="logo-img" />
            </div>}
            {!state && <div className="hamburger">
            <Button > &#9776;</Button >
            </div>
               
            }
            <div className="title" onClick={handleHome} style={{"cursor": "pointer",  "font-weight": "bold" }}>
                Home
            </div>
            {state && <div className="about-us">
            <Link to = "/aboutus"> About Us</Link>
               
            </div>}
            </div>

            </div>
            
        </div>
        </>
    )
}