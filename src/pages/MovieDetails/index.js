import "./index.css";
import Header from "../../components/Header/index.js";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader/index.js";
import Footer from '../../components/Footer/index.js'
export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setLoader] = useState(false);
  const [duration, setDuration] = useState("");
  const [year, setYear] = useState("");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU";

  const getData = async () => {
    setLoader(true);
    try {
      const url = `https://apis.ccbp.in/movies-app/movies/${id}`;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await fetch(url, options);
      if (res.ok) {
        const data = await res.json();
        setMovie(data.movie_details);
        const hours = Math.floor(data.movie_details.runtime / 60);
        const minutes = data.movie_details.runtime % 60;
        setDuration(`${hours}h ${minutes}m`);
        setYear(data.movie_details.release_date.split("-")[0]);
        console.log(duration);
        console.log(data);
      } else {
        throw new Error("failed to fetch movie details");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const navigate = useNavigate()
  return (
    <>
      <Header />
      <div className="MovieDetails">
        {isLoading ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : (
          <>
            <div className="home-top-container" style={{backgroundImage: `linear-gradient(to bottom, rgba(128, 128, 128, 0.08), #131313ff), url(${movie.backdrop_path})`,}}>
              <h1>{movie.title}</h1>
              <div className="movie-details-time-year d-flex align-items-center mt-2">
                <h2>{duration}</h2>
                <div className="u-a-container">
                  <h2 className="u-a-heading">U/A</h2>
                </div>
                <h2>{year}</h2>
              </div>
              <p>{movie.overview}</p>
              <button className="play-button">Play</button>
            </div>
            <div className="movie-detail-info">
              <div className="movie-detail-info-card">
                <h1 className="movie-detail-info-heading">Genres</h1>
                <ul>
                  {movie.genres?.map((each) => (
                    <li key={each.id}>{each.name}</li>
                  ))}
                </ul>
              </div>

              <div className="movie-detail-info-card">
                <h1 className="movie-detail-info-heading">Audio Available</h1>
                <ul>
                  {movie.spoken_languages?.map((each) => (
                    <li key={each.id}>{each.english_name}</li>
                  ))}
                </ul>
              </div>

              <div className="movie-detail-info-card">
                <h1 className="movie-detail-info-heading">Rating Count</h1>
                <p>{movie.vote_count}</p>
                <h1 className="movie-detail-info-heading">Rating Average</h1>
                <p>{movie.vote_average}</p>
              </div>

              <div className="movie-detail-info-card">
                <h1 className="movie-detail-info-heading">Budget</h1>
                <p>{movie.budget}</p>
                <h1 className="movie-detail-info-heading">Release Date</h1>
                <p>{movie.release_date}</p>
              </div>
            </div>
            <div className="more-like-this-container">
              <h1 className="more-like-this-heading">More like this</h1>
              <div className="d-flex flex-wrap">
                {movie.similar_movies?.map((each)=>(
                <div className="more-like-this-card" key={each.id} onClick={()=>navigate(`/moviedetails/${each.id}`,{replace:true})}>
                  <img key={each.id} src={each.backdrop_path} alt='movie'/>
                </div>
              ))}
              </div>
            </div>
            <Footer/>
          </>
        )}
        
      </div>
    </>
  );
}
