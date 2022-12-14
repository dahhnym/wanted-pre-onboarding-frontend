import { useNavigate } from 'react-router-dom';

const Signout = () => {
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem('access_token');
    navigate('/');
  };
  return (
    <button type="button" className="signout-button" onClick={handleSignout}>
      ๋ก๊ทธ์์
    </button>
  );
};

export default Signout;
