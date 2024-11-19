import React from "react";
import DataTable from "react-data-table-component";

const FlightDataTable = ({ data }) => {
  const columns = [
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
    },
    {
      name: "Destination",
      selector: (row) => row.destination,
      sortable: true,
    },
    {
      name: "Scheduled Departure Time",
      selector: (row) => row.scheduledDeparture,
      sortable: true,
    },
    {
      name: "Actual Departure Time",
      selector: (row) => row.actualDeparture,
      sortable: true,
    },
    {
      name: "Delay",
      selector: (row) => row.delay,
      sortable: true,
      cell: (row) => (
        <span style={{ color: row.delay === 0 ? "green" : "red" }}>
          {row.delay}
        </span>
      ),
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "16px",
        backgroundColor: "#f8f9fa",
        borderBottom: "2px solid #dee2e6",
      },
    },
    rows: {
      style: {
        minHeight: "50px",
      },
    },
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Flight Data Table</h2>
      <DataTable
        title="Flight Information"
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        customStyles={customStyles}
        defaultSortFieldId="date"
      />
    </div>
  );
};

export default FlightDataTable;
