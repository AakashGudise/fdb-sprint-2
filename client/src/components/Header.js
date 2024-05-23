import React, { useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import logo from '../assets/images/logo.png'

import "./header.css"
import { LoginContext } from './ContextProvider/Context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, NavLink, Link } from "react-router-dom"

const Header = () => {

    const { logindata, setLoginData } = useContext(LoginContext);

    const history = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const logoutuser = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                Accept: "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        console.log(data);

        if (data.status == 201) {
            console.log("use logout");
            localStorage.removeItem("usersdatatoken");
            setLoginData(false)
            history("/");
        } else {
            console.log("error");
        }
    }

    const goDocument = () => {
        history("/user")
    }

    const goUploadDocument = () => {
        history("/createUser")
    }

    const goDash = () => {
        history("/dash")
    }

    const goError = () => {
        history("/")
    }

    return (
        <>
            <header>
                <nav>

                    <NavLink to="/dash" style={{textDecoration:"none",color:"pink"}}><h1>Find Dubai</h1></NavLink>
                    <div className="avtar">
                        {
                            logindata.ValidUserOne ? <Avatar style={{ background: "salmon", fontWeight: "bold", textTransform: "capitalize" }} onClick={handleClick}>{logindata.ValidUserOne.fname[0].toUpperCase()}</Avatar> :
                                <Avatar style={{ background: "blue" }} onClick={handleClick} />
                        }

                    </div>


                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {
                            logindata.ValidUserOne ? (
                                <>
                                    <MenuItem>
                                        <Link to="/user" style={{ textDecoration: "none" }}
                                            onClick={() => {
                                                goDocument()
                                                handleClose()
                                            }}
                                        >Document</Link></MenuItem>

                                    <MenuItem onClick={() => {
                                        goDash()
                                        handleClose()
                                    }}>Profile</MenuItem>
                                    <MenuItem onClick={() => {
                                        logoutuser()
                                        handleClose()
                                    }}>Logout</MenuItem>
                                </>
                            ) : (
                                <>
                                    <MenuItem onClick={() => {
                                        goError()
                                        handleClose()
                                    }}>Profile</MenuItem>
                                    <MenuItem>
                                        <Link to="/createUser" style={{ textDecoration: "none" }}
                                        onClick={() => {
                                                goUploadDocument()
                                        //         handleClose()
                                            }}
                                        >Upload Document</Link></MenuItem>
                                    {/* <MenuItem>
                                        <Link to="/createUser" style={{ textDecoration: "none" }}
                                        // onClick={() => {
                                        //         goDash()
                                        //         handleClose()
                                        //     }}
                                        >Document</Link></MenuItem> */}
                                </>
                            )
                        }

                    </Menu>
                </nav>
            </header>
        </>
    )
}

export default Header