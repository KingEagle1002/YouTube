import React, { useEffect, useState } from 'react';
import './recommended.css';
import { API_KEY, value_converter } from '../../data';
import { Link } from 'react-router-dom'; // ✅ Link import added
import moment from 'moment';

const Recommended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    try {
      const relatedVideoUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
      const response = await fetch(relatedVideoUrl);
      const data = await response.json();
      setApiData(data.items || []);
    } catch (error) {
      console.error('Error fetching recommended videos:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return (
    <div className="recommended">
      {apiData.map((item, index) => (
        <Link
          to={`/video/${item.snippet.categoryId}/${item.id}`} // ✅ fixed here
          key={index}
          className="side-video"
        >
          <img
            src={item.snippet.thumbnails.medium.url}
            alt={item.snippet.title}
          />
          <div className="video-info">
            <h4>{item.snippet.title}</h4>
            <p>{item.snippet.channelTitle}</p>
            <p>
              {item.statistics?.viewCount
                ? `${value_converter(item.statistics.viewCount)} views`
                : 'No views'}{' '}
              &bull; {moment(item.snippet.publishedAt).fromNow()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Recommended;
