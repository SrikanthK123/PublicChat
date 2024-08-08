
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Chat from './components/Chat';

function App() {
  return (
    <Router>
    <Routes>
      <Route path='/PublicChat' element={<Login/>} />
      <Route path='/chat' element={<Chat/>} />
    </Routes>
  </Router>
  
  );
}

export default App;
