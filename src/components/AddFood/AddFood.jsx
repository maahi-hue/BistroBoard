const AddFood = () => {
  return (
    <div className="w-11/12 mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Add Foods</h1>

      <form>
        <div className="md:flex gap-6 w-10/12 mx-auto">
          <div className="space-y-3 w-full">
            <label className="input input-bordered flex items-center gap-2">
              Food Image
              <input
                type="text"
                name="image"
                className="grow"
                placeholder="Image URL: https://example.com/image.jpg"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Food Name
              <input
                type="text"
                name="name"
                className="grow"
                placeholder="Pitha"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Food Category
              <input
                type="text"
                name="category"
                className="grow"
                placeholder="Dessert"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              quantity
              <input
                type="text"
                name="quantity"
                className="grow"
                placeholder="50"
              />
            </label>
          </div>
          <div className="space-y-3 w-full">
            <label className="input input-bordered flex items-center gap-2">
              Food Origin
              <input
                type="text"
                name="origin"
                className="grow"
                placeholder="Bangladesh"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              description
              <input
                type="text"
                name="description"
                className="grow"
                placeholder="ingredients, making procedure, etc"
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              User Email
              <input
                type="email"
                name="userEmail"
                className="grow bg-gray-200"
                readOnly
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              User Name
              <input
                type="text"
                name="userName"
                className="grow bg-gray-200"
                readOnly
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
              className="grow"
              placeholder="340TK"
            />
          </label>
        </div>
        <input
          type="submit"
          value="Add Equipment"
          className="btn my-6 block mx-auto w-10/12 hover:bg-[#354f52] hover:text-[#cad2c5] font-bold"
        />
      </form>
    </div>
  );
};

export default AddFood;
