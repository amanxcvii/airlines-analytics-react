import React, { useMemo, useState, useCallback } from "react";
import DataTable from "react-data-table-component";

const FlightDataTable = ({ data, dominantColor }) => {
  // State for filters
  const [filterText, setFilterText] = useState({
    origin: '',
    destination: '',
  });

  // Extract unique origins and destinations
  const uniqueOrigins = useMemo(() => 
    [...new Set(data.map(row => row.origin))].sort(), 
    [data]
  );

  const uniqueDestinations = useMemo(() => 
    [...new Set(data.map(row => row.destination))].sort(), 
    [data]
  );

  // Filtered data based on filters
  const filteredData = useMemo(() => {
    return data.filter(row => 
      (filterText.origin === '' || row.origin === filterText.origin) &&
      (filterText.destination === '' || row.destination === filterText.destination)
    );
  }, [data, filterText]);

  const columns = useMemo(() => [
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Flight Number",
      selector: (row) => row.flightNumber,
      sortable: true,
    },
    {
      name: "Origin",
      selector: (row) => row.origin,
      sortable: true,
      cell: (row) => (
        <div style={{ 
          fontWeight: filterText.origin === row.origin ? 'bold' : 'normal',
          color: filterText.origin === row.origin ? (dominantColor || 'inherit') : 'inherit'
        }}>
          {row.origin}
        </div>
      )
    },
    {
      name: "Destination",
      selector: (row) => row.destination,
      sortable: true,
      cell: (row) => (
        <div style={{ 
          fontWeight: filterText.destination === row.destination ? 'bold' : 'normal',
          color: filterText.destination === row.destination ? (dominantColor || 'inherit') : 'inherit'
        }}>
          {row.destination}
        </div>
      )
    },
    {
      name: "Scheduled Departure",
      selector: (row) => row.scheduledDeparture,
      sortable: true,
    },
    {
      name: "Actual Departure",
      selector: (row) => row.actualDeparture,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.delay,
      sortable: true,
      cell: (row) => {
        // Determine status color and text
        let statusColor = 'green';
        let statusText = 'On Time';
        
        if (row.cancelled === true) {
          statusColor = 'red';
          statusText = 'Cancelled';
        } else if (row.delay > 0) {
          statusColor = 'orange';
          statusText = `Delayed ${row.delay} min`;
        }
        
        return (
          <span 
            style={{ 
              color: statusColor, 
              fontWeight: 'bold',
              padding: '5px 10px',
              borderRadius: '4px',
              backgroundColor: `${statusColor}10`, // Light background
            }}
          >
            {statusText}
          </span>
        );
      },
    },
  ], [dominantColor, filterText]);

  // Filter reset handler
  const handleFilterReset = () => {
    setFilterText({ origin: '', destination: '' });
  };

  // Render filter row
  const FilterComponent = useMemo(() => (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
      backgroundColor: dominantColor 
        ? `${dominantColor.replace('rgb', 'rgba').replace(')', ', 0.05)')}` 
        : "#f8f9fa",
      borderRadius: '8px',
      marginBottom: '15px'
    }}>
      {/* Origin Filter */}
      <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
        <label htmlFor="origin-filter" style={{ marginRight: '10px', fontWeight: 'bold' }}>
          Origin:
        </label>
        <select
          id="origin-filter"
          value={filterText.origin}
          onChange={(e) => setFilterText(prev => ({ ...prev, origin: e.target.value }))}
          style={{
            padding: '5px',
            borderRadius: '4px',
            border: `1px solid ${dominantColor || '#ccc'}`,
            backgroundColor: 'white'
          }}
        >
          <option value="">All Origins</option>
          {uniqueOrigins.map(origin => (
            <option key={origin} value={origin}>{origin}</option>
          ))}
        </select>
      </div>

      {/* Destination Filter */}
      <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
        <label htmlFor="destination-filter" style={{ marginRight: '10px', fontWeight: 'bold' }}>
          Destination:
        </label>
        <select
          id="destination-filter"
          value={filterText.destination}
          onChange={(e) => setFilterText(prev => ({ ...prev, destination: e.target.value }))}
          style={{
            padding: '5px',
            borderRadius: '4px',
            border: `1px solid ${dominantColor || '#ccc'}`,
            backgroundColor: 'white'
          }}
        >
          <option value="">All Destinations</option>
          {uniqueDestinations.map(destination => (
            <option key={destination} value={destination}>{destination}</option>
          ))}
        </select>
      </div>

      {/* Reset Button */}
      {(filterText.origin || filterText.destination) && (
        <button 
          onClick={handleFilterReset}
          style={{
            padding: '5px 10px',
            borderRadius: '4px',
            backgroundColor: dominantColor 
              ? `${dominantColor.replace('rgb', 'rgba').replace(')', ', 0.2)')}` 
              : "#f1f3f5",
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          Reset Filters
        </button>
      )}
    </div>
  ), [dominantColor, filterText, uniqueOrigins, uniqueDestinations]);

  return (
    <div 
      style={{ 
        padding: "20px", 
        animation: 'fadeIn 0.5s ease-out',
        borderRadius: '12px',
        backgroundColor: dominantColor 
          ? `${dominantColor.replace('rgb', 'rgba').replace(')', ', 0.05)')}` 
          : "transparent",
        width: '100%',
      }}
    >
      <h2 style={{ 
        marginBottom: '20px', 
        color: '#333',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        Flight Information
        <span style={{ 
          fontSize: '0.7em', 
          color: '#666',
          fontWeight: 'normal'
        }}>
          Total Flights: {filteredData.length} / {data.length}
        </span>
      </h2>
      
      {FilterComponent}
      
      <div style={{ 
        width: '100%', 
        overflowX: 'auto',
        position: 'relative',
      }}>
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          defaultSortFieldId="date"
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
          noDataComponent={
            <div style={{ 
              padding: '20px', 
              textAlign: 'center', 
              color: '#666' 
            }}>
              No flights match the current filter
            </div>
          }
          fixedHeader
          responsive
        />
      </div>
    </div>
  );
};

export default FlightDataTable;