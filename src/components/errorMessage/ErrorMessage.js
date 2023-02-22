import imgM from './errorM.gif'


const ErrorMessage = () =>{
    return (
        <img alt = 'Error' src={imgM} style = {{display:'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto'}} />
        
    )
}

export default  ErrorMessage 