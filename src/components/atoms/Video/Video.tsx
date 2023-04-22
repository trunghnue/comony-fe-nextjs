import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Video.module.scss";
import Image from "next/image";

interface VideoProps {
  width?: string;
  height?: string;
  src?: string;
}

export const Video = ({ height = "250px", src = "https://www.youtube.com/embed/akeytNVcIy4", width = "500px" }: VideoProps) => {
  const [stateButton, setStateButton] = useState<boolean>(true);
  const [trigger, setTrigger] = useState<number>(0);
  const playButtonRef = useRef<HTMLDivElement>(null);

  const initIframeAPI = useCallback(() => {
    let tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag && firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
  }, []);

  const initYoutube = useCallback(() => {
    let player: YT.Player;
    setTimeout(() => onYoutubePlayerAPIReady(), 2000);

    function onYoutubePlayerAPIReady() {
      player = new YT.Player("video", {
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    }

    function onPlayerReady() {
      if (playButtonRef.current) {
        playButtonRef.current.addEventListener("click", () => {
          player.playVideo();
          player.setPlaybackRate(2);
          handlePlay();
        });
      }
    }

    function onPlayerStateChange(event: YT.OnStateChangeEvent) {
      if (event.data === YT.PlayerState.ENDED) {
        setTrigger(trigger + 1);
        setStateButton(true);
      }
    }
  }, [trigger]);

  const handlePlay = () => {
    setTimeout(() => setStateButton(false), 300);
  };

  useEffect(() => initIframeAPI(), [initIframeAPI]);

  useEffect(() => {
    const elem = document.getElementById("video");
    if (elem) {
      elem.style.pointerEvents = stateButton ? "none" : "auto";
    }
  }, [stateButton]);

  useEffect(() => initYoutube());

  return (
    <div key={trigger} className={styles.youtube_container} style={{ height, width }}>
      {stateButton && (
        <div className={styles.button} ref={playButtonRef}>
          <Image src={"/images/icon/icon-play-video.svg"} alt="video play icon" width={100} height={100}></Image>
        </div>
      )}
      <iframe
        id="video"
        src={`${src}?mute=1&loop=1&color=white&controls=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1`}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
};
