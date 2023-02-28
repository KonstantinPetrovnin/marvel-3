import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import { useParams } from "react-router-dom";
import ErrorMessage from '../errorMessage/ErrorMessage';
import spinner from '../spinner/spinner.gif'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './singleChar.scss';

const SingleCharacter = () => {
    const {id} = useParams()

    const [character,setCharacter] = useState(id)
    const {loading, error, getCaracter,clearError} = useMarvelService();
    
    
    useEffect(() => {
        updateCharacter()
        }, [])

    const onCharacterLoaded = (character)=>{
        setCharacter(character)
    }
    

    const updateCharacter = ()=>{
        clearError()
        getCaracter(id)
            .then(onCharacterLoaded)
    }
   
    const {name, description, thumbnail} = character;
    const characterItem = 
        <>
            <img src={thumbnail} alt={name} className="single-comic__char-img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <div>
                   <p className="single-comic__descr">{description}</p> 
                   <Link className = 'single-comic__back' to='/'>Back to mane page</Link>
                </div>
                
            </div>
           
        </>
    
    const errorMessage = error ? <ErrorMessage/> : null
    const spinnerMessage = loading  ? <img src={spinner} alt= "" style = {{marginLeft:200,marginTop:100}}/> : null
    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`${name} comics character`}/>
                <title>{name}</title>
            </Helmet>
            {characterItem}
            {errorMessage}
            {spinnerMessage}
        </div>
        
    )
}

export default SingleCharacter;