import React, { useEffect, useState } from "react";
import axios from "../axios";
import requests from "../request";

import "../css/Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const randomNumber = Math.floor(
        Math.random() * request.data.results.length - 1
      ); // Generate random number between 0 and results length
      const num =
        randomNumber < request.data.results.length && randomNumber >= 0
          ? randomNumber
          : 0; // Ensure random number is between 0 and results length, if not default to 0
      setMovie(request.data.results[num]);
      return request;
    };

    fetchData();
  }, []);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  return (
    movie && (
      <header
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="banner_buttons">
            <button className="banner__button">Play</button>
            <button className="banner__button">My List</button>
          </div>
          <h1 className="banner__description">
            {truncate(`${movie?.overview}`, 225)}
          </h1>
        </div>

        <div className="banner-fadeBottom" />
      </header>
    )
  );
}

export default Banner;
