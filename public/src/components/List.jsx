import React from 'react';
import PropTypes from 'prop-types';
import BookPosition from './BookPosition/BookPosition'

const styles = {
    ul: {
        listStyle: 'none',
        margin: 0,
        padding: 0
    }
}

class List extends React.Component {
    constructor(props) {
        super();
        this.books = props.books;
        this.onToggle = props.onToggle;
    }

    render() {
        return(
            <ul style= {styles.ul}>
                { this.books.map((book) => {
                    return <BookPosition 
                                book = { book }
                                key = { book.id } 
                                onToggle = { this.onToggle }
                            />
                }) }
            </ul>
        );
    }
}

List.propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    onToggle: PropTypes.func.isRequired
}

export default List;