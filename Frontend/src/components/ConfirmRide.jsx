import React from 'react'
import car from "../assets/car.png";
import { ChevronDown } from 'lucide-react';
const ConfirmRide = (props) => {


    // STATIC DATA (replace with whatever you want)
    const staticPickup = "Static Pickup Location";
    const staticDestination = "Static Destination Location";
    const staticFare = 120;
    const staticAddressTitle = "562/11-A";



    return (
        <div>


            <div className="flex items-center justify-between mb-5">
                <h3 className="text-2xl font-semibold">Confirm your Ride</h3>
                <button
                    onClick={() => props.setConfirmRidePanel(false)}
                    className="p-1 focus:outline-none"
                >
                    <ChevronDown className="text-3xl text-black" />
                </button>
            </div>

            <div className='flex gap-2 justify-between flex-col items-center'>
                    
                <img className='h-20' src={car} alt="car" />

                <div className='w-full mt-5'>

                    {/* Pickup */}
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{staticAddressTitle}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{staticPickup}</p>
                        </div>
                    </div>

                    {/* Destination */}
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{staticAddressTitle}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{staticDestination}</p>
                        </div>
                    </div>

                    {/* Fare */}
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{staticFare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Payment</p>
                        </div>
                    </div>

                </div>
                <button onClick={() => {
                    props.setVehicleFound(true)
                    props.setConfirmRidePanel(false)


                }} className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm</button>
            </div>
        </div>
    )
}

export default ConfirmRide