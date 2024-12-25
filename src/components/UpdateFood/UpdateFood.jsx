import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/UseAxiosSecure";

const UpdateFood = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(authContext);
  const [food, setFood] = useState({});

  useEffect(() => {
    fetchFoodData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchFoodData = async () => {
    try {
      const { data } = await axiosSecure.get(`/food/${id}`);
      setFood(data);
    } catch (err) {
      // console.log(err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const image = form.image.value;
    const name = form.name.value;
    const category = form.category.value;
    const quantity = form.quantity.value;
    const origin = form.origin.value;
    const description = form.description.value;
    const price = parseFloat(form.price.value);
    const userEmail = user.email;
    const userName = user.displayName || user.email.split("@")[0];

    const formData = {
      image,
      name,
      category,
      quantity,
      origin,
      description,
      price,
      userEmail,
      userName,
    };
    // post-request
    try {
      await axiosSecure.put(`/updateFood/${id}`, formData);
      // Success alert after food is added
      Swal.fire({
        icon: "success",
        title: "Food Updated Successfully",
        text: "The food item has been successfully updated to the menu!",
        confirmButtonText: "OK",
      });
      form.reset();
      navigate("/myFoods");
    } catch (err) {
      // console.log(err);
      // Error alert
      Swal.fire({
        icon: "error",
        title: "Failed to Update Food",
        text: "There was an issue while updating the food item. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <section className="p-2 md:p-6 mx-auto bg-white rounded-md shadow-md">
        <h2 className="text-xl font-bold text-gray-700 capitalize text-center">
          Update Food
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="text-gray-700">
                Food Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={food.name}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label htmlFor="image" className="text-gray-700">
                Image URL
              </label>
              <input
                name="image"
                id="image"
                defaultValue={food.image}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              ></input>
            </div>

            <div>
              <label htmlFor="category" className="text-gray-700">
                Category
              </label>
              <input
                id="category"
                name="category"
                type="text"
                defaultValue={food.category}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label htmlFor="quantity" className="text-gray-700">
                Quantity
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                defaultValue={food.quantity}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label htmlFor="price" className="text-gray-700">
                Price
              </label>
              <input
                id="price"
                name="price"
                type="number"
                defaultValue={food.price}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label htmlFor="origin" className="text-gray-700">
                Origin
              </label>
              <input
                id="origin"
                name="origin"
                type="text"
                defaultValue={food.origin}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor="description" className="text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="5"
              defaultValue={food.description}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            ></textarea>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-8 py-2.5 leading-5 text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateFood;
