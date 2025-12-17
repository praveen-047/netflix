import Slider from "react-slick";
import "./index.css";
import { useNavigate } from "react-router-dom";

export default function Carousel({ cards }) {
    const navigate = useNavigate()
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: false,
    responsive:[
        {
            breakpoint:768,
            settings:{
                slidesToShow: 3,
          slidesToScroll: 2
            }
        },
    ]
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
