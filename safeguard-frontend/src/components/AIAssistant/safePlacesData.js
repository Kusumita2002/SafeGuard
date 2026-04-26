// safePlacesData.js
export const safePlaces = [
    // ⛽ PETROL PUMPS (Highly reliable safe stops)
    { "name": "IOCL Petrol Pump Bhawanipatna", "type": "petrol", "lat": 19.9172, "lng": 83.1688 },
    { "name": "HP Petrol Pump Dharamgarh Road", "type": "petrol", "lat": 19.9128, "lng": 83.1705 },
    { "name": "Bharat Petroleum Pump Bhawanipatna", "type": "petrol", "lat": 19.9149, "lng": 83.1652 },
    { "name": "Reliance Petrol Pump Near Bus Stand", "type": "petrol", "lat": 19.9135, "lng": 83.1632 },
    { "name": "IOCL Pump Borda Road", "type": "petrol", "lat": 19.8720, "lng": 83.1980 },
    { "name": "HP Petrol Pump Junagarh Road", "type": "petrol", "lat": 19.8485, "lng": 83.2650 },
    { "name": "Bharat Petroleum Junagarh", "type": "petrol", "lat": 19.8548, "lng": 83.3130 },

    // 🏧 ATMs (Quick help + cash + CCTV presence)
    { "name": "SBI ATM Main Branch", "type": "atm", "lat": 19.9140, "lng": 83.1680 },
    { "name": "Axis Bank ATM Bhawanipatna", "type": "atm", "lat": 19.9130, "lng": 83.1670 },
    { "name": "HDFC ATM Bus Stand Road", "type": "atm", "lat": 19.9129, "lng": 83.1648 },
    { "name": "PNB ATM Dharamgarh Chowk", "type": "atm", "lat": 19.9122, "lng": 83.1678 },
    { "name": "Union Bank ATM", "type": "atm", "lat": 19.9152, "lng": 83.1695 },
    { "name": "Canara Bank ATM", "type": "atm", "lat": 19.9137, "lng": 83.1660 },
    { "name": "SBI ATM Junagarh", "type": "atm", "lat": 19.8545, "lng": 83.3160 },
    { "name": "Axis ATM Junagarh Market", "type": "atm", "lat": 19.8552, "lng": 83.3142 },

    // 🛒 SHOPS & MARKETS (Crowded = safer)
    { "name": "Reliance Smart Bhawanipatna", "type": "crowd", "lat": 19.9158, "lng": 83.1672 },
    { "name": "Bazarpada Market", "type": "crowd", "lat": 19.9142, "lng": 83.1668 },
    { "name": "Daily Market Complex", "type": "crowd", "lat": 19.9136, "lng": 83.1659 },
    { "name": "Station Road Shops", "type": "crowd", "lat": 19.9125, "lng": 83.1645 },
    { "name": "Dharamgarh Chowk Shops", "type": "crowd", "lat": 19.9124, "lng": 83.1674 },
    { "name": "Bus Stand Shopping Area", "type": "crowd", "lat": 19.9131, "lng": 83.1641 },
    { "name": "Junagarh Main Market", "type": "crowd", "lat": 19.8550, "lng": 83.3148 },
    { "name": "Junagarh Bazaar Area", "type": "crowd", "lat": 19.8546, "lng": 83.3155 },

    // 🍽️ RESTAURANTS / DHABAS (24×7 or busy places)
    { "name": "Highway Dhaba Borda", "type": "crowd", "lat": 19.8700, "lng": 83.2005 },
    { "name": "Roadside Dhaba Chiliguda", "type": "crowd", "lat": 19.8420, "lng": 83.2440 },
    { "name": "Food Plaza Bus Stand", "type": "crowd", "lat": 19.9132, "lng": 83.1638 },
    { "name": "Hotel Kalahandi Restaurant", "type": "crowd", "lat": 19.9150, "lng": 83.1675 },
    { "name": "Local Tea Stall Junction", "type": "crowd", "lat": 19.9120, "lng": 83.1660 },

    // 🏫 SCHOOLS / COLLEGES (Safe during day)
    { "name": "Government College Bhawanipatna", "type": "public", "lat": 19.9160, "lng": 83.1690 },
    { "name": "DAV School Bhawanipatna", "type": "public", "lat": 19.9170, "lng": 83.1680 },
    { "name": "Junagarh College", "type": "public", "lat": 19.8530, "lng": 83.3185 },

    // 🏛️ GOVERNMENT OFFICES
    { "name": "Collector Office Kalahandi", "type": "public", "lat": 19.9155, "lng": 83.1705 },
    { "name": "Municipality Office Bhawanipatna", "type": "public", "lat": 19.9145, "lng": 83.1682 },
    { "name": "Block Office Junagarh", "type": "public", "lat": 19.8540, "lng": 83.3180 },

    // 🚏 TRANSPORT POINTS
    { "name": "Auto Stand Bhawanipatna", "type": "safe_hub", "lat": 19.9133, "lng": 83.1643 },
    { "name": "Taxi Stand Bhawanipatna", "type": "safe_hub", "lat": 19.9136, "lng": 83.1647 },
    { "name": "Mini Bus Stop Borda", "type": "safe_hub", "lat": 19.8615, "lng": 83.2090 },
    { "name": "Chiliguda Bus Stop", "type": "safe_hub", "lat": 19.8408, "lng": 83.2462 },

    // 🏦 BANKS (Safe + CCTV + crowd)
    { "name": "SBI Main Branch", "type": "public", "lat": 19.9141, "lng": 83.1682 },
    { "name": "Axis Bank Branch", "type": "public", "lat": 19.9132, "lng": 83.1673 },
    { "name": "HDFC Bank Bhawanipatna", "type": "public", "lat": 19.9148, "lng": 83.1665 },
    { "name": "PNB Bank Branch", "type": "public", "lat": 19.9127, "lng": 83.1679 },
    { "name": "Bank of India Junagarh", "type": "public", "lat": 19.8543, "lng": 83.3168 },

    // ⛑️ EXTRA SAFE FALLBACK LOCATIONS
    { "name": "Pharmacy Near Bus Stand", "type": "medical", "lat": 19.9134, "lng": 83.1649 },
    { "name": "24x7 Medical Store Bhawanipatna", "type": "medical", "lat": 19.9152, "lng": 83.1678 },
    { "name": "Clinic Borda", "type": "medical", "lat": 19.8608, "lng": 83.2105 },
    { "name": "Clinic Chiliguda", "type": "medical", "lat": 19.8412, "lng": 83.2458 },
    { "name": "Medical Store Junagarh", "type": "medical", "lat": 19.8547, "lng": 83.3158 }
];