import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import PasswordReset from "./components/PasswordReset";
import ForgotPassword from "./components/ForgotPassword";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Routes, Route, useNavigate } from "react-router-dom"
import { useEffect, useContext, useState } from "react";
import { LoginContext } from "./components/ContextProvider/Context";
import Document from "./components/document";
// import ServicesAdmin from "./components_admin/admin/ServicesAdmin";
import { CreateUser } from "./components/crud/CreateUser";
import { UserCrud } from "./components/crud/user";

// 



function App() {

  const [data, setData] = useState(false);

  const { logindata, setLoginData } = useContext(LoginContext);


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
      console.log("user not valid");
    } else {
      console.log("user verify");
      setLoginData(data)
      // history("/dash");
    }
  }

  useEffect(() => {
    setTimeout(()=>{
      DashboardValid();
      setData(true)
    },2000)

  }, [])

  return (
    <>
     {/* <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/h' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/services' element={<Services />} />
            <Route path='/posts' element={<Services />} />
            <Route path='/admin/services' element={<ServicesAdmin />} />
            <Route path='/admin/list' element={<ListAdmins />} />
            <Route path='/admin/add' element={<AddAdmin />} />
            <Route path='/admin/login' element={<LoginAdmin />} />
            <Route path='/admin/dashboard' element={<AdminDash />} />
          </Routes>

          <Footer />

        </BrowserRouter> */}
      {
        data ? (
          <>
            <Header />

            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/user" element={<UserCrud />} />
              <Route path="/createUser" element={<CreateUser />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dash" element={<Dashboard />} />
              <Route path="/document" element={<Document/>} />
              {/* <Route path="/uploadDocument" element={<ServicesAdmin/>} /> */}
              <Route path="/password-reset" element={<PasswordReset />} />
              <Route path="/forgotpassword/:id/:token" element={<ForgotPassword />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </>

        ) : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      }


    </>
  );
}

export default App;
