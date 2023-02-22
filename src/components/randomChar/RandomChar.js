import {useEffect, useState} from 'react';
import spinner from '../spinner/spinner.gif'
import ErrorMessage from '../errorMessage/ErrorMessage.js'
import useMarvelService from '../../services/MarvelService';

import './randomChar.scss';

import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {

    const [char,setChar] = useState(0)
     
    const {loading,error,getCaracter,clearError} = useMarvelService()

    useEffect(()=>{
        updateChar();
       },[])
   
    const onCharLoaded = (char) => {
        setChar(char) 
   }

    const updateChar = () =>{
        clearError()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); 
        getCaracter(id)
            .then(onCharLoaded)    
    }
   
    const errorMessage = error ? <ErrorMessage/> : null
    const spinnerMessage = loading ? <img src={spinner} alt= "" style = {{marginLeft:200,marginTop:100}}/> : null
    const content = !(error || loading) ? <View char = {char}/> : null


    return (
        <div className="randomchar">
            {errorMessage}
            {spinnerMessage}
            {content}
        
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner" >try it</div>
                    
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )   
    
   
}

const View = ({char}) =>{

    const {name,description,thumbnail,homepage,wiki} = char

    return (
        <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className="randomchar__img" style={thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'  ? {objectFit:'contain'} : {objectFit:'cover'}}/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            {description}
                        </p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
    )
}

export default RandomChar;