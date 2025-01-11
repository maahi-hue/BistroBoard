import { useContext, useState, useEffect } from "react";
import { authContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import moment from "moment";
import useAxiosSecure from "../../hooks/UseAxiosSecure";

const MyOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(authContext);
  const [orders, setOrders] = useState([]);
  const [id, setId] = useState(null);

  useEffect(() => {
    fetchAllOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchAllOrders = async () => {
    try {
      const { data } = await axiosSecure.get(`/orders/${user?.email}`);
      // console.log("Fetched orders:", data);

      const formattedData = data.map((order) => ({
        ...order,
        formattedDate: moment(order.buyingDate).format(
          "MMMM Do YYYY, h:mm:ss a"
        ),
        formattedPrice: new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "BDT",
        }).format(order.price),
      }));

      setOrders(formattedData);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      await axiosSecure.delete(`/order/${id}`);
      Swal.fire("Deleted!", "The order has been deleted.", "success");
      fetchAllOrders();
      setId(null);
    } catch (err) {
      console.error("Error deleting order:", err);
      Swal.fire("Error", "Could not delete the order.", "error");
    }
  };

  return (
    <section className="container px-4 mx-auto my-12">
      <div className="flex items-center gap-x-3">
        <h2 className="text-xl font-semibold">My Orders</h2>
        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
          {orders.length} orders
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium  uppercase">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium  uppercase">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium  uppercase">
                      Price
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-medium  uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="px-4 py-4 text-sm  whitespace-nowrap">
                        {order.foodName}
                      </td>
                      <td className="px-4 py-4 text-sm  whitespace-nowrap">
                        {order.formattedDate}
                      </td>
                      <td className="px-4 py-4 text-sm  whitespace-nowrap">
                        {order.formattedPrice}
                      </td>
                      <td className="px-4 py-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => setId(order._id)}
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal to confirm deletion */}
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

export default MyOrders;
