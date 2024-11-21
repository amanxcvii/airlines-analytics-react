import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();


export const DataProvider = ({ children }) => {
    const [airlineMap, setAirlineMap] = useState([]);
    
    return (
        <DataContext.Provider value={{ airlineMap, setAirlineMap }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
export default DataContext;
