import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useGetActiveCustomers } from "../../react-query/queries/customer.queries";
import { useEffect, useState, useMemo } from "react";
import Loader from "../../components/shared/Loader";
import FilterComponent from "../../components/TableFilter";

const columns = [
  {
    name: "Customer Name",
    selector: (row) => row.user?.name || "N/A",
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.user?.email || "N/A",
    sortable: true,
  },
  {
    name: "CNIC",
    selector: (row) => row.cnic,
    sortable: true,
  },
  {
    name: "Phone Number",
    selector: (row) => row.phone_number,
    sortable: true,
  },
  {
    name: "Agreements",
    selector: (row) => row.agreements?.length || 0,
    sortable: true,
  }
];

function Customers() {
  const [tableData, setTableData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const { data: response, isPending } = useGetActiveCustomers();

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
    navigate(`/admin/customers/${row.id}`);
  };

  useEffect(() => {
    if (!isPending && response?.results?.length > 0) {
      setTableData(
        response.results.map((customer) => ({
          id: customer.id,
          user: customer.user,
          cnic: customer.cnic,
          phone_number: customer.phone_number,
          agreements: customer.agreements
        }))
      );
    }
  }, [response]);

  useEffect(() => {
    if (filterText !== "") {
      setTableData((prevData) =>
        prevData.filter((customer) => 
          customer.user?.name?.toLowerCase().includes(filterText.toLowerCase()) ||
          customer.user?.email?.toLowerCase().includes(filterText.toLowerCase()) ||
          customer.cnic?.toLowerCase().includes(filterText.toLowerCase()) ||
          customer.phone_number?.toLowerCase().includes(filterText.toLowerCase())
        )
      );
    }
  }, [filterText]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-1">Customers</h1>
      <div className="p-4">
        {isPending ? (
          <Loader />
        ) : (
          <DataTable
            columns={columns}
            data={tableData}
            selectableRows
            direction="auto"
            fixedHeaderScrollHeight="300px"
            pagination
            responsive
            subHeaderAlign="right"
            subHeaderWrap
            highlightOnHover
            striped
            paginationResetDefaultPage={resetPaginationToggle}
            subHeaderComponent={subHeaderComponentMemo}
            pointerOnHover
            onRowClicked={handleRowClick}
          />
        )}
      </div>
    </div>
  );
}

export default Customers;
