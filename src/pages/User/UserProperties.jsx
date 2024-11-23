import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useGetProperties } from "../../react-query/queries/property.queries";
import { useEffect, useState, useMemo } from "react";
import Loader from "../../components/shared/Loader";
import FilterComponent from "../../components/TableFilter";
import { PROPERTIES_PAGE_SIZE } from "../../react-query/constants/keys";

const columns = [
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
  let categoryID, subcategoryID, searchKeyword, type;
  const { data: response, isPending } = useGetProperties(
    categoryID,
    subcategoryID,
    searchKeyword,
    type,
    PROPERTIES_PAGE_SIZE
  );

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
        response.data.results.map((property) => ({
          id: property.id,
          title: property.title,
          price: property.price,
          rent_or_buy: property.rent_or_buy,
          property_category_name: property.property_category_name,
        }))
      );
    }
  }, [response]);

  useEffect(() => {
    if (filterText !== "") {
      setTableData((prevData) =>
        prevData.filter(
          (property) =>
            property.name && property.name.toLowerCase().includes(filterText.toLowerCase())
        )
      );
    }
  }, [filterText]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-1">Properties</h1>
      {/* Properties Content */}
      <Link
        to="/admin/properties/create"
        className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add Property
      </Link>
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
            selectableRows
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

export default UserProperties;
