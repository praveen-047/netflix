// import Header from '../../components/Header'
import "./index.css";
import Header from "../../components/Header/index.js";
import { useEffect, useState } from "react";
import ErrorMsg from "../../components/ErrorMsg/index.js";
import Loader from "../../components/Loader/index.js";
import Carousel from "../../components/Carousel/index.js"
import Footer from "../../components/Footer/index.js";
export default function Home() {
  const [original, setOriginalMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [randomPoster, setRandomPoster] = useState({});
  const [originalError, setOriginalError] = useState(false);
  const [trendingError, setTrendingError] = useState(false);
  const [loading, setLoader] = useState(false);

  const originalUrl = "https://apis.ccbp.in/movies-app/originals";
  const trendingUrl = "https://apis.ccbp.in/movies-app/trending-movies";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU";

  const getdata = async () => {
    setLoader(true); // START loader

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      // Fetch both APIs in parallel
      const [res1, res2] = await Promise.all([
        fetch(originalUrl, options),
        fetch(trendingUrl, options),
      ]);

      const data1 = await res1.json();
      const data2 = await res2.json();

      if (!res1.ok) throw new Error("Original API failed");
      if (!res2.ok) throw new Error("Trending API failed");

      // Originals
      setOriginalMovies(data1.results);
      console.log(data1.results);
      
      setOriginalError(false);

      // Trending
      setTrendingMovies(data2.results);
      console.log(data2.results);
      
      setTrendingError(false);

      if (data2.results?.length > 0) {
        const randomIndex = Math.floor(Math.random() * data2.results.length);
        setRandomPoster(data2.results[randomIndex]);
      }
    } catch (error) {
      console.error(error);
      setOriginalError(true);
      setTrendingError(true);
    } finally {
      setLoader(false); // STOP loader
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      <Header />
      <div className="home-container">
        {loading ? (
          <div className="loader-container"><Loader /></div>
        ) : (
          <>
            {originalError ? (
              <ErrorMsg onRetry={getdata} />
            ) : (
              <div
                className="home-top-container"
                style={{
                  backgroundImage: `
      linear-gradient(to bottom, rgba(128, 128, 128, 0.08), #131313ff),
      url(${randomPoster.backdrop_path})
    `,
                }}
              >
                <h1>{randomPoster.title}</h1>
                <p>{randomPoster.overview}</p>
                <button className="play-button">Play</button>
              </div>
            )}

            {trendingError ? (
              <ErrorMsg onRetry={getdata} />
            ) : (
              <div className="trending-now-container"><h1>Trending Now</h1><Carousel cards={trendingMovies}/></div>
            )}
            {originalError ? (
              <ErrorMsg onRetry={getdata} />
            ) : (
              <div className="originals-container"><h1>Originals</h1><Carousel cards={original}/></div>
            )}
            <Footer/>
          </>
        )}
      </div>
    </>
  );
}
