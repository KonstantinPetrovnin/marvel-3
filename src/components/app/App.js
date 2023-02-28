
import { Route,BrowserRouter as Router,Routes } from 'react-router-dom';

import { ComicsPage,MainPage,SingleCharacter,SingleComic } from '../pages';
import SinglePage from '../pages/singlePage'
import AppHeader from '../appHeader/AppHeader';





const App = () =>{
    
    return ( 
        <Router>
            <div className="app">
            <AppHeader/>
                <main>
                    <Routes>
                        <Route path='/' element = {<MainPage/>}/>
                        <Route path='/comics' element = {<ComicsPage/>}/>
                        <Route path='/comics/:id' element = {<SingleComic/>}/>
                        <Route path="/characters/:id" element = {<SingleCharacter/>}/> 
                        не знаю как вставить вложенную страничку с пропсами по типу  
                        {/* <Route exact path="/characters/:id"> <SinglePage Component={SingleCharacterLayout} dataType='character'/> </Route> */}
                    </Routes>
                </main>
            </div>
        </Router>          
    )
}
export default App;