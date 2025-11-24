import React from "react";
import { MapPin } from "lucide-react";

const LocationSearchPanel = ({
    suggestions,
    setPickup,
    setDestination,
    activeField
}) => {

    // ----------------------------
    // Dummy location fallback data
    // ----------------------------
    const dummyLocations = [
        "MG Road Metro Station",
        "Brigade Road",
        "Koramangala 5th Block",
        "Indiranagar 100ft Road",
        "Majestic Bus Stand",
        "BTM Layout 2nd Stage",
        "Whitefield Forum Mall"
    ];

    // Choose data: API suggestions OR dummy data
    const locationsToShow = suggestions.length > 0 ? suggestions : dummyLocations;

    const handleSuggestionClick = (location) => {
        if (activeField === "pickup") {
            setPickup(location);
        } else {
            setDestination(location);
        }
    };

    return (
        <div className="p-3">

            {/* Small label */}
            <p className="text-sm text-gray-500 mb-2">
                {suggestions.length > 0 ? "Suggestions" : "Popular locations"}
            </p>

            {locationsToShow.map((loc, idx) => (
                <div
                    key={idx}
                    onClick={() => handleSuggestionClick(loc)}
                    className="
                        flex items-center gap-4 
                        p-4 mb-2 
                        bg-gray-50 
                        rounded-xl 
                        cursor-pointer 
                        active:bg-black/5 
                        transition
                        shadow-sm
                    "
                >
                    <div className="bg-black/10 p-2 rounded-full">
                        <MapPin size={18} className="text-gray-700" />
                    </div>

                    <h4 className="font-medium text-gray-800">
                        {loc}
                    </h4>
                </div>
            ))}
        </div>
    );
};

export default LocationSearchPanel;
