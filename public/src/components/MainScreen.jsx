import React from 'react';
import List from './List';
import PropTypes from 'prop-types';


class MainScreen extends React.Component {
    constructor(props) {
        super();
        this.books = props.books;
        this.onToggle = props.onToggle;
    }

    render() {
        return (
            <List
                books = { this.books }
                onToggle = { this.onToggle }
            />
        );
    }
}

MainScreen.propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    onToggle: PropTypes.func.isRequired
}

export default MainScreen;