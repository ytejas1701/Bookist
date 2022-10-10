import { useEffect, useState } from 'react';
import Appbar from './Appbar';
import BookList from './BookList';
import styles from './Home.module.css';

const Home = ()=>{
    const token = localStorage.getItem("token");
    const [books, setBooks] = useState([]);  
    useEffect(()=>{
        const fetchBooks = async ()=>{
            try {
                const response = await fetch("http://localhost:8000/list", {
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer "+token
                    }
                });
                if(!response.ok)throw new Error();
                const responseObject = await response.json();
                setBooks(responseObject);
            } catch (error) {
                console.log(error);
            }
        }
        fetchBooks();
    }, [token]);
    var read = [];
    var unread = [];
    books.forEach(book=>{
        if(book.state)read.push(book);
        else unread.push(book);
    });
    return (
        <div className = {styles.home}>
            <Appbar/>
            <div className={styles.mainContent}>
                <BookList books={read}/>
                <BookList books={unread}/>
            </div>
        </div>
    );
}

export default Home;