import {useState, useEffect} from 'react';
import {fetchFromAPI} from '../../utils/fetchFromAPI';
import Sidebar from './Sidebar';
import Videos from './Videos';
import { Box, Stack, Typography } from "@mui/material";
import axios from 'axios';

function Feed() {
    const [selectedCategory, setSelectedCategory] = useState('New');
    const [videos, setVideos] = useState([]);
    const BASE_URL = 'https://youtube-v31.p.rapidapi.com';
   
    useEffect(() => {
    //   const videosource = async () => {
    //     const options = {
    //       url: BASE_URL,
    //       params: {
    //         maxResults: '9'
    //       },
    //       headers: {
    //         'X-RapidAPI-Key': 'f49e5f0882msh39c37aa46a958b5p162bffjsn7e491e079776',
    //         //'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    //         'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    //       },
    //     }
    //      const { data } = await axios.get(`${BASE_URL}/search?part=snippet&q=${selectedCategory}`, options);
    //      setVideos(data.items);
    //      //console.log(data.items)
    //   }
    //  videosource();
        fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) => setVideos(data.items));
     
    }, [selectedCategory]);

  return (
    <Stack sx={{flexDirection: {sx:"column", md: "row"}}}>
      <Box sx={{height: { sx: 'auto', md:'92vh'}, px:{sx: 0, md:2}}}>
       <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/> 
        <Typography className="copyright" variant="body2" sx={{mt: 1.5, color: "#ccc"}}>
          Copyrigtht 2023 LocalFlyer.online 
        </Typography>
      </Box>
      <Box p={2} sx={{overflowY: 'auto', }}>
        <Typography variant="h4" fontWeight='bold' mb={2} sx={{color: 'black'}}>
          {selectedCategory} <span style={{color: '#F31503'}}>videos</span>
        </Typography>
         <Videos videos={videos}/> 
      </Box>
    </Stack>
  )
}

export default Feed