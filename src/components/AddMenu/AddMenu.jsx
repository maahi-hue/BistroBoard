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

    const name = form.name.value;
    const description = form.description.value;
    const price = parseFloat(form.price.value);
    const image = form.image.value;
    const userEmail = user.email;
    const userName = user.displayName || user.email.split("@")[0];

    const formData = {
      name,
      description,
      price,
      image,
      userEmail,
      userName,
    };

    try {
      await axiosSecure.post(`/addMenu`, formData);
      Swal.fire({
        icon: "success",
        title: "Menu Added Successfully",
        text: "The menu item has been successfully added!",
        confirmButtonText: "OK",
      });
      form.reset();
    } catch (err) {
      console.error(err);
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
        <div className="md:flex gap-6 w-10/12 mx-auto">
          <div className="space-y-3 w-full">
            <label className="input input-bordered flex items-center gap-2">
              Food Name
              <input
                type="text"
                name="name"
                className="grow rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Pizza"
                required
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              Food Description
              <input
                type="text"
                name="description"
                className="grow rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Delicious cheese pizza"
                required
              />
            </label>
          </div>
        </div>

        <div>
          <label className="input input-bordered flex mx-auto items-center gap-2 w-10/12 mt-3">
            Price
            <input
              type="text"
              name="price"
              className="grow rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="12.99"
              required
            />
          </label>
        </div>

        <input
          type="submit"
          value="Add Menu"
          className="btn my-6 block mx-auto w-10/12 hover:bg-[#354f52] hover:text-[#cad2c5] font-bold rounded-full"
        />
      </form>
    </div>
  );
};

export default AddMenu;
