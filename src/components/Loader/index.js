import { TailSpin } from 'react-loader-spinner'

export default function Loader() {

  return (
    <div>
      <TailSpin
        height="40"
        width="30"
        strokeWidth={7} 
        color="#D81F26"
        ariaLabel="tail-spin-loading"
        visible={true}
      />
    </div>
  )
}