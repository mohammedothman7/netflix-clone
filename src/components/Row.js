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

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Lazy]);

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    const fetchData = async () => {
      const storedMovies = JSON.parse(localStorage.getItem(title));
      const now = new Date();

      if (storedMovies) {
        // Checking if movies exist in local storage, if does then use movies instead of calling API
        if (now.getTime() < storedMovies.expiration) {
          // If movies have not been stored longer than specified time
          return setMovies(storedMovies.data);
        }

        localStorage.removeItem(title); // Remove expired movies and fetch data from API
      }

      const request = await axios.get(fetchUrl);

      const movies = {
        data: request.data.results,
        expiration: now.getTime() + 3600000,
      };

      localStorage.setItem(title, JSON.stringify(movies)); // Set movies in local storage
      setMovies(request.data.results);
      return request;
    };

    fetchData();
  }, [fetchUrl, title]);

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
