import React, { useState } from 'react';
import { fetchFromAPI } from '../../utils/fetchFromAPI';

function detailVideo({data}) {
    console.log(data)
  return (
    <div>detailVideo</div>
  )
}

export async function getServerSideProps(context) {
    //const [ videoDetail, setVideoDetail ] = useState(null)
    const { params } = context;
    const {videoId} = params;
    fetchFromAPI(`videos?part=snippet,statistics&id=${videoId}`)
    //.then((data) => setVideoDetail(data.items[0]));
    return {
        props: {
            data: JSON.stringify(data)
        }
    }
}

export default detailVideo