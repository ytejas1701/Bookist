import styles from './Auth.module.css';
import {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";

const Login = ()=>{
    const navigate = useNavigate();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [emailTag, setEmailTag] = useState('');
    const [passwordTag, setPasswordTag] = useState('');

    const [errorTag, setErrorTag] = useState('');

    const validate = ()=>{
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        var ans = true;
        if(email===undefined||email===null||email===''){
            setEmailTag("Please enter a valid email.");
            ans = false;
        }else{
            setEmailTag("");
        }
        if(password===undefined||password===null||password===''){
            setPasswordTag("Please enter a valid password.");
            ans = false;
        }else{
            setPasswordTag("");
        }
        return ans;
    }

    const submitHandler = async (e)=>{
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if(validate()){
            try {
                const response = await fetch('http://localhost:8000/login', {
                    method:'POST',
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify({email,password})
                });
                if(!response.ok) throw new Error();
                const responseObject = await response.json();
                console.log(responseObject);
                localStorage.setItem("token", responseObject.token);
                localStorage.setItem("username", responseObject.username);
                navigate("/");
            } catch (error) {
                console.log(error);
                setErrorTag("Could not authenticate.")
            }
        }
    }

    return(
        <div className={styles.authCard}>
            <span className={styles.heading}>Bookist</span>
            <label>Email</label>
            <input
                ref={emailRef}/>
            <label className={styles.tag}>{emailTag}</label>
            <label>Password</label>
            <input
                ref={passwordRef}
                type="password"/>
            <label className={styles.tag}>{passwordTag}</label>
            <button
                onClick={submitHandler}>Login</button>
            <span className={styles.textButton}
                onClick={()=>navigate("/signup")}>
                New to Bookist? Signup</span>
            <label className={styles.tag}>{errorTag}</label>
        </div>
    )
}

export default Login;