import { useNavigate } from 'react-router-dom'
import notfound from '../../assets/notfound.jpg'
import './index.css'

export default function NotFound(){

    const navigate = useNavigate()
    return(
        <div className='not-found-container' style={{backgroundImage:`url(${notfound})`}}>
            <h1>Lost Your Way ?</h1>
            <p>we are sorry, the page you requested could not be found</p>
            <p>Please go back to the homepage</p>
            <button onClick={()=>navigate('/',{replace:true})}>Go to Home</button>
        </div>
    )
}