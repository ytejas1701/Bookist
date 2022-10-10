import { useNavigate } from 'react-router-dom';
import styles from './SearchTile.module.css';

const SearchTile = ({title, author, bookid})=>{
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    
    const updateListHandler = async (bookid)=>{
        try {
            const response = await fetch("http://localhost:8000/list",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+token
                },
                body:JSON.stringify({bookid, state:false})
            });
            if(!response.ok)throw new Error()
            const responseObject = await response.json();
            console.log(responseObject);
            navigate(0);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div 
            onClick={()=>updateListHandler(bookid)}
            className={styles.searchTile}>
            <span className={styles.title}>{title}</span>
            <span className={styles.author}>{author.toUpperCase()}</span>
        </div>
    );
}

export default SearchTile;