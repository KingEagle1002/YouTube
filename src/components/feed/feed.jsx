import { Link } from "react-router-dom";
import './feed.css';
// import thumbnail1 from '../../assets/thumbnail1.png';
// import thumbnail2 from '../../assets/thumbnail2.png';
// import thumbnail3 from '../../assets/thumbnail3.png';
// import thumbnail4 from '../../assets/thumbnail4.png';
// import thumbnail5 from '../../assets/thumbnail5.png';
// import thumbnail6 from '../../assets/thumbnail6.png';
// import thumbnail7 from '../../assets/thumbnail7.png';
// import thumbnail8 from '../../assets/thumbnail8.png';
import { API_KEY, value_converter } from '../../data';
import React, { useState, useEffect } from 'react';
import moment from 'moment';

const Feed = ({ category }) => {
  const [data, setData] = useState([]);

  const fetchData = async (category) => {
    const videolist_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=500&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
    
    const response = await fetch(videolist_url);
    const result = await response.json();
    setData(result.items || []);
  };

  useEffect(() => {
    fetchData(category);
  }, [category]);

  return (
    <div className="feed">
        {data.map((item)=>{
        return(
             <Link to={`video/${item.snippet.categoryId}/${item.id}`} className='card'>
        <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
        <h2>{item.snippet.title}</h2>
        <h3>{item.snippet.channelTitle}</h3>
        <p>{value_converter(item.statistics.viewCount)} &bull; {moment(item.snippet.publishedAt).fromNow()}</p>

      </Link>
        )
      })}
    </div>
  );
};

export default Feed;
