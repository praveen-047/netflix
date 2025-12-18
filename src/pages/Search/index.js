import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Header from "../../components/Header";
import ErrorMsg from "../../components/ErrorMsg";
import { useSearchParams, useNavigate } from "react-router-dom";
import noresult from '../../assets/noresult.png'
import "./index.css";
export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const navigate = useNavigate();

  const [result, setResults] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [error, setError] = useState(false);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU";

  const getdata = async () => {
    setLoading(true);
    setError(false);
    setNoResult(false);
    try {
      const url = `https://apis.ccbp.in/movies-app/movies-search?search=${query}`;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await fetch(url, options);
      const data = await res.json();

      if (res.ok) {
        if (data.results.length !== 0) {
          setResults(data.results);
          console.log(data);
        } else {
          setResults([]);
          setNoResult(true);
        }
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, [query]);

  return (
    <>
      <Header />
      <div className="popular-container">
        {isLoading ? (
          /* LOADER */
          <div className="loader-container">
            <Loader />
          </div>
        ) : error ? (
          /* ERROR STATE */
          <ErrorMsg onRetry={getdata} />
        ) : noResult ? (
          /* NO RESULTS */
          <div className="no-results-container">
            <div className="no-result-content">
                <img
              src={noresult}
              alt="no movies"
              className="no-results-image"
            />
            
            </div>
            <p>Your search did not match any movies.</p>
          </div>
        ) : (
          /* SUCCESS */
          <div className="popular-cards-container">
            {result.map((each) => (
              <div
                className="popular-card"
                key={each.id}
                onClick={() => navigate(`/moviedetails/${each.id}`)}
              >
                <img src={each.backdrop_path} alt={each.title} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
