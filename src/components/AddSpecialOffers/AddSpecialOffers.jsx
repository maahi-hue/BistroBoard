import { useContext } from "react";
import { authContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/UseAxiosSecure";

const AddSpecialOffers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(authContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const description = form.description.value;
    const originalPrice = parseFloat(form.originalPrice.value);
    const discountedPrice = parseFloat(form.discountedPrice.value);
    const discount = parseFloat(
      ((originalPrice - discountedPrice) / originalPrice) * 100
    ).toFixed(2);
    const image = form.image.value;

    const offerData = {
      name,
      description,
      originalPrice,
      discountedPrice,
      discount,
      image,
      addedBy: user.email,
    };

    try {
      await axiosSecure.post(`/addOffer`, offerData);
      Swal.fire({
        icon: "success",
        title: "Offer Added Successfully",
        text: "The special offer has been successfully added!",
        confirmButtonText: "OK",
      });
      form.reset();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to Add Offer",
        text: "There was an issue while adding the special offer. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="w-11/12 mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Add New Special Offer
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <label className="block">
            <span className=""> Image URL</span>
            <input
              type="text"
              name="image"
              className="input input-bordered w-full mt-1 rounded-md"
              placeholder="Enter Image URL"
              required
            />
          </label>
          <label className="block">
            <span className="">Offer Name</span>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full mt-1 rounded-md"
              placeholder="Deluxe Pizza"
              required
            />
          </label>

          <label className="block">
            <span className="">Description</span>
            <textarea
              name="description"
              className="textarea textarea-bordered w-full mt-1 rounded-md"
              placeholder="A pizza loaded with premium toppings."
              rows="3"
              required
            ></textarea>
          </label>

          <label className="block">
            <span className="">Original Price (TK)</span>
            <input
              type="number"
              step="0.01"
              name="originalPrice"
              className="input input-bordered w-full mt-1 rounded-md"
              placeholder="18.99"
              required
            />
          </label>

          <label className="block">
            <span className="">Discounted Price (TK)</span>
            <input
              type="number"
              step="0.01"
              name="discountedPrice"
              className="input input-bordered w-full mt-1 rounded-md"
              placeholder="12.99"
              required
            />
          </label>
        </div>

        <input
          type="submit"
          value="Add Offer"
          className="btn block mt-6 mx-auto w-full font-bold  hover:bg-[#354f52] hover:text-[#cad2c5]"
        />
      </form>
    </div>
  );
};

export default AddSpecialOffers;
