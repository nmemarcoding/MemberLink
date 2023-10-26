import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import SignupPage from './pages/signupPage/signupPage';
import LoginPage from './pages/loginPage/loginPage';
import HomePage from './pages/homePage/homePage';
import MembershipPage from './pages/membershipPage/membershipPage';
import CheckinHistoryPage from './pages/checkinHistoryPage/checkinHistoryPage';
import AdminMemberCheckInPage from './pages/adminMemberCheckInPage/adminMemberCheckInPage';
import AdminDashboardPage from './pages/adminDashboardPage/adminDashboardPage';
import AdminCheckinHistoryPage from './pages/adminCheckinHistoryPage/adminCheckinHistoryPage';
import Paymenthistory from './pages/paymenthistory/paymenthistory';
import AdminUsersPayments from './pages/adminUsersPayments/adminUsersPayments';
import AdminMembershipsDetails from './pages/adminMembershipsDetails/adminMembershipsDetails';
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
              <Route path="/admindashboard" element={<AdminDashboardPage/>}/>
              <Route path="/admincheckinhistory" element={<AdminCheckinHistoryPage/>}/>
              <Route path="/paymenthistory" element={<Paymenthistory/>}/>
              <Route path="/memberPayments" element={<AdminUsersPayments/>}/>
              <Route path="/adminMembershipsDetails" element={<AdminMembershipsDetails/>}/>
            </Routes>
          </div>
        </Router>
  );
}

export default App;