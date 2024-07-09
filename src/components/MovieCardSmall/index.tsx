import { useState } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion";
// import Skeleton from "react-loading-skeleton";

// react-lazy-load-image-component
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

const MovieCardSmall = ({ data, media_type }: any) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imagePlaceholder, setImagePlaceholder] = useState(false);
  const local = localStorage.getItem("RiveStreamSettings");
  const mode = local ? JSON.parse(local).mode : "dark";
  return (
    <Link
      key={data?.id}
      href={`${media_type === "collection" ? `/collections/${data?.id}` : `/detail?type=${media_type}&id=${data?.id}`}`}
      className={styles.MovieCardSmall}
      aria-label={data?.name || "poster"}
      data-tooltip-id="tooltip"
      data-tooltip-html={`${data?.title?.length > 30 || data?.name?.length > 30 ? data?.title || data?.name : ""}`}
    >
      {/* <img src={process.env.NEXT_PUBLIC_TMBD_IMAGE_URL + data.poster_path} alt="" /> */}
      <div
        className={`${styles.img} ${data?.poster_path !== null && data?.poster_path !== undefined ? "skeleton" : null}`}
      >
        {/* if rllic package is not available, then start using this code again, and comment/delete the rllic code */}
        {/* <AnimatePresence mode="sync">
          <motion.img
            key={data?.id}
            src={`${imagePlaceholder ? "/images/logo.svg" : data?.poster_path !== null && data?.poster_path !== undefined ? process.env.NEXT_PUBLIC_TMBD_IMAGE_URL + data?.poster_path : "/images/logo.svg"}`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: imageLoading ? 0 : 1,
            }}
            height="100%"
            width="100%"
            exit="exit"
            className={`${styles.img} ${imageLoading ? "skeleton" : null}`}
            onLoad={() => {
              setTimeout(() => {
                setImageLoading(false);
              }, 500);
            }}
            loading="lazy"
            onError={(e) => {
              console.log(e);
              setImagePlaceholder(true);
            }}
            alt={data?.id || "sm"}
            // style={!imageLoading ? { opacity: 1 } : { opacity: 0 }}
          />
        </AnimatePresence> */}

        {/* react-lazy-load-image-component */}
        <LazyLoadImage
          key={data?.id}
          src={`${imagePlaceholder ? (mode === "dark" ? "/images/logoWhite.png" : "/images/logoBlack.png") : data?.poster_path !== null && data?.poster_path !== undefined ? process.env.NEXT_PUBLIC_TMBD_IMAGE_URL + data?.poster_path : mode === "dark" ? "/images/logoWhite.svg" : "/images/logoBlack.svg"}`}
          height="100%"
          width="100%"
          useIntersectionObserver={true}
          effect="opacity"
          className={`${styles.img} ${imageLoading ? "skeleton" : null}`}
          onLoad={() => {
            setTimeout(() => {
              setImageLoading(false);
            }, 500);
          }}
          loading="lazy"
          onError={(e) => {
            console.log(e);
            setImagePlaceholder(true);
            setImageLoading(false);
          }}
          alt={data?.id || "sm"}
          // style={!imageLoading ? { opacity: 1 } : { opacity: 0 }}
        />
      </div>
      <p>{data?.title || data?.name}</p>
    </Link>
  );
};

export default MovieCardSmall;
