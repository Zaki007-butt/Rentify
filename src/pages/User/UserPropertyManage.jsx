import { Link, useNavigate, useParams } from "react-router-dom";
import PropertyDetailCard from "../../components/cards/PropertyDetailCard";
import Loader from "../../components/shared/Loader";
import { useGetSingleProperty } from "../../react-query/queries/property.queries";
import { useDeletePropertyMutation } from "../../react-query/mutations/property.mutation";
import toast from "react-hot-toast";

function UserPropertyManage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isPending, data: property } = useGetSingleProperty(id);
  const { mutateAsync: deleteProperty } = useDeletePropertyMutation();

  const handleEdit = () => {
    // show edit form to edit
    navigate("edit");
  };

  const handleDelete = async () => {
    // show confirmation to  delete
    const confirmed = window.confirm(`Are you sure you want to delete "${property.title}"?`);

    if (confirmed) {
      await deleteProperty(id);
      // navigate to properties with message
      toast.success(`"${property.title}" deleted`);
      navigate("/admin/properties");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-1">Manage Property</h1>

      {/* Action buttons */}
      <div className="flex justify-between items-start">
        <Link
          to="/admin/properties"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          &lt;&nbsp;Back
        </Link>
        <div className="flex gap-x-2">
          <button
            onClick={handleEdit}
            disabled={isPending}
            className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-slate-600 dark:hover:bg-slate-700"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-white bg-rose-700 hover:bg-rose-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-rose-600 dark:hover:bg-rose-700"
            disabled={isPending}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Property Content */}
      <div className="my-5">
        {isPending ? <Loader /> : <PropertyDetailCard property={property} />}
      </div>
    </div>
  );
}

export default UserPropertyManage;
