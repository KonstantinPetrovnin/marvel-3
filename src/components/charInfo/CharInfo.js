import { useState,useEffect } from 'react';
import PropTypes from 'prop-types';

import './charInfo.scss';
import spinner from '../spinner/spinner.gif'
import ErrorMessage from '../errorMessage/ErrorMessage.js'
import useMarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton'
import setContent from '../../utils/setContent'

const CharInfo = (props) => {    
    
    const [char,setChar] = useState(null)

    const {getCaracter,process,setProcess}= useMarvelService()

    useEffect(()=>{
        updateChar()
    },[props.charId])

    const updateChar = () =>{
        const{charId} = props
        if(!charId){
            return
        }
        getCaracter(charId)
            .then(onCharLoaded)
            .then(()=>setProcess('confirmed'))
           
    }

    const onCharLoaded = (char) => {
        setChar(char)
       }

   
  
    
    // const skeleton = (error || loading || char) ? null : <Skeleton/>
    // const errorMessage = error ? <ErrorMessage/> : null
    // const spinnerMessage = loading ? <img src={spinner} alt= "" style = {{marginLeft:200,marginTop:100}}/> : null
    // const content = !(error || loading || !char) ? <View char = {char}/> : null


    return (
        <div className="char__info">
            {/* {skeleton}
            {errorMessage}
            {spinnerMessage}
            {content} */}
            {setContent(process,View,char)}
        </div>
    )
}



const View = ({data}) => {

    const{name,description,thumbnail,homepage,wiki,comics} = data

    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'};
    }

    return(
        <>
          <div className="char__basics">
                <img src={thumbnail} alt={name} 
                    style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'Data no found'}

                {
                    comics.map((item,i) => {
                        if(i>3){
                            return
                        }else{
                            return (
                            <li key={i} className="char__comics-item"> 
                                {item.name}
                            </li>
                        )
                        }

                       
                        
                    })
                }

            </ul>
        </>
    )
}
    
CharInfo.propTypes = {
    charId:PropTypes.number
}

export default CharInfo;