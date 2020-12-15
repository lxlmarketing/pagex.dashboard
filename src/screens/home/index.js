import React, { useEffect, useState } from "react";
import { useTable } from "react-table";

import Sidebar from "../../components/layout.component";

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    // "http://localhost:3030/api/v1/customers/change-email",
    fetch(
      "https://landingi.herokuapp.com/api/v1/customers",
      requestOptions
    ).then(async (data) => {
      if (data.status === 404) {
        return alert("Error: Customers not found");
      }

      let response = await data.json().then((res) => res);

      setData(response);
    });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Nome",
        accessor: "name",
      },
      {
        Header: "Email Hotmart",
        accessor: "hotmartEmail",
      },
      {
        Header: "Email PageX",
        accessor: "pagexEmail",
      },
      // {
      //   Header: "Ativo",
      //   accessor: "active",
      // },
      {
        Header: "Pagex id",
        accessor: "pagexId",
      },
      {
        Header: "",
        accessor: "id",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <>
      {data.length > 0 ? (
        <>
          <Sidebar />
          <div className="main-style">
            <h1 className="mb-5">Contas</h1>

            <table
              {...getTableProps()}
              style={{ border: "solid 1px #333", width: "100%" }}
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        style={{
                          borderBottom: "solid 3px #333",
                          borderRight: "solid 1px #333",
                          textAlign: "center",
                          background: "aliceblue",
                          color: "black",
                          fontWeight: "bold",
                        }}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            style={{
                              padding: "10px",
                              border: "solid 1px gray",
                              background: "#f3f3f3",
                            }}
                          >
                            {cell.column.id === "id" ? (
                              <div className="d-flex justify-content-center">
                                <input type="checkbox" value={cell.value} />
                              </div>
                            ) : (
                              cell.render("Cell")
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <button className="mt-4 float-right btn btn-dark " type="submit">
              Deletar
            </button>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Home;
