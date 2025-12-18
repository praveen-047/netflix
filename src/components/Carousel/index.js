import Slider from "react-slick";
import "./index.css";
import { useNavigate } from "react-router-dom";

export default function Carousel({ cards }) {
    const navigate = useNavigate()
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2.5,
     slidesToScroll: 2,
    arrows: false,
    centerMode: true,       // 👈 enables half cards on BOTH sides
  centerPadding: "29px", 
    swipe: true,           // 👈 enable swipe
  draggable: true,       // 👈 enable mouse drag
  touchMove: true,
     // 👈 smoother movement
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {cards.map((movie)=>(
            <div key={movie.id} className="carosule-card" onClick={()=>navigate(`/moviedetails/${movie.id}`)}>
                <img className="carosule-card-image" src={movie.backdrop_path} alt='movie image'/>
            </div>
        ))}
      </Slider>
    </div>
  );
}
