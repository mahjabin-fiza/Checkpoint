import { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function SignOut() {
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        // Firebase logout
        await signOut(auth);
      } catch (err) {
        console.error('Firebase logout error:', err);
      }

      // Remove user session
      localStorage.removeItem('user');

      // Redirect home
      navigate('/');
    };

    doLogout();
  }, [navigate]);

  return (
    <div className="w-screen h-screen flex items-center justify-center text-lg">Signing out...</div>
  );
}

export default SignOut;
