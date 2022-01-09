import React from 'react';
import Options from './Options';

export default function SearchCountry({ changeCountry }) {
    function search(x) {
        changeCountry(x);
    }
    return (
        <div className='p-5'>
            < Options search={search}/>
        </div>
    );
}
