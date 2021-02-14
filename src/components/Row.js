import React, { useEffect, useState } from "react";
import axios from "../axios";

import "../css/Row.css";

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
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies?.map(
          (movie) =>
            movie.poster_path && (
              <img
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                key={movie.id}
                src={`${base_url}${movie.poster_path}`}
                alt={movie?.title || movie?.name || movie?.original_name}
              />
            )
        )}
      </div>
    </div>
  );
}

export default Row;
