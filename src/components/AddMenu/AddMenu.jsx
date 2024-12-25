import { useContext } from "react";
import { authContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/UseAxiosSecure";

const AddMenu = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(authContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value.trim();
    const description = form.description.value.trim();
    const price = parseFloat(form.price.value);
    const userEmail = user.email;
    const userName = user.displayName || user.email.split("@")[0];

    const formData = {
      name,
      description,
      price,
      userEmail,
      userName,
    };

    try {
      const response = await axiosSecure.post(`/addMenu`, formData);
      // console.log("Response:", response);
      Swal.fire({
        icon: "success",
        title: "Menu Added Successfully",
        text: "The menu item has been successfully added!",
        confirmButtonText: "OK",
      });
      form.reset();
    } catch (err) {
      // console.error("Error adding menu item:", err);
      Swal.fire({
        icon: "error",
        title: "Failed to Add Menu",
        text: "There was an issue while adding the menu item. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="w-11/12 mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Add New Menu Item</h1>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <label className="block">
            <span className="font-medium">Food Name</span>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full mt-1 rounded-md"
              placeholder="Pizza"
              required
            />
          </label>

          <label className="block">
            <span className="font-medium">Food Description</span>
            <textarea
              name="description"
              className="textarea textarea-bordered w-full mt-1 rounded-md"
              placeholder="Delicious cheese pizza"
              rows="3"
              required
            ></textarea>
          </label>

          <label className="block">
            <span className="font-medium">Price (TK)</span>
            <input
              type="number"
              step="0.01"
              name="price"
              className="input input-bordered w-full mt-1 rounded-md"
              placeholder="12.99"
              required
            />
          </label>
        </div>

        <button
          type="submit"
          className="btn mt-6 block mx-auto w-full font-bold rounded hover:bg-[#354f52] hover:text-[#cad2c5]"
        >
          Add Menu
        </button>
      </form>
    </div>
  );
};

export default AddMenu;
