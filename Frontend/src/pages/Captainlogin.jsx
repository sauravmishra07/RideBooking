import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/ubersecond.png';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const Captainlogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    const payload = { email: email.trim(), password };

    try {
      
      const base = import.meta.env.VITE_BASE_URI 
      const url = `${base.replace(/\/$/, '')}/captains/login`; 
      const response = await axios.post(url, payload, { withCredentials: true });

      if (response.status >= 200 && response.status < 300) {
        const data = response.data || {};
        // set context only after successful login
        if (data.captain) setCaptain(data.captain);
        if (data.token) localStorage.setItem('token', data.token);

        navigate('/captain-home');
      } else {
        console.error('Unexpected response status', response.status, response.data);
        setErrorMsg('Login failed: unexpected response from server');
      }
    } catch (err) {
      // show informative error
      if (err.response) {
        console.error('Login failed:', err.response.status, err.response.data);
       
        const serverMsg =
          err.response.data?.message ||
          (err.response.data?.errors ? JSON.stringify(err.response.data.errors) : null);
        setErrorMsg(serverMsg || `Server returned ${err.response.status}`);
      } else if (err.request) {
        console.error('No response received:', err.request);
        setErrorMsg('No response from server (network or CORS issue)');
      } else {
        console.error('Login error:', err.message);
        setErrorMsg(err.message);
      }
    } finally {
      setLoading(false);
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between bg-white">
      <div className="animate-fadeIn">
        <div className="flex mb-10">
          <div className="w-32 p-3">
            <img className="w-full" src={logo} alt="logo" />
          </div>
        </div>

        <div>
          <form onSubmit={submitHandler}>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">What's your email</h3>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#eeeeee] mb-6 rounded-lg px-4 py-3 border w-full text-lg placeholder:text-base focus:ring-2 focus:ring-black focus:outline-none transition-all shadow-sm"
              type="email"
              placeholder="email@example.com"
            />

            <h3 className="text-lg font-semibold mb-2 text-gray-800">Enter Password</h3>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#eeeeee] mb-6 rounded-lg px-4 py-3 border w-full text-lg placeholder:text-base focus:ring-2 focus:ring-black focus:outline-none transition-all shadow-sm"
              type="password"
              placeholder="password"
            />

            <button
              type="submit"
              disabled={loading}
              className={`bg-[#111] text-white font-semibold rounded-lg px-4 py-3 w-full text-lg hover:bg-black transition-all shadow-md hover:shadow-xl active:scale-[0.98] ${
                loading ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {errorMsg && <p className="text-center mt-3 text-red-600">{errorMsg}</p>}

          <p className="text-center mt-5 text-gray-700">
            New here?{' '}
            <Link to="/captain-signup" className="text-blue-600 font-medium hover:underline">
              Create new Account
            </Link>
          </p>
        </div>
      </div>

      <div className="animate-slideUp">
        <Link
          to="/captain-signup"
          className="bg-black flex items-center justify-center text-white font-semibold rounded-xl px-4 py-3 w-full text-lg hover:bg-[#111] transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default Captainlogin;
