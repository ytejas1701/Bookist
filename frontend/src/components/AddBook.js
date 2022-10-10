import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddBook.module.css';

const AddBook = ()=>{
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const titleRef = useRef(null);
    const authorRef = useRef(null);

    const addBookHandler = async()=>{
        const title = titleRef.current.value;
        const author = authorRef.current.value;
        
        if(title!==undefined && 
            title!==null && 
            title !=='' &&
            author!==undefined &&
            author!==null &&
            author !== ''){
                try {
                    const response = await fetch("http://localhost:8000/book", {
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json",
                            "Authorization":"Bearer "+token
                        },
                        body:JSON.stringify({title,author})
                    });
                    if(!response.ok)throw new Error();
                    const responseObject = await response.json();
                    console.log(responseObject);
                    navigate(0);
                } catch (error) {
                console.log(error); 
                }
            }
    }

    return (
        <div className={styles.addBook}>
            Couldn't find a book? Add it to the Database!
            <form>
                <input 
                    ref={titleRef}
                    placeholder='Title'/>
                <input
                    ref={authorRef} 
                    placeholder='Author'/>
                <svg
                    onClick={addBookHandler}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16">
                    <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                </svg>
            </form>
        </div>
    );
}

export default AddBook;