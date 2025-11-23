import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/ubersecond.png';

const Captainlogin = () => {
     const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [userData, setUserData] = useState(null);
    
      const submitHandler = (e) => {
        e.preventDefault(); 
        setUserData({
            email: email,
            password: password
        })
        console.log(email, password);
        setEmail('');
        setPassword('');
      };
    
  return (
   <div className="p-7 h-screen flex flex-col justify-between bg-white">
      <div className="animate-fadeIn">
        <div className="flex mb-10">
          <div className="w-32  p-3">
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
              className="bg-[#111] text-white font-semibold rounded-lg px-4 py-3 w-full text-lg
                hover:bg-black transition-all shadow-md hover:shadow-xl active:scale-[0.98]"
            >
              Login
            </button>
          </form>

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
          to="/login"
          className="bg-black flex items-center justify-center text-white font-semibold rounded-xl px-4 py-3 w-full text-lg 
            hover:bg-[#111] transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  )
}

export default Captainlogin