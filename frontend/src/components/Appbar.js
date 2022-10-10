import styles from './Appbar.module.css';
import { useEffect, useRef, useState } from 'react';
import {useNavigate} from "react-router-dom";
import SearchBox from './SearchBox';

const Appbar = ()=>{
    const username = localStorage.getItem("username");
    
    const navigate = useNavigate();
    const logoutHandler = ()=>{
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <header className={styles.appbar}>
            <div className={styles.logo}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#333" viewBox="0 0 16 16">
                    <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                </svg>
                Bookist
            </div>
            <SearchBox/>
            <div className={styles.logout}>
                {username}
                <svg 
                    onClick={logoutHandler}
                    xmlns="http://www.w3.org/2000/svg" 
                    width="32" 
                    height="32" 
                    fill="#888" 
                    viewBox="0 0 16 16">
                    <path d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                    <path d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>                
                </svg>
            </div>
        </header>
    );
}

export default Appbar;