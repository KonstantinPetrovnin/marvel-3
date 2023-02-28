import { useState } from "react"
import {Form,Formik,Field,ErrorMessage as FormikErrorMessage} from 'formik'
import * as Yup  from 'yup'
import {Link} from 'react-router-dom';
import { Helmet } from 'react-helmet';

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";

import './searchChar.scss'
import '../../style/variables.scss'




const SearchChar = () =>{
    const [term,setTerm] = useState(null)

    const {loading,error,getCharacterByName,clearError} = useMarvelService()

    const onTermLoaded = (term) => {
        setTerm(term);
    }
    
    const updateTerm = (term) =>{
        clearError()
        getCharacterByName(term)
            .then(onTermLoaded)
        
    }

    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage/></div> : null

    const result = !term ? null : term.length > 0 ?
        <div className="char__search-wrapper">
            <div className="char__search-success">There is! Visit {term[0].name} page?</div>
            <Link to={`/characters/${term[0].id}`}  className="button button__secondary">
                <div className="inner">To page</div>
            </Link>
        </div> :
        <div className="char__search-error">
            The character was not found. Check the name and try again
        </div>;
    
    return(
        <div className="char__search-form">
            <Formik
                initialValues={{
                    charTerm:''
                }}
                validationSchema = {Yup.object({
                    charTerm: Yup.string()
                        .min(2, 'Minimum 2 characters!')
                        .required(' This field is required!')
                })}
                onSubmit = { ({charTerm})=>{
                    updateTerm(charTerm)
                }}

                >

                <Form>
                    <label htmlFor="charTerm" className="char__search-label">Or find a character by name</label>
                    <div className="char__search-wrapper">
                        <Field
                            name = 'charTerm'
                            id = 'charTerm'
                            type ='text'
                            placeholder = 'Enter name'
                        />
                        <button
                            type="submit"
                            className="button button__main"
                            disabled = {loading}>
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <FormikErrorMessage component = 'div' className = "char__search-error" name="charTerm"  />
                </Form>
            </Formik> 
            {result}
            {errorMessage}
        </div>

    )
}

export default SearchChar