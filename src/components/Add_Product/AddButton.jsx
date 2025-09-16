import React, { useState } from "react";

const AddProductButton = ({ onProductAdded }) => {
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    description: "",
    status: "AVAILABLE",
    sizeOrWeight: "",
    unitOfMeasure: "PIECES",
    totalQuantity: 0,
    imageUrl: "", // ✅ added image
  });

  // Reset form
  const resetForm = () => {
    setNewProduct({
      name: "",
      category: "",
      description: "",
      status: "AVAILABLE",
      sizeOrWeight: "",
      unitOfMeasure: "PIECES",
      totalQuantity: 0,
      imageUrl: "",
    });
  };

  // Handle Add Product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    const payload = {
      ...newProduct,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "system",
      updatedBy: "system",
    };

    try {
      const response = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
  const errorText = await response.text();
  throw new Error(`Failed to add product: ${errorText}`);
}

      setShowModal(false);
      resetForm();

      // Refresh product list
      onProductAdded();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      {/* Add Button */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-3xl shadow"
      >
        + Add Product
      </button>

      {/* Modal */}
 {showModal && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    {/* Overlay */}
    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      onClick={() => {
        setShowModal(false);
        resetForm();
      }}
    ></div>

    {/* Modal Content */}
    <div className="relative bg-white/95 p-6 rounded-2xl w-[500px] max-w-lg shadow-2xl z-10 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-5 text-center">
        ➕ Add New Product
      </h2>

      <form onSubmit={handleAddProduct} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="border border-gray-300 w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
        <select
  value={newProduct.category}
  onChange={(e) =>
    setNewProduct({ ...newProduct, category: e.target.value })
  }
  className="border border-gray-300 w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
  required
>
  <option value="">Select Category</option>
  <option value="STATIONARY">STATIONARY</option>
  <option value="GROCERY">GROCERY</option>
  <option value="GENERAL_STORE">GENERAL STORE</option>
</select>

        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          className="border border-gray-300 w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Size / Weight"
          value={newProduct.sizeOrWeight}
          onChange={(e) =>
            setNewProduct({ ...newProduct, sizeOrWeight: e.target.value })
          }
          className="border border-gray-300 w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          type="number"
          placeholder="Total Quantity"
          value={newProduct.totalQuantity}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              totalQuantity: Number(e.target.value),
            })
          }
          className="border border-gray-300 w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.imageUrl}
          onChange={(e) =>
            setNewProduct({ ...newProduct, imageUrl: e.target.value })
          }
          className="border border-gray-300 w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={() => {
              setShowModal(false);
              resetForm();
            }}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium shadow-md hover:from-blue-600 hover:to-blue-800 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
)}


    </>
  );
};

export default AddProductButton;
