import "./index.css";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import Loader from "../../components/Loader/index.js";
export default function Popular() {
  const [popularMovies, setPopular] = useState([]);
  const [isLoading, setLoader] = useState(false);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU";
  const navigate = useNavigate()
  const getData = async () => {
    setLoader(true);
    try {
      const url = "https://apis.ccbp.in/movies-app/popular-movies";
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await fetch(url, options);
      if (res.ok) {
        const data = await res.json();
        setPopular(data.results);
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
  }, []);

  

  return (
    <>
      <Header />
      <div className="popular-container">
        {isLoading ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : (
          <>
            <div className="popular-cards-container">
                {popularMovies?.map((each)=>(
                    <div className="popular-card" key={each.id} onClick={() => navigate(`/moviedetails/${each.id}`)}>
                        <img key={each.id} src={each.backdrop_path}/>
                    </div>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
