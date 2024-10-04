import React,{useRef} from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
function Login() {
    const navigate = useNavigate();
    const emailDom = useRef();
    const passwordDom = useRef();

       async function handleSubmit(e) {
         e.preventDefault();
         const emailValue = emailDom.current.value;
         const passwordValue = passwordDom.current.value;
         if (
           !emailValue || !passwordValue) 
           {
           alert("Please provide all required");
           return;
         }
         try {
           const {data} = await axios.post("/users/login", {
             email: emailValue,
             password: passwordValue,
           });
           alert("Login Successfully");

           localStorage.setItem('token',data.token);
        //    navigate("/");
        console.log(data);
         } catch (error) {
           alert(error?.response?.data?.msg);
           console.log(error.response.data);
         }
       }
  return (
    <section>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <span>Email :---</span>
          <input ref={emailDom} type="email" placeholder="email" />
        </div>
        <br />
        <div>
          <span>Password :---</span>
          <input ref={passwordDom} type="password" placeholder="password" />
        </div>
        <button type="submit">Login</button>
      </form>
      <Link to={'/register'}>Register</Link>
    </section>
  );
}

export default Login