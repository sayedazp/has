import logo from './logo.svg';
import './App.css';
import Example from './homepage';
import MeetingsNeedsAction from './homepage';
import socketIO from 'socket.io-client';
import RefusedMeetings from './refused';
import RunningMeetings from './active';
// import LoginForm from './add-meeting';
import { AuthProvider } from './hooks/useAuth';
import {ProtectedRoute} from './pages/protectedRoute'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Login from './pages/login';
import ClientHome from './pages/clienthome';
import AdminHome from './pages/adminhome'
import MeetingAdd from './pages/meetingadd';
import configData from "./config.json"
// import Blogs from "./pages/blogs"; 
// import SignUp from "./pages/signup"; 
// import Contact from "./pages/contact"
const socket = socketIO.connect('http://' + configData.ip + ':5000');
function App() {
  return (
    <Router>
          <AuthProvider>
 
      {/* {MeetingsNeedsAction(socket)}
      {RefusedMeetings(socket)}
      {RunningMeetings(socket)} */}
      <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/clienthome" element={
                <ProtectedRoute>
                <ClientHome socket={socket}/>
                </ProtectedRoute>
              } />
                <Route path="/adminhome" element={
                <ProtectedRoute>
                <AdminHome socket={socket}/>
                </ProtectedRoute>
              } />
                <Route path="/meetingadd" element={
                <ProtectedRoute>
                <MeetingAdd socket={socket}/>
                </ProtectedRoute>
              } />
                {/* <Route path="/about" element={<ProtectedRoute>
                <About />
                </ProtectedRoute>
                } /> */}
                {/* <Route
                    path="/contact"
                    element={<Contact />}
                />
                <Route path="/blogs" element={<Blogs />} />
                <Route
                    path="/sign-up"
                    element={<SignUp />}
                /> */}
            </Routes>
            </AuthProvider>

    </Router>
  );
}

export default App;
