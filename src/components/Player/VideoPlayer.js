import React, { useEffect, useRef } from 'react'
import videojs from 'video.js'
import { isAndroid} from 'react-device-detect'


import 'video.js/dist/video-js.min.css'

export default function VideoPlayer({
  id,
  src,
  poster,
  imdbID
}) {
  const domRef = useRef()
  window.videojs = videojs
  useEffect(() => {
    var timeout
    function playerReady() {
      this.on('mousemove', () => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
          this.userActive(false)
        }, 3000)
      })
    }
    let player

    let vhs = {
      nativeAudioTracks: false,
      nativeVideoTracks: false,
      cacheEncryptionKeys: true,
      enableLowInitialPlaylist: true
    }

    if (isAndroid) {
      vhs = {
        overrideNative: true,
        withCredentials: false
      }
    }

    const playerOptions = {
      html5: {
        vhs
      },
      techOrder: ['html5'],
      fluid: true,
      bigPlayButton: false,
    }

    player = videojs(domRef.current, playerOptions, playerReady)
    player.play()
    return function cleanup() {
      if (player) {
        setTimeout(function cleanup() {
          player.dispose()
        }, 500)
      }
      if (timeout) clearTimeout(timeout)
    }
  }, [])


  // Watchtime Setup
  useEffect(() => {
    const player = videojs(id)
    let handle
    let currentTime = localStorage.getItem('watchtime-'+imdbID)
    if(currentTime !== null){
      player.currentTime(parseInt(currentTime))
    }
    handle = setInterval(function callSmokeScreenApi() {
      localStorage.setItem('watchtime-'+imdbID, Math.floor(player.currentTime()))
    }, 5000)
    return () => {
      clearInterval(handle)
    }
  }, [id, src,imdbID])


  return (
    <video-js
      class={`vjs-default-skin vjs-big-play-centered`}
      id={id}
      poster={poster}
      ref={domRef}
      controls
    >
      <source src={src} type={'application/x-mpegURL'} />
      <p className="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a
        web browser that
        <a
          href="https://videojs.com/html5-video-support/"
          target="_blank"
          rel="noopener noreferrer"
        >
          supports HTML5 video
        </a>
      </p>
    </video-js>
  )
}
