import React, { useEffect, useState } from "react";
import axios from "../axios";

import "../css/Row.css";
function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    };

    fetchData();
  }, [fetchUrl]);

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
