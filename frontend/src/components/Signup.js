import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';

const Signup = ()=>{
    const navigate = useNavigate();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const usernameRef = useRef(null);

    const [emailTag, setEmailTag] = useState('');
    const [passwordTag, setPasswordTag] = useState('');
    const [usernameTag, setUsernameTag] = useState('');

    const [errorTag, setErrorTag] = useState('');

    const validate = ()=>{
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const username = usernameRef.current.value;
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
        }else if(password.length!==8){
            setPasswordTag("Passwords should be exactly 8 characters long.");
            ans = false;
        }else{
            setPasswordTag("");
        }
        if(username===undefined||username===null||username===''){
            setUsernameTag("Please enter a valid username.");
            ans = false;
        }else if(username.length>12){
            setUsernameTag("Usernames should be less than 12 characters long.");
        }else{
            setUsernameTag("");
        }
        return ans;
    }

    const submitHandler = async (e)=>{
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const username = usernameRef.current.value;
        if(validate()){
            try {
                const response = await fetch('http://localhost:8000/signup', {
                    method:'POST',
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify({email,password,username})
                });
                if(!response.ok) throw new Error();
                const responseObject = await response.json();
                localStorage.setItem("token", responseObject.token);
                navigate("/");
            } catch (error) {
                console.log(error);
                setErrorTag("Could not register.")
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
                ref={passwordRef}/>
            <label className={styles.tag}>{passwordTag}</label>
            <label>Username</label>
            <input
                ref={usernameRef}/>
            <label className={styles.tag}>{usernameTag}</label>
            <button
                onClick={submitHandler}>Signup</button>
            <span className={styles.textButton}
                onClick={useNavigate("/login")}>Already have an account? Login</span>
            <label className={styles.tag}>{errorTag}</label>
        </div>
    )
}

export default Signup;