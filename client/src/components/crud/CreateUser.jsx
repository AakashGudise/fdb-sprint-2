import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import '../mix.css'





export function CreateUser() {
    // const {id} = useParams
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [age, setAge] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();


    // const navigte = ();
    // const navigate = useNavigate();
    // const Submit = (e) => {
    //     console.log(name,email,age)
    //     e.preventDefault();
    //     axios.post("http://localhost:5001/createUser", {name,email,age})
    //     .then(result => {
    //         console.log(result)
    //         navigate('/')//navigate to homr page after adding the user data
    //     })
    //     .catch(err => console.log(err))
    // }

    const Submit = (e) => {
        console.log(name, email, age, password)
        e.preventDefault();
        axios.post("http://localhost:8010/CreateUsers", { name, email, age, password })
            .then(result => {
                toast.success("Details Added Successfully 😃!", {
                    position: "top-center"
                });
                console.log(result)
                navigate('/')//navigate to homr page after adding the user data

            })
            .catch(err => console.log(err))
    }


    return (
        <>
        <section>
        <div className="form_data">
                <div className="form_heading">
                    <h1>Upload Details</h1>
                    <p style={{ textAlign: "center" }}>Require Details for Restaurent Management</p>
                </div>
                <form onSubmit={Submit} 
                // className="form_data"
                >
                    <div className="form_input">
                        <label htmlFor="fname">Name:</label>
                        <input type="text" placeholder="Enter Name"
                            onChange={(e) => setName(e.target.value)} className="form-control"></input>
                    </div>

                    <div className="form_input">
                        <label htmlFor="email">Email:</label>
                        <input type="text" placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)} className="form-control"></input>
                    </div>

                    <div className="form_input">
                        <label htmlFor="fname">Mobile Number:</label>
                        <input type="text" placeholder="Enter your mobile number"
                            onChange={(e) => setAge(e.target.value)} className="form-control"></input>
                    </div>

                    <div className="form_input">
                        <label htmlFor="fname">Address</label>
                        <input type="text" placeholder="Address"
                            onChange={(e) => setPassword(e.target.value)} className="form-control"></input>
                    </div>

                    <div>
                        <button className="btn btn-success">Save</button>
                    </div>
                </form>
            </div>
        </section>
           
        </>
    )
}