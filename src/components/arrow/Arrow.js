import { useState,useEffect} from 'react';
import arrow from '../arrow/arrow.svg'
import './arrow.scss'

const ArrowUp = () => {
  const [isVisible,setIsVisible] = useState(false)  
  
  useEffect(()=>{
    window.addEventListener('scroll', handleScroll)
    return()=>{
    window.removeEventListener('scroll', handleScroll);
    }
  },[isVisible])
  
   
  const handleScroll = () => {
      if (window.scrollY >= 400  && !isVisible) {
        setIsVisible(true);
      } else if (window.scrollY < 500 && isVisible) {
        setIsVisible(false);
      }
  }

  const scrollUp = () => {
      return(
          window.scrollTo({
              top: 100,
              left: 0,
              behavior: 'smooth'
          })
      )
  }


  return(
    <div className='arrowBtn'>
        <button className='arrowBtn'
        style={{'display': isVisible ? 'block' : 'none'}}
        onClick ={scrollUp}
        ><img src={arrow} alt="arrowUp"  width={60} height={60}/></button>
    </div>
  )
  
}

export default ArrowUp
  