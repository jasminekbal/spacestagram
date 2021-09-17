import { useState, useEffect } from 'react';
import './App.css';
import heartEmpty from "./resources/heart.svg"
import heartFull from "./resources/heartFilled.svg"


const pics = [
  {title: " Picture of the Day",
    date: "2000-10-11",
    imageURL: "https://api.nasa.gov/assets/img/general/apod.jpg",
    desc: "It has the popular appeal of a Justin Bieber video. This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds; but generally help with discoverability of relevant imagery.",
    liked: false,},
    {title: " Picture of the Day",
    date: "2000-11-11",
    imageURL: "https://api.nasa.gov/assets/img/general/apod.jpg",
    desc: "It has the popular appeal of a Justin Bieber video. This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds; but generally help with discoverability of relevant imagery.",
    liked: false,},
    {title: " Picture of the Day",
    date: "2000-12-11",
    imageURL: "https://api.nasa.gov/assets/img/general/apod.jpg",
    desc: "It has the popular appeal of a Justin Bieber video. This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds; but generally help with discoverability of relevant imagery.",
    liked: false,},
    {title: " Picture of the Day",
    date: "2000-13-11",
    imageURL: "https://api.nasa.gov/assets/img/general/apod.jpg",
    desc: "It has the popular appeal of a Justin Bieber video. This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds; but generally help with discoverability of relevant imagery.",
    liked: false,},
    {title: " Picture of the Day",
    date: "2000-14-11",
    imageURL: "https://api.nasa.gov/assets/img/general/apod.jpg",
    desc: "It has the popular appeal of a Justin Bieber video. This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds; but generally help with discoverability of relevant imagery.",
    liked: false,}
]


function App() {

  var [state, setState] = useState({photos: pics});

  useEffect(() => {
    callApi()
    return () => {
      
    }
  }, [])

  async function callApi () {
    const url = `https://api.nasa.gov/planetary/apod?start_date=2021-08-30&api_key=bwToWga6yNLMtKSaU7siWCE0NVGObtnjWFTYNgqm`
    const response = await fetch(url)
    const data = await response.json();

    if (!data.error) {
      console.log(data)
      const photos = data.map( result => {
        const photo = {
          title: result.title,
          date: result.date,
          imageURL: result.url,
          desc: result.explanation,
          liked: false,
        }
        return photo
      })
      setState({...state, photos: photos})
    }
  }

  const likePhoto = (date) => {
      
      const photos = state.photos
      for (var i = 0; i < photos.length; i++) {
        if (photos[i].date === date) {
          console.log(photos[i].liked)
          photos[i].liked = !photos[i].liked
          var heartFullElement = document.getElementById(`heart-full${i}`);
          heartFullElement.classList.toggle("heart-top-button");
        }
      }
      setState({...state, photos: photos})
  }

  const showMore = (date) => {
    const photo = state.photos.find((element) => { return element.date ===date })
    if (state.showPhotoDate === photo.date) {
      setState({...state, toShowPhotoInfo: false, showPhotoDate: "", showPhotoInfo: ""})
    } else {
      setState({...state, toShowPhotoInfo: true, showPhotoDate: photo.date, showPhotoInfo: photo.desc})
    }
  }
 //callApi()
  console.log(state)

  const getPhotos = () => {
    const cards = state.photos.map((photo, index) => {

      const card = (
        <div className="photo-info" key={index}>
          <img className="photo-img" src={photo.imageURL} alt=""/>
          <p className="photo-title"><strong>{photo.title}</strong> - {photo.date} </p>
          <div>

            <div class="wrapper">
            <div className="heart-button-wrapper">
              <img className="heart-bottom-button" src={heartEmpty} onClick={e=> likePhoto(photo.date)}/>
              <img id={`heart-full${index}`} className="heart-top-button" src={heartFull} onClick={e=> likePhoto(photo.date)}/>
            </div>

            <div className="more-button" onClick={e=> showMore(photo.date)} >
           {state.toShowPhotoInfo && state.showPhotoDate === photo.date ? "-" : "+"} 
          </div>
            </div>

          </div>
          {state.toShowPhotoInfo && state.showPhotoDate === photo.date &&
             <div className="more-info"> 
               <div className="PhotoDescription">{state.showPhotoInfo}</div>
            </div>}
        </div>
      )
      return card
    })
    return cards
  }

  const photos = getPhotos()

  return (
    <div className="App">
     <h1>SPACESTAGRAM</h1>
      <h4>Check out photos from space as we work to Make Commerce Better for the Entire Universe</h4>
      <a href="https://github.com/jasminekbal/spacestagram">&lt; Github Link /&gt;</a>
    <div className="horizontal-center">
    <div className="SearchResultsContainer">
    {photos}
    </div>
    </div>

    </div>
  );
}

export default App;
