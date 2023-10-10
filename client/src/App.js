import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import SignupPage from './pages/signupPage/signupPage';
import LoginPage from './pages/loginPage/loginPage';


function App() {

  

  return (
    <Router>
          <div className="app ">
            <Routes>
              
          
              <Route path="/" element={<>hi</>}/>
              <Route path="/signup" element={<SignupPage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              
            </Routes>
          </div>
        </Router>
  );
}

export default App;