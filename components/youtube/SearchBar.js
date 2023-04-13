import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { useRouter } from 'next/router';
import { Paper, IconButton } from "@mui/material";
import { Search } from '@mui/icons-material'

const SearchBar =() => {
    const [ searchTerm, setSearcTerm ] = useState('')
    //const Navigate = useNavigate();
    const router = useRouter();
    const handleSubmit =(e) => {
        e.preventDefault();
        if(searchTerm) {
            router.push(`/search/${searchTerm}`);
            setSearcTerm('');
        }
    }
    return (
        <Paper
            component='form'
            onSubmit={handleSubmit}
            sx={{
                borderRadius: 20,
                border: '1px solid #e3e3e3',
                pl: 2,
                boxShadow: 'none',
                mr: {sm:5}
            }}
        >
            <input
                className="search-bar"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) =>setSearcTerm(e.target.value)}
            />
            <IconButton>
                <Search />
            </IconButton>
        </Paper>
    )
}

export default SearchBar