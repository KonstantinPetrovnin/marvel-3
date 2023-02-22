import ArrowUp from '../arrow/Arrow';
import ComicsList from '../comicsList/ComicsList';


const ComicsPage = () =>{
    return(
        <>
            <ComicsList/>
            <div className='arrowUp'>
                <ArrowUp/>
            </div>  
        </>
    )
}
export default ComicsPage