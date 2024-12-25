import { useContext, useEffect, useState } from "react";
import { authContext } from "../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/UseAxiosSecure";

const MyFoods = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(authContext);
  const [id, setId] = useState(null);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetchAllFoods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchAllFoods = async () => {
    try {
      const { data } = await axiosSecure.get(`/foods/${user?.email}`);
      setFoods(data);
    } catch (err) {
      // console.error("Error fetching foods:", err);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      await axiosSecure.delete(`/food/${id}`);
      Swal.fire("Deleted!", "The food item has been deleted.", "success");
      fetchAllFoods();
      setId(null);
    } catch (err) {
      // console.error("Error deleting food:", err);
      Swal.fire("Error", "Could not delete the food item.", "error");
    }
  };

  return (
    <section className="container px-4 mx-auto pt-12">
      <div className="flex items-center gap-x-3">
        <h2 className="text-xl font-semibold ">My Added Foods</h2>
        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
          {foods.length} Foods
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg mb-3">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="py-3.5 px-4 text-sm font-normal text-left ">
                      Food Name
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left ">
                      Food Category
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left ">
                      Price
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left ">
                      Quantity
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left ">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200">
                  {foods.map((food) => (
                    <tr key={food._id}>
                      <td className="px-4 py-4 text-sm  whitespace-nowrap">
                        {food.name}
                      </td>
                      <td className="px-4 py-4 text-sm  whitespace-nowrap">
                        {food.category}
                      </td>
                      <td className="px-4 py-4 text-sm  whitespace-nowrap">
                        {food.price} TK
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        {food.quantity}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-6">
                          <button
                            onClick={() => setId(food._id)}
                            className=" hover:text-red-500 focus:outline-none"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>

                          <Link
                            to={`/update/${food._id}`}
                            className=" hover:text-yellow-500 focus:outline-none"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {id && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this item?</p>
            <div className="mt-4 flex justify-end gap-4">
              <button
                className="btn hover:bg-[#354f52] hover:text-[#cad2c5] font-bold"
                onClick={() => setId(null)}
              >
                Cancel
              </button>
              <button
                className="btn hover:bg-[#354f52] hover:text-[#cad2c5] font-bold"
                onClick={handleDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyFoods;
