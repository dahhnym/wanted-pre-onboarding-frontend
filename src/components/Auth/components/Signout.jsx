import { useNavigate } from 'react-router-dom';

const Signout = () => {
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem('access_token');
    navigate('/');
  };
  return (
    <button type="button" className="signout-button" onClick={handleSignout}>
      로그아웃
    </button>
  );
};

export default Signout;
