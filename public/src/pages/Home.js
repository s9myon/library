import React, {Fragment} from 'react';
import { Notes } from '../components/Notes';
import { Search } from '../components/Search';

export const Home = () => {
    const notes = [
        {id: 1, title: `Note 1`},
        {id: 2, title: `Note 2`},
        {id: 3, title: `Note 3`}
    ];
    return (
        <Fragment>
            <Search />
            <hr/>
            <Notes notes={notes}/>
        </Fragment>
    );
}
