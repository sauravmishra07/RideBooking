import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import logo from '../assets/uberlogo.png';

const UserSignup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState(null);

    const submitHandler = (e) => {
        e.preventDefault();
        const newUser = {
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            email: email,
            password: password
        }
        console.log(firstName, lastName, email, password);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    }
    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            {/* Top */}
            <div>
                {/* Logo */}
                <div className="flex  mb-10">
                    <div className="w-32  p-3">
                        <img className="w-full" src={logo} alt="logo" />
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={submitHandler}>
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">
                        What's your name
                    </h3>

                    <div className="flex gap-4 mb-6">
                        <input
                            required
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                            aria-label="First name"
                            className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-3 border border-gray-200 text-lg placeholder:text-base
                                           focus:ring-2 focus:ring-black focus:outline-none transition-shadow shadow-sm"
                            type="text"
                            placeholder="First name"
                        />
                        <input
                            required
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value)
                            }}
                            aria-label="Last name"
                            className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-3 border border-gray-200 text-lg placeholder:text-base
                                          focus:ring-2 focus:ring-black focus:outline-none transition-shadow shadow-sm"
                            type="text"
                            placeholder="Last name"
                        />
                    </div>

                    <h3 className="text-lg font-semibold mb-3 text-gray-800">
                        What's your email
                    </h3>
                    <input
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-label="Email"
                        className="bg-[#eeeeee] mb-6 rounded-lg px-4 py-3 border border-gray-200 w-full text-lg placeholder:text-base
                                     focus:ring-2 focus:ring-black focus:outline-none transition-shadow shadow-sm"
                        type="email"
                        placeholder="email@example.com"
                    />

                    <h3 className="text-lg font-semibold mb-3 text-gray-800">
                        Enter Password
                    </h3>
                    <input
                        aria-label="Password"
                        className="bg-[#eeeeee] mb-6 rounded-lg px-4 py-3 border border-gray-200 w-full text-lg placeholder:text-base
                                    focus:ring-2 focus:ring-black focus:outline-none transition-shadow shadow-sm"
                        type="password"
                        placeholder="password"
                    />

                    <button
                        type="submit"
                        className="bg-[#111] text-white font-semibold rounded-lg px-4 py-3 w-full text-lg flex items-center justify-center gap-2
                                      hover:bg-black transition-all shadow-md hover:shadow-xl active:scale-[0.99]"
                    >
                        Create account
                        <ArrowRight size={18} />
                    </button>
                </form>

                {/* Login link */}
                <p className="text-center mt-5 text-gray-700">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 font-medium hover:underline">
                        Login here
                    </Link>
                </p>
            </div>

            {/* Footer */}
            <div>
                <p className="text-[10px] leading-tight text-gray-500">
                    This site is protected by reCAPTCHA and the{' '}
                    <span className="underline">Google Privacy Policy</span> and{' '}
                    <span className="underline">Terms of Service apply</span>.
                </p>
            </div>
        </div>
    );
};

export default UserSignup;
