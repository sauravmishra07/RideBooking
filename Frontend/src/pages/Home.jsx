import React from 'react'
import logo from '../assets/uberlogo.png'
import { ArrowRight } from "lucide-react";
import traffic from '../assets/traffic.jpg';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const login = () => {
        navigate('/login');
    }
    return (
        <div
            className="bg-cover bg-bottom h-screen pt-8 flex justify-between flex-col w-full"
            style={{ backgroundImage: `url(${traffic})` }}
        >
            <div className="w-32 ml-8 bg-white/50 rounded-lg p-2">
                <img className="w-full" src={logo} alt="logo" />
            </div>
            <div className="bg-white py-7 px-4 rounded-t-xl">
                <h2 className="text-2xl font-bold mb-2">Get Started with Uber</h2>
                <button onClick={login} className="w-full bg-black text-white py-4 px-3 text-xl font-semibold rounded-xl relative hover:bg-gray-900 transition-colors duration-300 shadow-lg">
                    <span className="block text-center">Continue</span>
                    <ArrowRight className="w-6 h-6 absolute right-3 top-1/2 -translate-y-1/2" />
                </button>
            </div>
        </div>
    )
}

export default Home