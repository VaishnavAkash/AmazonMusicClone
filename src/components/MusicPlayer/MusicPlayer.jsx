import React, { useEffect, useState, useRef } from 'react'
import './MusicPlayer.css';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import Replay10Icon from '@mui/icons-material/Replay10';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Forward10Icon from '@mui/icons-material/Forward10';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import CloseIcon from '@mui/icons-material/Close';
import { ContextProvider } from '../../utils/Provider';
import { useMusic } from '../../utils/MusicProvider';
import { project_ID } from '../../utils/Constants';
import useSound from 'use-sound';



function MusicPlayer() {
  
    const{width} = ContextProvider();
    const defaultAudioUrl= 'https://newton-project-resume-backend.s3.amazonaws.com/audio/64cf934147ae38c3e33a509d.mp3';
    const { musicId, musicStatus, musicDispatch } = useMusic();
    const [audioUrl, setAudioUrl] = useState(defaultAudioUrl);
    const [music, setMusic] = useState({});
  
    const [play, { pause, stop, duration }] = useSound(audioUrl, {
      volume: 1,
    });
  
    const isFirstTimeRender = useRef(true);

    console.log()
    console.log(duration/60);
  
    const [isCapable, setCapable] = useState(false);
  
    function handlePause() {
      musicDispatch({ type: "pause" });
      // play();
    }
  
    function handlePlay() {
      // if(musicPlayer==='active') return;
      musicDispatch({ type: "play" });
      pause();
    }
  
    function handleClose() {
      console.log('stopped')
      stop();
      musicDispatch({ type: "stop" });
    }
    // made changes

    useEffect(()=>{
      musicDispatch({type:'play'});
    },[]);
  
    useEffect(() => {
      if (musicId) {
        console.log(musicId);
        musicDispatch({ type: "pause" });
        stop();
        setAudioUrl(defaultAudioUrl);
        setCapable(false);
        fetch(`https://academics.newtonschool.co/api/v1/music/song/${musicId}`, {
          headers: {
            projectId: "8nbih316dv01",
          },
        })
          .then((resp) => resp.json())
          .then((rs) => {
            setMusic(rs.data);
            setAudioUrl(rs.data.audio_url);
            musicDispatch({ type: "play" });
          })
          .catch((err) => console.log(err));
      }
      let count = 0;
      const interval = setInterval(()=>{
        console.log(count++);
      },1000);
  
      return () => {clearInterval(interval);stop()};
    }, [musicId]);
  
    useEffect(() => {
      if (duration > 0) {
        if (isFirstTimeRender.current) {
          isFirstTimeRender.current = false;
          return;
        }
        play();
        if (musicStatus === "play") setCapable(true);
      }
  
      return () => stop();
    }, [duration]);
  
    useEffect(() => {
      if (isCapable) {
        if (musicStatus === "play") play();
        else pause();
      }
    }, [musicStatus]);
  
    let artistArray= music?.artist?.map((eItem)=>{
        return eItem.name;
    }).slice(0,2);

    const localImage= 'https://newton-project-resume-backend.s3.amazonaws.com/thumbnail/64cee72fe41f6d0a8b0cd0b4.jpg';
    return (
    
        <div className='musicPlayerContainer' ref={isFirstTimeRender}>
            <div className='musicLeft'>
                <img className='musicLogo' src={music?.thumbnail||localImage} />
                <div className='musicDetails'>
                    <h3>{music?.title}</h3>
                    <p>{artistArray?.join(', ')}</p>
                </div>
            </div>
           { width>709 && <div className='musicMiddle'>
                <div className='musicPlayerIcons'>
                <SkipPreviousIcon style={{fontSize:'2rem',cursor: 'pointer',pointerEvents:'none',opacity:'0.5'}}/>
                <Replay10Icon style={{fontSize:'2rem',cursor: 'pointer',pointerEvents:'none',opacity:'0.5'}}/>
                {musicStatus!=='play' ? 
                <PlayArrowIcon onClick={handlePlay} style={{fontSize:'3rem',cursor: 'pointer'}} />
                :
                <PauseIcon onClick={handlePause} style={{fontSize:'3rem',cursor: 'pointer'}} />
                }
                <Forward10Icon style={{fontSize:'2rem',cursor: 'pointer',pointerEvents:'none',opacity:'0.5'}}/>
                <SkipNextIcon style={{fontSize:'2rem',cursor: 'pointer',pointerEvents:'none',opacity:'0.5'}}/>
                </div>
            </div>}
            {width<709 && <div className='musicPhone'>
            {musicStatus!=='play' ? 
                <PlayArrowIcon onClick={handlePlay} style={{fontSize:'3rem',cursor: 'pointer'}} />
                : 
                <PauseIcon onClick={handlePause} style={{fontSize:'3rem',cursor: 'pointer'}} />
                }
              </div>}
            <div className='musicRight'>
                <CloseIcon onClick={handleClose}  style={{fontSize:'2rem',cursor:'pointer'}}/>
            </div>
        </div>
      )
}

export default MusicPlayer