import React, { useEffect, useState } from "react";
import axios from "../axios";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Lazy,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

import "../css/Row.css";
<<<<<<< Updated upstream
=======

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Lazy]);

>>>>>>> Stashed changes
function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      console.log(request);
      return request;
    };

    fetchData();
  }, [fetchUrl]);

  return (
    <>
      {movies && (
        <div className="row">
          {console.log({ movies })}
          <h2>{title}</h2>
          <Swiper
            navigation
            slidesPerView="auto"
            lazy
            loop={true}
            loopedSlides={movies.length || 20}
            observer={true}
            observeParents={true}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
            style={{ width: "100%", height: "100%" }}
          >
            <div className="row__posters">
              {movies?.map(
                (movie) =>
                  movie.poster_path && (
                    <SwiperSlide
                      key={movie.id}
                      className={`${
                        isLargeRow ? "swiper-slide-large" : "swiper-slide"
                      }`}
                    >
                      <img
                        className={`row__poster ${
                          isLargeRow && "row__posterLarge"
                        }`}
                        src={`${base_url}${movie.poster_path}`}
                        alt={
                          movie?.title || movie?.name || movie?.original_name
                        }
                      />
                    </SwiperSlide>
                  )
              )}
            </div>
          </Swiper>
        </div>
      )}
    </>
  );
}

export default Row;
