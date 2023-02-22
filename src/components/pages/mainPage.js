import {useState} from 'react';

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundary/ErrorBoundary'
import ArrowUp from '../arrow/Arrow';

import decoration from '../../resources/img/vision.png';


const MainPage = () =>{
    const [selectedChar,setSelectedChar] = useState(null)
    const onSelectedChar = (id) => {
        setSelectedChar(id)
    }

    return(
        <>
         
            <RandomChar/>
            <div className="char__content">
                <CharList onSelectedChar = {onSelectedChar}/>
                <ErrorBoundary>
                        <CharInfo charId = {selectedChar}/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
            <div className='arrowUp'>
                <ArrowUp/>
            </div>
        
        </>
    )
}

export default MainPage