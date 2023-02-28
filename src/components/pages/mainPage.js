import {useState} from 'react';
import { Helmet } from 'react-helmet';

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundary/ErrorBoundary'
import ArrowUp from '../arrow/Arrow';
import SearchChar from '../searchChar/SearchChar'

import decoration from '../../resources/img/vision.png';


const MainPage = () =>{
    const [selectedChar,setSelectedChar] = useState(null)
    const onSelectedChar = (id) => {
        setSelectedChar(id)
    }

    return(
        <>  
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"/>
                <title>Marvel information portal</title>
            </Helmet>
         
            <RandomChar/>
            <div className="char__content">
                <CharList onSelectedChar = {onSelectedChar}/>
                <div>
                    <ErrorBoundary>
                        <CharInfo charId = {selectedChar}/>
                        <SearchChar/>
                    </ErrorBoundary>
                </div>
                
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
            <div className='arrowUp'>
                <ArrowUp/>
            </div>
        
        </>
    )
}

export default MainPage