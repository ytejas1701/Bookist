import styles from './BookList.module.css';
import BookTile from './BookTile';

const BookList = ({books})=>{
    return (
        <div className = {styles.bookList}>
            {books.map(book=><BookTile 
                key={book.bookid}
                bookid={book.bookid}
                title={book.title}
                author={book.author}
                state={book.state}/>)}
        </div>
    );
}

export default BookList;