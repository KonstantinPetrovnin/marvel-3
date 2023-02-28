import { useState,useEffect,useRef} from 'react';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import { Helmet } from 'react-helmet';

import './comicsList.scss';
import spinner from '../spinner/spinner.gif'
import ErrorMessage from '../errorMessage/ErrorMessage.js'

const setContent = (process,Component,newComicsLoading) =>{
    switch(process){
        case 'waiting':
            return <img src={spinner} alt= "" style = {{marginLeft:200,marginTop:100}}/>
        case 'loading':
            return newComicsLoading ? <Component/> : <img src={spinner} alt= "" style = {{marginLeft:200,marginTop:100}}/>
        case 'confirmed':
            return <Component/>
        case 'error':
            return <ErrorMessage/>
        default:
            throw new Error('Unexpected procee state')
    }
}


const ComicsList = (props) => {
    const [comicsList,setComicsList] = useState([])
    const [comicsEnd,setComicsEnd] = useState(false)
    const [offset,setOffset] = useState(0)
    const [newComicsLoading,setNewComicsLoading] = useState(false)

    const {loading,error,getAllComics,process,setProcess} = useMarvelService()

    useEffect(()=>{
        onRequest(offset,true)
    },[])

    const onRequest =(offset,initial)=>{
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true) 
        
        getAllComics(offset)
            .then(onComicsLoaded)
            .then(()=>setProcess('confirmed'))
            
    }

    const onComicsLoaded = (newComicsList) =>{
        let end = false
        if(newComicsList.length < 8){
            end = true
        }

        setComicsList([...comicsList, ...newComicsList])
        setNewComicsLoading(false)
        setOffset(offset+8)
        setComicsEnd(end)
    }

   

    function renderComics(arr){
        const items = arr.map((item,i)=>{
           
        return(
            <CSSTransition key={i} timeout={500} classNames="comics__item">
                <li className="comics__item" key = {i} >
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.name} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                        
                    </Link>
                </li>
            
            </CSSTransition>
            
        )
        })
        
        return(
            <ul className="comics__grid">
                <TransitionGroup component={null}>
                    {items}
                    
                </TransitionGroup>
            </ul>
        )
    }
    // const items = renderComics(comicsList)

    // const errorMessage = error ? <ErrorMessage/> : null
    // const spinnerMessage = loading && !newComicsLoading ? <img src={spinner} alt= "" style = {{marginLeft:200,marginTop:100}}/> : null

    return (
        <div className="comics__list">
            {/* {errorMessage}
            {spinnerMessage}
            {items} */}
            {setContent(process,()=>renderComics(comicsList),newComicsLoading)}
            
            <button 
                className="button button__main button__long"
                disabled = {newComicsLoading}
                onClick = {()=>onRequest(offset)}
                style = {{'display' : comicsEnd ? 'none' : 'block'}}
                >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


export default ComicsList;