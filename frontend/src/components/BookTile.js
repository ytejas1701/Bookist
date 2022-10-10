import styles from "./BookTile.module.css";
import {useNavigate} from "react-router-dom";

const BookTile = ({bookid, title, author, state})=>{
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const deleteBookHandler = async ()=>{
        try {
            const response = await fetch("http://localhost:8000/list", {
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+ token
                },
                body:JSON.stringify({
                    bookid,
                })
            })
            if(!response.ok)throw new Error();
            navigate(0);
        } catch (error) {
            console.log(error);
        }
    }

    const updateBookHandler = async ()=>{
        try {
            const response = await fetch("http://localhost:8000/list", {
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+ token
                },
                body:JSON.stringify({
                    bookid,
                    state:!state
                })
            })
            if(!response.ok)throw new Error();
            navigate(0);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div onClick={updateBookHandler} className = {`${styles.bookTile} ${state?styles.read:styles.unread}`}>
            <div className={styles.head}>
                {state&&
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 16 16">
                    <path d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                </svg>}
                {!state&&
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 16 16">
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                </svg>}
                <svg
                    className={styles.delete}
                    onClick={deleteBookHandler}
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                </svg>
            </div>
            <span className={styles.title}>{title}</span>
            <span className={styles.author}>{author.toUpperCase()}</span>
        </div>
    );
}

export default BookTile 