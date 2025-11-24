import React from 'react'
import bike from "../assets/bike.png";
import car from "../assets/car.png";
import auto from "../assets/auto.png";
import { User, ChevronDown, ArrowDown } from "lucide-react";
const VehiclePanel = (props) => {
    return (
        <div >
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-2xl font-semibold">Choose a Vehicle</h3>
                <button
                    onClick={() => props.setVehiclePanel(false)}
                    className="p-1 focus:outline-none"
                >
                    <ChevronDown className="text-3xl text-black" />
                </button>
            </div>
            <div
                onClick={() => {
                    props.setConfirmRidePanel(true)
                    props.selectVehicle('car')
                }}
                className="flex items-center justify-between w-full p-4 mb-3 border-2 border-gray-200 rounded-xl shadow-sm cursor-pointer hover:border-black hover:shadow-md transition-all duration-200"
            >
                {/* Vehicle Image */}
                <img className="h-20 w-20 object-contain" src={car} alt="car" />

                {/* Vehicle Details */} 
                <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-lg flex items-center gap-1">
                            UberGo
                            <span className="flex items-center text-gray-500 gap-1">
                                <i className="ri-user-3-fill"></i>
                                <User size={16} />4
                            </span>
                        </h4>
                        <h2 className="text-lg font-bold">₹504</h2>
                    </div>
                    <h5 className="text-sm text-gray-600 mt-1">2 mins away</h5>
                    <p className="text-xs text-gray-500 mt-1">Affordable, compact rides</p>
                </div>
            </div>

            {/* Moto Card */}
            <div
                onClick={() => {
                    props.setConfirmRidePanel(true)
                    props.selectVehicle('moto')
                }}
                className="flex items-center justify-between w-full p-4 mb-3 border-2 border-gray-200 rounded-xl shadow-sm cursor-pointer hover:border-black hover:shadow-md transition-all duration-200"
            >
                <img className="h-20 w-20 object-contain" src={bike} alt="moto" />

                <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-lg flex items-center gap-2">
                            Moto
                           <span className="flex items-center text-gray-500 gap-1">
                                <i className="ri-user-3-fill"></i>
                                <User size={16} />1
                            </span>
                        </h4>
                        <h2 className="text-lg font-bold">₹252</h2>
                    </div>
                    <h5 className="text-sm text-gray-600 mt-1">3 mins away</h5>
                    <p className="text-xs text-gray-500 mt-1">Affordable motorcycle rides</p>
                </div>
            </div>

            {/* Auto Card */}
            <div
                onClick={() => {
                    props.setConfirmRidePanel(true)
                    props.selectVehicle('auto')
                }}
                className="flex items-center justify-between w-full p-4 mb-3 border-2 border-gray-200 rounded-xl shadow-sm cursor-pointer hover:border-black hover:shadow-md transition-all duration-200"
            >
                <img className="h-20 w-20 object-contain" src={auto} alt="auto" />

                <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-lg flex items-center gap-2">
                            UberAuto
                           <span className="flex items-center text-gray-500 gap-1">
                                <i className="ri-user-3-fill"></i>
                                <User size={16} />3
                            </span>
                        </h4>
                        <h2 className="text-lg font-bold">₹320</h2>
                    </div>
                    <h5 className="text-sm text-gray-600 mt-1">3 mins away</h5>
                    <p className="text-xs text-gray-500 mt-1">Affordable Auto rides</p>
                </div>
            </div>

        </div>
    )
}

export default VehiclePanel