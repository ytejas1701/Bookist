import styles from './SearchBox.module.css';
import { useEffect, useRef, useState } from 'react';
import {useNavigate} from "react-router-dom";
import SearchTile from './SearchTile';
import AddBook from './AddBook';

const SearchBox = ()=>{
    
    const searchRef = useRef(null);
    const [searchFocus, setSearchFocus] = useState(false);
    const [searchResults, setSearchResults] = useState([]);


    const searchHandler = async ()=>{
        const searchValue = searchRef.current.value;
        if(searchValue==='') setSearchResults([]);
        else{
            try {
                const response = await fetch("http://localhost:8000/book?search="+searchValue);
                if(response.ok){
                    const responseObject = await response.json();
                    setSearchResults(responseObject);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const resultsRef = useRef(null);
    useEffect(()=>{
        const outsideClickHandler = (event)=>{
            if(resultsRef.current && !resultsRef.current.contains(event.target)) {
                setSearchFocus(false);
            }
        }
        document.addEventListener('click', outsideClickHandler, true);
        return ()=>{
            document.removeEventListener('click', outsideClickHandler, true);
        }
    }, []);

    return (
        <div 
            className={styles.search} 
            ref={resultsRef}>
            <input
                ref={searchRef}
                onChange={searchHandler}
                onFocus={()=>setSearchFocus(true)}
                />
            {searchFocus&&
            <div className={styles.results}>
                {searchResults.map(result=>
                    <SearchTile
                        key={result.bookid}
                        title={result.title}
                        author={result.author}
                        bookid={result.bookid}/>)}
                    <AddBook/>
            </div>}
        </div>
    );
}

export default SearchBox;