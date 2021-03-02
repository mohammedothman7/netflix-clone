import React from "react";
import request from "../request";

// Components
import Nav from "../components/Nav";
import Banner from "../components/Banner";
import Row from "../components/Row";
import Footer from "./Footer";

import "../css/Home.css";

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
      <Row title="Trending Now" fetchUrl={request.fetchTrending} />
      <Row title="Top Rated" fetchUrl={request.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={request.fecthActionMovies} />
      <Row title="Comedy Movies" fetchUrl={request.fecthComedyMovies} />
      <Row title="Horror Movies" fetchUrl={request.fecthHorrorMovies} />
      <Row title="Adventure Movies" fetchUrl={request.fecthAdventureMovies} />
      <Row title="Family Movies" fetchUrl={request.fetchFamilyMovies} />

      <Footer />
    </div>
  );
}

export default Home;
