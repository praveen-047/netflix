import './index.css'
import { TiWarning } from "react-icons/ti";
export default function ErrorMsg({onRetry}){

    return(
        <div className='error-container'>
            <div className='error-container-2'>
                <TiWarning className='warning-icon text-danger'/>
            <p>Something went wrong. Please try again</p>
            <button className='try-again-btn' onClick={onRetry}>Try Again</button>
            </div>
        </div>
    )
}