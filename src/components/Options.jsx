import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

export default function Options({ search }) {

    const [options,setOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [value, setValue] = useState(null);
    
    function sendValue(){
        search(value);
    }

    useEffect(() => {
      axios('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/covid-19-qppza/service/REST-API/incoming_webhook/metadata')
      .then(res => {
        setOptions(res.data.countries);
      })
      .catch(e => {
        console.log(e);
      })
    }, []);

    return (
        <div className="flex">
            <Autocomplete
                value={value}
                onChange={(e, newValue) => {
                setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(e, newInputValue) => {
                setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                sx={{ width: 300 }}
                options={options}
                renderInput={(params) => <TextField {...params} label="Country" variant="outlined"/>}
            />
            <button onClick={sendValue} className='bg-gray-700 px-3 py-2 rounded text-white hover:bg-gray-600 transition-all ml-3'>Submit</button>
        </div>
    )
}
