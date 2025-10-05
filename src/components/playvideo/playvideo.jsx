import React, { useEffect, useState } from 'react';
import './playvideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import user_profile from '../../assets/user_profile.jpg';
import { API_KEY, value_converter } from '../../data';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const Playvideo = () => {
  const { videoId } = useParams();  
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setComments] = useState([]);

  // 🔹 Fetch video details
  const fetchVideoData = async () => {
    try {
      const videoDetails_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;
      const response = await fetch(videoDetails_url);
      const data = await response.json();
      setApiData(data.items?.[0]);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  // 🔹 Fetch channel details
  const fetchChannelData = async () => {
    if (!apiData?.snippet?.channelId) return;
    try {
      const channelData_url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
      const res = await fetch(channelData_url);
      const data = await res.json();
      setChannelData(data.items?.[0]);
    } catch (error) {
      console.error("Error fetching channel data:", error);
    }
  };

  // 🔹 Fetch comments (max 50)
  const fetchComments = async () => {
    try {
      const comment_url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=50&key=${API_KEY}`;
      const res = await fetch(comment_url);
      const data = await res.json();
      setComments(data.items || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    if (videoId) {
      fetchVideoData();
      fetchComments();
    }
  }, [videoId]);

  useEffect(() => {
    if (apiData) fetchChannelData();
  }, [apiData]);

  return (
    <div className="play-video">
      {/* 🎥 Video player */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        title="YouTube video player"
      ></iframe>

      {/* 🎯 Video Title */}
      <h3>{apiData ? apiData.snippet?.title : "Loading..."}</h3>

      {/* 📊 Video Stats */}
      <div className="play-video-info">
        <p>
          {apiData ? value_converter(apiData.statistics.viewCount) : "0"} views &bull;{" "}
          {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}
        </p>

        <div>
          <span>
            <img src={like} alt="" />{" "}
            {apiData ? value_converter(apiData.statistics.likeCount) : "0"}
          </span>
          <span><img src={dislike} alt="" /></span>
          <span><img src={share} alt="" /> Share</span>
          <span><img src={save} alt="" /> Save</span>
        </div>
      </div>

      <hr />

      {/* 👤 Channel / Publisher Info */}
      <div className="publisher">
        <img
          src={channelData?.snippet?.thumbnails?.default?.url || user_profile}
          alt="Channel"
        />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : "Loading..."}</p>
          <span>
            {channelData
              ? `${value_converter(channelData.statistics.subscriberCount)} Subscribers`
              : "Loading..."}
          </span>
        </div>
        <button>Subscribe</button>
      </div>

      {/* 📝 Description + Comments */}
      <div className="video-description">
        <p>
          {apiData
            ? apiData.snippet.description.slice(0, 250)
            : "Loading description..."}
        </p>
        <hr />
        <h4>
          {apiData ? value_converter(apiData.statistics.commentCount) : "0"} Comments
        </h4>

        {commentData.length > 0 ? (
          commentData.map((comment, index) => {
            const snippet = comment.snippet.topLevelComment.snippet;
            return (
              <div className="comment" key={index}>
                <img
                  src={snippet.authorProfileImageUrl || user_profile}
                  alt={snippet.authorDisplayName}
                />
                <div>
                  <h3>
                    {snippet.authorDisplayName}{" "}
                    <span>{moment(snippet.publishedAt).fromNow()}</span>
                  </h3>
                  <p dangerouslySetInnerHTML={{ __html: snippet.textDisplay }} />
                  <div className="comment-action">
                    <img src={like} alt="" />
                    <span>{value_converter(snippet.likeCount)}</span>
                    <img src={dislike} alt="" />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No comments found.</p>
        )}
      </div>
    </div>
  );
};

export default Playvideo;
