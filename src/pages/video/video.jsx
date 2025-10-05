import React from 'react';
import './video.css';
import PlayVideo from '../../components/playvideo/playvideo';
import Recommended from '../../components/recommended/recommended';
import { useParams } from 'react-router-dom';

const Video = () => {
  const { videoId, categoryId } = useParams();

  return (
    <div className="play-container">
      <PlayVideo videoId={videoId} />
      <Recommended categoryId={categoryId} />
    </div>
  );
};

export default Video;
