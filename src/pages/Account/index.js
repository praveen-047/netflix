import './index.css'
import Header from '../../components/Header/index.js'
import Footer from '../../components/Footer/index.js'
import { useNavigate } from 'react-router-dom'
export default function Account(){
    const navigate = useNavigate()
    return(
        <>
            <Header/>
            <div className='account-container'>
                <h1 className='account-heading'>Account</h1>
                <hr/>
                <div className='account-details-card'>
                    <h1>Member ship</h1>
                    <div className='account-details'>
                        <p>john@mail.com</p>
                        <p>Password: changeme</p>
                    </div>
                </div>
                <hr/>
                <div className='account-details-card'>
                    <h1>Plan details</h1>
                    <p>Premium - Ultra HD</p>
                </div>
                <hr/>
                <button className='logout-btn' onClick={()=>navigate('/login' ,{replace:true})}>Logout</button>
            </div>
            <Footer/>
        </>
    )
}