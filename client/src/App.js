import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import SignupPage from './pages/signupPage/signupPage';



function App() {

  

  return (
    <Router>
          <div className="app ">
            <Routes>
              
          
              <Route path="/" element={<>hi</>}/>
              <Route path="/signup" element={<SignupPage/>}/>
              
            </Routes>
          </div>
        </Router>
  );
}

export default App;