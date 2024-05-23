import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { LoginContext } from '../ContextProvider/Context';
import { useNavigate } from "react-router-dom";
import './user.css'




export function UserCrud() {
    const { logindata, setLoginData } = useContext(LoginContext);

    const [users, setUsers] = useState([])
    const [data, setData] = useState(false);



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
            history("/user");
        }
    }


    useEffect(() => {
        axios.get('http://localhost:8010/')
            .then(result => {
                setUsers(result.data);
            })
            .catch(err => {
                console.error("Error fetching data:", err);
            });
        setTimeout(() => {
            DashboardValid();
            setData(true)
        }, 2000)
    }, []);


    // useEffect(() => {
    //     setTimeout(() => {
    //         DashboardValid();
    //         setData(true)
    //     }, 2000)

    // }, [])

    // useEffect(() =>{
    //     axios.get('http://localhost:1080/')
    //     .then(result => setUsers(result.data))
    //     .catch(err => console.log(err))
    // },[])

    const handleDelete = (id) => {
        axios.delete('http://localhost:8010/deleteUser/' + id)
            .then(res => {
                console.log(res)
                history('/user')//navigate to homr page after adding the user data

                window.location.reload()
            })
            .catch(err => console.log(err))
    }


    return (

        <>
            <section>
                <div className="form_heading">
                    <br></br>
                    <br></br>

                    <h1>User Document Details</h1>
                    {/* <p style={{ textAlign: "center" }}>Register as a Restaurent Manager in Find Dubai</p> */}
                </div>
                <br></br>
                <br></br>
                <br></br>
                {/* ////////////////////////////////////////////////////////// */}
                <div className="Card-container">
                    <div className="card">
                        <div className="Card-body">
                            {
                                users.map((user, index) => {
                                    return <div key={index}>
                                        <h1>Name : {user.name}</h1>
                                        <h1>email : {user.email}</h1>
                                        <h1>Phone Number : {user.age}</h1>
                                        <h1>Address : {user.password}</h1>
                                    </div>
                                })
                            }
                        </div>
                        <div className="card-footer">
                            {
                                users.map((user, index) => {
                                    return <div key={index}>
                                        <button className="btn btn-danger" onClick={(e) => handleDelete(user._id)}>Delete</button>

                                    </div>
                                })
                            }

                        </div>

                    </div>

                </div>
                <div className="table-container">
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Header 1</th>
                                <th>Header 2</th>
                                <th>Header 3</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => {
                                    return <tr key={index}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.age}</td>
                                        <td>{user.password}</td>
                                        <td>
                                            {/* <Link to='/create' className='btn btn-success'>Add+</Link> */}
                                            <button className="btn btn-danger" onClick={(e) => handleDelete(user._id)}>Delete</button>

                                            {/* <Link to={`/update/${user._id}`} className='btn btn-success'>Update</Link> */}
                                        </td>
                                        {/* <td>
                                        <button className="btn btn-primary ">Read</button>
                                        <Link to={`/update/${user._id}`} className='btn btn-success'>Update</Link>
                                        <NavLink to={`/update/${user._id}`} className='btn btn-success'>Update</NavLink>
                                        <button className="btn btn-danger" onClick={(e) => handleDelete(user._id)}>Delete</button>
                                    </td> */}
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>


                {/* ///////////////////////////////////////////////////////////// */}
                <div className="table_container">
                    <div className="form_data">


                        <table className="table table-striped-columns tables"
                            style={
                                {
                                    width: "400px",
                                    // fontSize: "5px",
                                    margin: "10px",
                                    marginLeft: "10px"
                                }}>
                            {/* <Link to='/create' className='btn btn-success'>Add+</Link> */}

                            <thead style={{ color: "blue" }} className="form_input table-primary">
                                <tr className="" style={{ color: "blue" }}>
                                    <th>Name</th>
                                    <th>Mail id</th>
                                    <th>Mobile Number</th>
                                    <th>Address</th>
                                    <th>Action</th>
                                </tr>

                            </thead>
                            <tbody className="form_input">
                                {
                                    users.map((user, index) => {
                                        return <tr key={index}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.age}</td>
                                            <td>{user.password}</td>
                                            <td>
                                                {/* <Link to='/create' className='btn btn-success'>Add+</Link> */}
                                                <button className="btn btn-danger" onClick={(e) => handleDelete(user._id)}>Delete</button>

                                                {/* <Link to={`/update/${user._id}`} className='btn btn-success'>Update</Link> */}
                                            </td>
                                            {/* <td>
                                        <button className="btn btn-primary ">Read</button>
                                        <Link to={`/update/${user._id}`} className='btn btn-success'>Update</Link>
                                        <NavLink to={`/update/${user._id}`} className='btn btn-success'>Update</NavLink>
                                        <button className="btn btn-danger" onClick={(e) => handleDelete(user._id)}>Delete</button>
                                    </td> */}
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

        </>
    )
}