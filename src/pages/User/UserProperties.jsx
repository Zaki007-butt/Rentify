import { Link, useNavigate, useSearchParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useGetProperties } from "../../react-query/queries/property.queries";
import { useEffect, useState, useMemo } from "react";
import Loader from "../../components/shared/Loader";
import FilterComponent from "../../components/TableFilter";
import { PROPERTIES_PAGE_SIZE } from "../../react-query/constants/keys";

const columns = [
  {
    name: "ID",
    selector: (row) => row.id,
    sortable: true,
  },

  {
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: "Price",
    selector: (row) => row.price,
    sortable: true,
  },
  {
    name: "Category",
    selector: (row) => row.property_category_name,
  },
  {
    name: "Type",
    selector: (row) => row.rent_or_buy,
  },
];

// id={property.id}
// title={property.title}
// description={property.description}
// price={property.price}
// address={property.address}
// bedroom={property.bedroom}
// washroom={property.washroom}
// area={property.area}
// property_category_name={property.property_category_name}
// rent_or_buy={property.rent_or_buy}

function UserProperties() {
  const [tableData, setTableData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10); // Default page size

  let categoryID, subcategoryID, searchKeyword, type;
  const [searchParams] = useSearchParams();
  const filterType = searchParams.get("filter") || "all";
  const filterValue = searchParams.get("value");

  const { data: response, isPending } = useGetProperties(
    categoryID,
    subcategoryID,
    searchKeyword,
    type,
    perPage,
    filterType,
    filterValue,
    currentPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle per page change
  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
  };

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
    if (!isPending && response?.data) {
      setTableData(
        response.data.results.map((property) => ({
          id: property.id,
          title: property.title,
          price: property.price,
          rent_or_buy: property.rent_or_buy,
          property_category_name: property.property_category_name,
        }))
      );
      setTotalRows(response.data.count);
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800 border-b pb-1">
          Properties
        </h1>
        <Link
          to="/admin/properties/create"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Property
        </Link>
      </div>

      <div className="p-4">
        <>
          <DataTable
            columns={columns}
            data={tableData}
            selectableRows={false}
            direction="auto"
            fixedHeaderScrollHeight="300px"
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            paginationRowsPerPageOptions={[10]}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
            responsive
            progressPending={isPending}
            progressComponent={<Loader />}
            subHeaderAlign="right"
            subHeaderWrap
            highlightOnHover
            striped
            paginationResetDefaultPage={resetPaginationToggle}
            subHeaderComponent={subHeaderComponentMemo}
            pointerOnHover
            onRowClicked={handleRowClick}
          />
        </>
      </div>
    </div>
  );
}

export default UserProperties;
