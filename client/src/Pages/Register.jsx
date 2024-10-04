import React,{useRef} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from '../axiosConfig'
function Register() {
    const navigate = useNavigate();
    const usernameDom = useRef();
    const firstnameDom = useRef();
    const lastnameDom = useRef();
    const emailDom  = useRef();
    const passwordDom = useRef();

    async function handleSubmit(e){
          e.preventDefault();
          const usernameValue =usernameDom.current.value;
          const firstnameValue = firstnameDom.current.value;
          const lastnameValue = lastnameDom.current.value;
          const emailValue = emailDom.current.value;
          const passwordValue = passwordDom.current.value;
          if(!usernameValue || !firstnameValue || !lastnameValue || !emailValue || !passwordValue){
            alert("Please provide all required")
            return;
          }
          try {
            await axios.post("/users/register",{
                username:usernameValue,
                firstname:firstnameValue,
                lastname:lastnameValue,
                email:emailValue,
                password:passwordValue
            })
            alert("Register Successfully,please login")
            navigate("/login")
          } catch (error) {
            alert("Something went wrong")
            console.log(error.response);
          }
    }
  return (
    <section>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <span>username :---</span>
          <input ref={usernameDom} type="text" placeholder="username" />
        </div>
        <br />
        <div>
          <span>First name :---</span>
          <input ref={firstnameDom} type="text" placeholder="first name" />
        </div>
        <br />
        <div>
          <span>Last name :---</span>
          <input ref={lastnameDom} type="text" placeholder="last name" />
        </div>
        <br />
        <div>
          <span>Email :---</span>
          <input ref={emailDom} type="email" placeholder="email" />
        </div>
        <br />
        <div>
          <span>Password :---</span>
          <input ref={passwordDom} type="password" placeholder="password" />
        </div>
        <button type="submit">Register</button>
      </form>
      <Link to={"/login"}>Login</Link>
    </section>
  );
}

export default Register