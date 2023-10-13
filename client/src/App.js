import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import SignupPage from './pages/signupPage/signupPage';
import LoginPage from './pages/loginPage/loginPage';
import HomePage from './pages/homePage/homePage';
import MembershipPage from './pages/membershipPage/membershipPage';
import CheckinHistoryPage from './pages/checkinHistoryPage/checkinHistoryPage';
import AdminMemberCheckInPage from './pages/adminMemberCheckInPage/adminMemberCheckInPage';
function App() {

  

  return (
    <Router>
          <div className="app ">
            <Routes>
              
          
              
              <Route path="/signup" element={<SignupPage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/membership" element={<MembershipPage/>}/>
              <Route path="/checkinhistory" element={<CheckinHistoryPage/>}/>
              <Route path="/adminmembercheckin" element={<AdminMemberCheckInPage/>}/>
            </Routes>
          </div>
        </Router>
  );
}

export default App;