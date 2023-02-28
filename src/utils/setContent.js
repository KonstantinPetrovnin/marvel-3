import spinner from '../components/spinner/spinner.gif'
import ErrorMessage from '../components/errorMessage/ErrorMessage.js'
import Skeleton from '../components/skeleton/Skeleton'



const setContent = (process,Component,data) =>{
    switch(process){
        case 'waiting':
            return <Skeleton/>
        case 'loading':
            return <img src={spinner} alt= "" style = {{marginLeft:200,marginTop:100}}/>
        case 'confirmed':
            return <Component data = {data}/>
        case 'error':
            return <ErrorMessage/>
        default:
            throw new Error('Unexpected procee state')
    }
}

export default setContent