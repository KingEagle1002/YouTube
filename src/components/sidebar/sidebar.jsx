import React from 'react'
import './sidebar.css'
import home from '../../assets/home.png'
import game_icon from '../../assets/game_icon.png'
import automobiles from '../../assets/automobiles.png'
import soprts from '../../assets/sports.png'
import entertainments from '../../assets/entertainment.png'
import tech from '../../assets/tech.png'
import music from '../../assets/music.png'
import blogs from '../../assets/blogs.png'
import news from '../../assets/news.png'
import hashir from '../../assets/hashir.png'
import simon from '../../assets/simon.png'
import tom from '../../assets/tom.png'
import megan from '../../assets/megan.png'
import cameron from '../../assets/cameron.png'

const sidebar = ({sidebar,category,setCategory}) => {
  return (
    <div className={`sidebar ${sidebar ? "" : "small-sidebar"}`}>
      <div className="sortcut-links">
          <div className={`side-links ${category == 0 ? "active" : ""}`} onClick={() => setCategory('0')}>
            <img src={home} alt="home" />
            <p>Home</p>
          </div>
          <div className={`side-links ${category == 20 ? "active" : ""}`} onClick={() => setCategory('20')}>
            <img src={game_icon} alt="game" />
            <p>Gaming</p>
          </div>
          <div className={`side-links ${category == 2 ? "active" : ""}`} onClick={() => setCategory('2')}>
            <img src={automobiles} alt="automobiles" />
            <p>Automobiles</p>
          </div>
          <div className={`side-links ${category == 17 ? "active" : ""}`} onClick={() => setCategory('17')}>
            <img src={soprts} alt="sports" />
            <p>Sports</p>
          </div>
          <div className={`side-links ${category == 24 ? "active" : ""}`} onClick={() => setCategory('24')}>
            <img src={entertainments} alt="entertainments" />
            <p>Entertainments</p>
          </div>
          <div className={`side-links ${category == 28 ? "active" : ""}`} onClick={() => setCategory('28')}>
            <img src={tech} alt="tech" />
            <p>Tech</p>
          </div>
          <div className={`side-links ${category == 10 ? "active" : ""}`} onClick={() => setCategory('10')}>
            <img src={music} alt="music" />
            <p>Music</p>
          </div>
          <div className={`side-links ${category == 22 ? "active" : ""}`} onClick={() => setCategory('22')}>
            <img src={blogs} alt="blogs" />
            <p>Blogs</p>
          </div>
          <div className={`side-links ${category == 25 ? "active" : ""}`} onClick={() => setCategory('25')}>
            <img src={news} alt="news" />
            <p>News</p>
          </div>
          <hr />
        </div>

      {/* Subscribes */}
        <div className="subscribed-list">
          <h3>Subscribed</h3>
          <div className="side-links">
            <img src={hashir} alt="" />
            <p>Hashir</p>
          </div>
          <div className="side-links">
            <img src={simon} alt="" />
            <p>Hanzala</p>
          </div>
          <div className="side-links">
            <img src={tom} alt="" />
            <p>Umar</p>
          </div>
          <div className="side-links">
            <img src={megan} alt="" />
            <p>Sara</p>
          </div>
          <div className="side-links">
            <img src={cameron} alt="" />
            <p>Areeba</p>
          </div>
        </div>
    </div>
  )
}

export default sidebar
