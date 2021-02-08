import React from "react";
import Nav from "../components/Nav";
import Banner from "../components/Banner";
import Row from "../components/Row";

import "../css/Home.css";
import request from "../request";

function Home() {
  return (
    <div className="home">
      <Nav />

      <Banner />

      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={request.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={request.fetchTrending} isLargeRow />
      <Row title="Top Rated" fetchUrl={request.fetchTopRated} isLargeRow />
      <Row
        title="Action Movies"
        fetchUrl={request.fecthActionMovies}
        isLargeRow
      />
      <Row
        title="Comedy Movies"
        fetchUrl={request.fecthComedyMovies}
        isLargeRow
      />
      <Row
        title="Horror Movies"
        fetchUrl={request.fecthHorrorMovies}
        isLargeRow
      />
      <Row
        title="Romance Movies"
        fetchUrl={request.fecthRomanceMovies}
        isLargeRow
      />
      <Row
        title="Family Movies"
        fetchUrl={request.fetchFamilyMovies}
        isLargeRow
      />
    </div>
  );
}

export default Home;
