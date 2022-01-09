import React, { useEffect, useState } from 'react'
import axios from 'axios';
import SearchCountry from './SearchCountry';
import HeroPage from './HeroPage';
import News from './News';

export default function Content() {
    
    const [country, setCountry] = useState('Bosnia and Herzegovina');
    const [data, setData] = useState({});

    useEffect( () => {
        var config = {
            method: 'get',
            url: `https://webhooks.mongodb-stitch.com/api/client/v2.0/app/covid-19-qppza/service/REST-API/incoming_webhook/global_and_us?country=${country}&min_date=2021-12-27T00:00:00.000Z&max_date=2021-12-28T00:00:00.000Z&hide_fields=_id, country, country_code, country_iso2, country_iso3, loc, state`,
            headers: { }
          };
          
        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        setData(response.data[0]);
        })
        .catch(function (error) {
        console.log(error);
        });
    }, [country]);

    function changeCountry(val) {
        setCountry(val);
    }

    return (
        <div className='p-4 text-center'>
            <div className="flex flex-col justify-evenly align-center xl:flex-row">
                < HeroPage />
                < SearchCountry changeCountry={changeCountry} />
            </div>
            <p className='text-2xl font-semibold pt-10 xl:text-3xl'>{data.combined_name}</p>
            <div className="flex flex-col justify-evenly align-center mt-3 p-2 xl:flex-row">
                <div className="p-3">
                    <p>Confirmed:</p>
                    <p className='text-2xl font-bold text-gray-500 '>{data.confirmed}</p>
                </div>
                <div className="p-3">
                    <p>Deaths:</p>
                    <p className='text-2xl font-bold text-gray-500 '>{data.deaths}</p>
                </div>
                <div className="p-3">
                    <p>Daily Deaths:</p>
                    <p className='text-2xl font-bold text-gray-500 '>{data.deaths_daily}</p>
                </div>
                <div className="p-3">
                    <p>Recovered:</p>
                    <p className='text-2xl font-bold text-gray-500 '>{data.recovered}</p>
                </div>
                <div className="p-3">
                    <p>Daily Recovered:</p>
                    <p className='text-2xl font-bold text-gray-500 '>{data.recovered_daily}</p>
                </div>
            </div>
            <News country={country} />
        </div>
    )
}
