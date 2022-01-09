import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

export default function News( {country} ) {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        var options = {
            method: 'GET',
            url: 'https://google-search3.p.rapidapi.com/api/v1/search/q=covid+'+country,
            headers: {
              'x-user-agent': 'desktop',
              'x-proxy-location': 'US',
              'x-rapidapi-host': 'google-search3.p.rapidapi.com',
              'x-rapidapi-key': '496a1d97femsh21decad505f9a11p19a592jsn699bbaa34a2f'
            }
          };
    
        axios.request(options).then(res => {
            setData(res.data.results);
            setLoading(false);
            return () => {
                setLoading(true);
            }
        }).catch(err => {
            console.error(err);
        });
      }, [country]);
    if(loading) {
            return (
                <div id='news' className={loading === true ? 'flex flex-col justify-center items-center' : ''}>
                    <p className='text-3xl font-bold text-gray-800 p-6'>News about Covid-19 in {country}</p>
                    <div>
                    <CircularProgress />
                    </div>
                </div>
            )
        } else {
            return(
                <div id='news'>
                <p className='text-3xl font-bold text-gray-800 p-6'>News about Covid-19 in {country}</p>
                {data.map((x,i) => {
                    return(
                        <div key={i} className='flex flex-col text-left m-3 p-3 overflow-hidden'>
                            <a href={x.link} className='text-blue-700 hover:underline'>{x.title}</a>
                            <a href={x.link} className='text-xs text-gray-500'>{x.link}</a>
                            <p className='text-xs'>{x.description}</p>
                        </div>
                    )
                    })}
                </div>
            )
        }
}
