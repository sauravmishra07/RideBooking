import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/uberlogo.png';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();
  const ctx = useContext(UserDataContext);
 
  const setUser = ctx && ctx.setUser ? ctx.setUser : null;

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const base = import.meta.env.VITE_BASE_URI;
      if (!base) {
        throw new Error('VITE_BASE_URI is not set');
      }

      const response = await axios.post(
        `${base}/users/login`,
        { email, password },
        { withCredentials: true }
      );

      
      if (response.status >= 200 && response.status < 300) {
        const data = response.data || {};
       
        if (data.user) {
          if (setUser) setUser(data.user);
          else console.warn('setUser is not available from UserDataContext');
        } else {
          console.warn('No user object returned from login response', data);
        }

        if (data.token) {
          try {
            localStorage.setItem('token', data.token); 
          } catch (err) {
            console.warn('Could not write to localStorage', err);
          }
        } else {
          console.warn('No token returned from server', data);
        }
   
        navigate('/home');
      } else {
        
        console.error('Unexpected response status', response.status, response.data);
        setErrorMsg('Login failed: server returned unexpected status.');
      }
    } catch (err) {
      console.error('Login error', err);
    
      const serverMsg = err?.response?.data?.message || err.message;
      setErrorMsg(`Login error: ${serverMsg}`);
    } finally {
      setLoading(false);
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between bg-white">
      <div className="animate-fadeIn">
        <div className="flex  mb-10">
          <div className="w-32 p-3">
            <img className="w-full" src={logo} alt="logo" />
          </div>
        </div>

        <div>
          <form onSubmit={submitHandler}>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              What's your email
            </h3>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#eeeeee] mb-6 rounded-lg px-4 py-3 border w-full text-lg placeholder:text-base 
                        focus:ring-2 focus:ring-black focus:outline-none transition-all shadow-sm"
              type="email"
              placeholder="email@example.com"
            />

            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Enter Password
            </h3>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#eeeeee] mb-6 rounded-lg px-4 py-3 border w-full text-lg placeholder:text-base 
                        focus:ring-2 focus:ring-black focus:outline-none transition-all shadow-sm"
              type="password"
              placeholder="password"
            />

            <button
              type="submit"
              disabled={loading}
              className={`bg-[#111] text-white font-semibold rounded-lg px-4 py-3 w-full text-lg
                         hover:bg-black transition-all shadow-md hover:shadow-xl active:scale-[0.98]
                         ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {errorMsg && (
            <p className="text-center mt-3 text-red-600">{errorMsg}</p>
          )}

          <p className="text-center mt-5 text-gray-700">
            New here?{' '}
            <Link to="/signup" className="text-blue-600 font-medium hover:underline">
              Create new Account
            </Link>
          </p>
        </div>
      </div>

      <div className="animate-slideUp">
        <Link
          to="/captain-login"
          className="bg-black flex items-center justify-center text-white font-semibold rounded-xl px-4 py-3 w-full text-lg 
                    hover:bg-[#111] transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
