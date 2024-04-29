import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { LoginContext } from '../ContextProvider/Context';
import { useNavigate } from "react-router-dom";




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
            <div className="d-flex  justify-content-center align-items-center">
                <div className=" justify-conternt-center align-item-center">
                    <br></br>
                    <br></br>
                    <br></br>
                    <h1>User Document Details</h1>
                    <br></br>
                    <br></br>
                    <br></br>

                    <table className="table table-striped-columns " style={{width:"1050px"}}>
                        {/* <Link to='/create' className='btn btn-success'>Add+</Link> */}

                        <thead style={{color:"blue"}}>
                            <tr className="table-primery" style={{color:"blue"}}>
                            <th>Name</th>
                            <th>Mail id</th>
                            <th>Mobile Number</th>
                            <th>Address</th>
                            <th>Action</th>
                            </tr>
                            
                        </thead>
                        <tbody className="table-success">
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
        </>
    )
}