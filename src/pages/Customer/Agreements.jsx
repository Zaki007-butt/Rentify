import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useGetAgreements } from "../../react-query/queries/agreement.queries";
import { useEffect, useState, useMemo } from "react";
import Loader from "../../components/shared/Loader";
import FilterComponent from "../../components/TableFilter";
import { formatDate } from "../../utilities/helpers";

const columns = [
  {
    name: "Detail",
    selector: (row) => row.details,
    sortable: true,
  },
  {
    name: "Created At",
    selector: (row) => row.created_at,
    sortable: true,
  },
  {
    name: "Security Amount",
    selector: (row) => row.security_amount,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    conditionalCellStyles: [
      {
        when: (row) => row.status === "pending",
        classNames: ["text-amber-500"],
      },
      {
        when: (row) => row.status === "active",
        classNames: ["text-green-500"],
      },
      {
        when: (row) => row.status === "cancelled",
        classNames: ["text-red-500"],
      },
      {
        when: (row) => row.status === "completed",
        classNames: ["text-blue-500"],
      },
    ],
  },
];

function Agreements() {
  const [tableData, setTableData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const { data: response, isPending } = useGetAgreements();

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const handleRowClick = (row) => {
    navigate(`${row.id}`);
  };

  useEffect(() => {
    if (!isPending && response?.data?.results?.length > 0) {
      setTableData(
        response.data.results.map((agreement) => ({
          id: agreement.id,
          details: agreement.details,
          created_at: formatDate(agreement.created_at),
          security_amount: agreement.security_amount,
          status: agreement.status,
        }))
      );
    }
  }, [response]);

  useEffect(() => {
    if (filterText !== "") {
      setTableData((prevData) =>
        prevData.filter(
          (property) =>
            property.name &&
            property.name.toLowerCase().includes(filterText.toLowerCase())
        )
      );
    }
  }, [filterText]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-1">
        Agreements
      </h1>
      {/* Properties Content */}
      {/* <Link
        to="/admin/agreements/create"
        className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Create Agreement
      </Link> */}
      <div className="p-4">
        {isPending ? (
          <div className="flex justify-center items-center w-full h-[80vh]">
            <Loader />
          </div>
        ) : (
          <DataTable
            // title="Properties List"
            columns={columns}
            data={tableData}
            direction="auto"
            fixedHeaderScrollHeight="300px"
            pagination
            responsive
            subHeaderAlign="right"
            subHeaderWrap
            highlightOnHover
            striped
            paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
            subHeaderComponent={subHeaderComponentMemo}
            pointerOnHover
            onRowClicked={handleRowClick}
          />
        )}
      </div>
    </div>
  );
}

export default Agreements;
