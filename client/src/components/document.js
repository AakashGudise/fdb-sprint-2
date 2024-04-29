import React, { useContext, useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';
import { NavLink } from "react-router-dom"

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Document = () => {

    const { logindata, setLoginData } = useContext(LoginContext);

    const [data, setData] = useState(false);
    const [dpassShow, setDPassShow] = useState(false);
    const [dcpassShow, setDCPassShow] = useState(false);

    const [inpval, setInpval] = useState({
        dname: "",
        email: "",
        dpassword: "",
        dcpassword: ""
    });



    const history = useNavigate();

    const DashboardValid = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await res.json();

        if (data.status == 401 || !data) {
            history("*");
        } else {
            console.log("user verify");
            setLoginData(data)
            history("/document");
        }
    }
    // saving documents

    
    const setVal = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };

    const addUserdata = async (e) => {
        e.preventDefault();

        const { dname, email, dpassword, dcpassword } = inpval;

        if (dname === "") {
            toast.warning("fname is required!", {
                position: "top-center"
            });
        } else if (email === "") {
            toast.error("email is required!", {
                position: "top-center"
            });
        } else if (!email.includes("@")) {
            toast.warning("includes @ in your email!", {
                position: "top-center"
            });
        } else if (dpassword === "") {
            toast.error("password is required!", {
                position: "top-center"
            });
        } else if (dpassword.length < 6) {
            toast.error("password must be 6 char!", {
                position: "top-center"
            });
        } else if (dcpassword === "") {
            toast.error("cpassword is required!", {
                position: "top-center"
            });
        }
        else if (dcpassword.length < 6) {
            toast.error("confirm password must be 6 char!", {
                position: "top-center"
            });
        } else if (dpassword !== dcpassword) {
            toast.error("pass and Cpass are not matching!", {
                position: "top-center"
            });
        } else {
            // console.log("user registration succesfully done");


            const data = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    dname, email, dpassword, dcpassword
                })
            });

            const res = await data.json();
            // console.log(res.status);

            if (res.status === 201) {
                toast.success("Document Saved Successfully Successfully done 😃!", {
                    position: "top-center"
                });
                setInpval({ ...inpval, dname: "", email: "", dpassword: "", dcpassword: "" });
            }
        }
    }


    useEffect(() => {
        setTimeout(() => {
            DashboardValid();
            setData(true)
        }, 2000)

    }, [])

    return (
        <>
        <section>
           <div className='d-flex vh-100 justify-content-center align-item-center'> 
                <div className='w-50 bg-white round p-3'>

                </div>
           </div>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Sign Up</h1>
                        <p style={{ textAlign: "center" }}>Documentation Page</p>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="fname">Document Name:</label>
                            <input type="text" onChange={setVal} value={inpval.dname} name="dname" 
                            id="dname" placeholder='Enter Your Name' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="email">Document Type</label>
                            <input type="email" onChange={setVal} value={inpval.email} name="email" 
                            id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!dpassShow ? "dpassword" : "text"} value={inpval.dpassword}
                                 onChange={setVal} name="dpassword" id="dpassword" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setDPassShow(!dpassShow)}>
                                    {!dpassShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <div className="form_input">
                            <label htmlFor="password">Confirm Password</label>
                            <div className="two">
                                <input type={!dcpassShow ? "dpassword" : "text"} value={inpval.dcpassword} 
                                onChange={setVal} name="dcpassword" id="dcpassword" placeholder='Confirm password' />
                                <div className="showpass" onClick={() => setDCPassShow(!dcpassShow)}>
                                    {!dcpassShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn' onClick={addUserdata}>Sign Up</button>
                        <p>Already have an account? <NavLink to="/">Log In</NavLink></p>
                    </form>
                    <ToastContainer />
                </div>
            </section>
            {/* {
                data ? <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img src="./man.png" style={{ width: "200px", marginTop: 20 }} alt="" />
                    <h1>User Email:{logindata ? logindata.ValidUserOne.email : ""}</h1>
                </div> : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    Loading... &nbsp;
                    <CircularProgress />
                </Box>
            } */}
            <div>
                <div>
                    <h1>Upload Documents</h1>
                </div>
                <div>
                 
                </div>
            </div>
            <h1>Documentation</h1>

        </>

    )
}

export default Document