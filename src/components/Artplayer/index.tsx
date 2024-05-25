import { useEffect, useRef } from "react";
import Artplayer from "artplayer";
import artplayerPluginHlsQuality from "artplayer-plugin-hls-quality";
import Hls from "hls.js";
import { FaDownload } from "react-icons/fa";

export default function Player({
  option,
  captions,
  getInstance,
  ...rest
}: any) {
  const artRef = useRef<any>();

  function playM3u8(video: any, url: any, art: any) {
    if (Hls.isSupported()) {
      if (art.hls) art.hls.destroy();
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
      art.hls = hls;
      art.on("destroy", () => hls.destroy());
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
    } else {
      art.notice.show = "Unsupported playback format: m3u8";
    }
  }
  useEffect(() => {
    const subtitles = captions.map((ele: any, ind: any) => {
      let def = false;
      if (ele?.label?.toLowerCase()?.includes("english")) {
        def = true;
      }
      return {
        // default: def,
        html: ele?.label,
        url: ele?.file,
      };
    });
    Artplayer.MOBILE_CLICK_PLAY = true;
    const art = new Artplayer({
      ...option,
      container: artRef.current,
      setting: true,
      fullscreen: true,
      autoOrientation: true,
      flip: true,
      pip: true,
      playbackRate: true,
      aspectRatio: true,
      type: "m3u8",
      captions: true,
      airplay: true,
      mutex: true,
      subtitleOffset: true,
      miniProgressBar: true,
      autoplay: true,
      hotkey: true,
      screenshot: true,
      customType: {
        m3u8: playM3u8,
      },
      // controls: [
      //   {
      //     position: "right",
      //     html: "Download",
      //     width: 250,
      //     icon: '<img src="/images/logo512.svg" alt="download"/>',
      //     tooltip: "Download HLS (mediatools)",
      //     style: {
      //       color: "var(--ascent-color)",
      //       width:"clamp(0,10%,250px)"
      //     },
      //     click: function () {
      //       window.open(
      //         `https://mediatools.cc/hlsDownloader?query=${option.url}`,
      //       );
      //     },
      //   },
      // ],
      settings: [
        {
          html: "Subtitle",
          width: 250,
          tooltip: "",
          selector: subtitles,
          onSelect: function (item, $dom, event) {
            console.info(item, $dom, event);
            art.subtitle.url = item.url;
            return item.html;
          },
        },
        {
          html: "Download",
          width: 250,
          height: 500,
          icon: '<img src="/images/logo512.svg" alt="download"/>',
          selector: [
            {
              html: "Download HLS (mediatools)",
              url: option.url,
              opt: 1,
            },
            {
              html: "Download HLS (thetuhin)",
              url: option.url,
              opt: 2,
            },
          ],
          onSelect: function (item: any) {
            if (item.opt === 1)
              window.open(
                `https://mediatools.cc/hlsDownloader?query=${option.url}`,
              );
            if (item.opt === 2) {
              navigator?.clipboard?.writeText(option.url);
              window.open(
                `https://hlsdownloader.thetuhin.com/?text=${option.url}`,
              );
            }
          },
        },
      ],
      plugins: [
        artplayerPluginHlsQuality({
          // Show quality in control
          // control: true,

          // Show quality in setting
          setting: true,

          // Get the resolution text from level
          getResolution: (level: any) => level.height + "P",

          // I18n
          title: "Quality",
          auto: "Auto",
        }),
      ],
    });

    if (getInstance && typeof getInstance === "function") {
      getInstance(art);
    }

    art.on("ready", () => {
      art.notice.show = "Video Ready To Play";
    });
    art.on("error", (error, reconnectTime) => {
      art.notice.show = "Video Load Error";
      console.info(error, reconnectTime);
    });

    return () => {
      if (art && art.destroy) {
        art.destroy(false);
      }
    };
  }, [option.url]);

  return <div ref={artRef} {...rest}></div>;
}
