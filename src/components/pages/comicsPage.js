import ArrowUp from '../arrow/Arrow';
import ComicsList from '../comicsList/ComicsList';
import { Helmet } from 'react-helmet';

const ComicsPage = () =>{
    return(
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with list of our comics"/>
                <title>Marvel comics page</title>
            </Helmet>
            <ComicsList/>
            <div className='arrowUp'>
                <ArrowUp/>
            </div>  
        </>
    )
}
export default ComicsPage