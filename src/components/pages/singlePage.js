import { useEffect, useState } from "react"
import { useParams } from "react-router"

import useMarvelService from '../../services/MarvelService'
import Spinner from '../spinner/spinner.gif'
import ErrorMessage from '../errorMessage/ErrorMessage';


const SinglePage = ({Comp,dataType}) =>{
    const {id} = useParams()
    const [data,setData] = useState()
    const {loading, error, getCaracter,getComics,clearError} = useMarvelService();

    useEffect(()=>{
        updateData()
    },[])



    const updateData = () =>{
        clearError()

        switch(dataType){
            case 'comic' :
                getComics(id)
                    .then(onDataLoaded)
                    break
            case 'character' :
                getCaracter(id)
                    .then(onDataLoaded)
        }
    }

    const onDataLoaded = (data) =>{
        setData(data)
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !data) ? <Comp data={data}/> : null;

    return(
        <>
        {errorMessage}
        {spinner}
        {content}
    </>
    )
}
export default SinglePage