import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import { useParams } from "react-router-dom";
import ErrorMessage from '../errorMessage/ErrorMessage';
import spinner from '../spinner/spinner.gif'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './singleComic.scss';

const SingleComic = () => {
    const {id} = useParams()
    
    const [comic,setComic] = useState(id)
    const {loading, error, getComics,clearError} = useMarvelService();
    
    
    useEffect(() => {
        updateComic()
        }, [id])

    const onComicLoaded = (comic)=>{
        setComic(comic)
    }
    

    const updateComic = ()=>{
        clearError()
        getComics(id)
            .then(onComicLoaded)
    }
   
    const {title, description, pageCount, thumbnail, price} = comic;
    const comicItem = 
        <>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </>
    
    const errorMessage = error ? <ErrorMessage/> : null
    const spinnerMessage = loading  ? <img src={spinner} alt= "" style = {{marginLeft:200,marginTop:100}}/> : null
    
    return (
        
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`${title} comics book`}/>
                <title>{title}</title>
            </Helmet>
            {errorMessage}
            {spinnerMessage}
            {comicItem}
        </div>
        
    )
}

export default SingleComic;