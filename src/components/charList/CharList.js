import { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import spinner from '../spinner/spinner.gif'
import ErrorMessage from '../errorMessage/ErrorMessage.js'
import useMarvelService from '../../services/MarvelService';


import './charList.scss';

const setContent = (process,Component,newItemLoading) =>{
    switch(process){
        case 'waiting':
            return <img src={spinner} alt= "" style = {{marginLeft:200,marginTop:100}}/>
        case 'loading':
            return newItemLoading ? <Component/> : <img src={spinner} alt= "" style = {{marginLeft:200,marginTop:100}}/>
        case 'confirmed':
            return <Component/>
        case 'error':
            return <ErrorMessage/>
        default:
            throw new Error('Unexpected procee state')
    }
}


const CharList = (props) => {

    const [charList,setCharList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset,setOffset] = useState(1541)
    const [charEnded,setCharEnded] = useState(false)


    const {error,loading,getAllCaracters,process,setProcess} = useMarvelService()

    useEffect(()=>{
        onRequest(offset,true) //пустой массив = вызывается один раз
                    //useEffect запускается после рендера
    },[])

    const onRequest = (offset,initial) =>{
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCaracters(offset)
            .then(onCharListLoaded)
            .then(()=>setProcess('confirmed'))
    }

    

    const onCharListLoaded = (newCharList) => {

        let ended = false

        if(newCharList.length < 9){
            ended = true
        }

        setCharList(charList=>[...charList, ...newCharList])
        setNewItemLoading(newItemLoading => false)
        setOffset(offset=> offset+9)
        setCharEnded(charEnded=>ended)

    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

       
    function renderItems(arr) {

        const items = arr.map((item,i)=>{
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            return(
                <CSSTransition key={item.id} timeout={500} classNames="char__item">
                    <li 
                        className="char__item"
                        ref = {el => itemRefs.current[i] = el} ///// повторить
                        key = {item.id}
                        tabIndex={0}
                        onClick={() => {
                            props.onSelectedChar(item.id);
                            focusOnItem(i);
                        }}
                        onKeyDownCapture={(e) => {
                            if (e.key === '' || e.key === "Enter") {
                                props.onSelectedChar(item.id);
                                focusOnItem(i);
                            }
                        }}>

                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>

                        <div className="char__name">{item.name}</div>
                        
                    </li>
                </CSSTransition>
                              
                      
            )
       
        })

        

        return(
            <ul className="char__grid">
                <TransitionGroup  component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
               
    }

    // const items = renderItems(charList)

    // const errorMessage = error ? <ErrorMessage/> : null
    // const spinnerMessage = loading && !newItemLoading ? <img src={spinner} alt= "" style = {{marginLeft:200,marginTop:100}}/> : null

    //анимация выпадающего списка

    const charContent = useMemo(()=>{
       return setContent(process,()=>renderItems(charList),newItemLoading)
    },[])


    return (
        <>
    
            
                <div className="char__list">
                    {/* {errorMessage}
                    {spinnerMessage}
                    {items} */}
                    {charContent}
                    <button className="button button__main button__long"
                            disabled = {newItemLoading}
                            onClick = {()=> onRequest(offset)}
                            style = {{'display' : charEnded ? 'none' : 'block'}}
                            >
                        <div className="inner">load more</div>
                    </button>
                </div> 
        </>
    )
    
}

CharList.propTypes = {
    onSelectedChar: PropTypes.func
  };

export default CharList;


// TRANSITION


// import {useState} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Transition } from 'react-transition-group'



// const Modal = (props) => {

//     const duration = 300;

//     const defaultStyle = {
//         transition: `all ${duration}ms ease-in-out`,
//         opacity: 0,
//         visibility:'hidden'
//     }

//     const transitionStyles = {
//         entering: { opacity: 1,visibility:'visible' },
//         entered:  { opacity: 1, visibility:'visible'},
//         exiting:  { opacity: 0,visibility:'hidden'},
//         exited:  { opacity: 0,visibility:'hidden'},
//     };

//     return (
//         <Transition 
//             timeout={duration} 
//             in={props.show}
//             onEnter={()=>props.setShowTrigger(false)}
//             onExited={()=>props.setShowTrigger(true)}>
           
//             {state =>(
//                 <div className="modal mt-5 d-block" style={{
//                     ...defaultStyle,
//                     ...transitionStyles[state]
//                     }}>
//                     <div className="modal-dialog">
//                         <div className="modal-content">
//                         <div className="modal-header">
//                             <h5 className="modal-title">Typical modal window</h5>
//                             <button onClick={() => props.onClose(false)} type="button" className="btn-close" aria-label="Close"></button>
//                         </div>
//                         <div className="modal-body">
//                             <p>Modal body content</p>
//                         </div>
//                         <div className="modal-footer">
//                             <button onClick={() => props.onClose(false)} type="button" className="btn btn-secondary">Close</button>
//                             <button onClick={() => props.onClose(false)} type="button" className="btn btn-primary">Save changes</button>
//                         </div>
//                         </div>
//                     </div>
//                 </div>  
//                 )  
//             }
//         </Transition>
       
//     )
// }

// function App() {
//     const [showModal, setShowModal] = useState(false)
//     const [showTrigger, setShowTrigger] = useState(true)

//     return (
//         <>
//             <Modal show = {showModal} onClose = {setShowModal} setShowTrigger = {setShowTrigger}/> 
//             { showTrigger ?
//                 <button 
//                 type="button" 
//                 className="btn btn-warning mt-5"
//                 onClick={() => setShowModal(true)}>Open Modal</button> :
//                 null
//             }
//         </>
//     );
// }

// export default App;
