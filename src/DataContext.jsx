import React, { createContext, useContext, useState } from 'react';

export const DataContext = createContext();
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [airlineMap, setAirlineMapState] = useState([]);

    const setAirlineMap = (data) => {
        setAirlineMapState(data);
    }

    return (
        <DataContext.Provider value={{ airlineMap, setAirlineMap }}>
            {children}
        </DataContext.Provider>
    );
};
