import './App.css';
import './reset.css';
import SignUp from './components/SignUp/SignUp';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ToDo from './components/ToDo/ToDo';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const checkAccessToken = () => {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        navigate('/todo');
      }
    };
    checkAccessToken();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/todo" element={<ToDo />} />
      </Routes>
    </div>
  );
}

export default App;
