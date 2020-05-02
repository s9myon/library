import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem 1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '.5rem'
    },
    input: {},
}

class BookPosition extends React.Component {
    constructor(props) {
        super();
        this.book = props.book;
        this.onToggle = props.onToggle;
        this.classes= [];
    }
    componentDidMount() {
        if(this.book.completed) {
            this.classes.push('done');
        } else {
            this.classes.pop('done');
        }
    }
    componentDidUpdate() {
        if(this.book.completed) {
            this.classes.push('done');
        } else {
            this.classes.pop('done');
        }
    }


    render() {
        return(
        <li style={styles.li}>
            <span className={this.classes.join(' ')}>
                <input
                    type="checkbox"
                    style={styles.input}
                    onChange={() => this.onToggle(this.book.id)}
                />
                <strong>{ this.book.id }</strong>
                &nbsp;
                { this.book.name }
            </span>
            <button className='rm'>&times;</button>
        </li>
            );
    }
}
//валидация параметров
BookPosition.propTypes = {
    book: PropTypes.object.isRequired,
    onToggle: PropTypes.func.isRequired
}

export default BookPosition;