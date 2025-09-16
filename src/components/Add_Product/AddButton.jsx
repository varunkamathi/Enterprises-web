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

      if (!response.ok) throw new Error("Failed to add product");

      setShowModal(false);
      resetForm();

      // Refresh product list
      onProductAdded();
    } catch (err) {
      alert(err.message);
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
            className="absolute inset-0 backdrop-blur-sm bg-opacity-50"
            onClick={() => {
              setShowModal(false);
              resetForm();
            }}
          ></div>

          {/* Modal content */}
          <div className="relative bg-white p-6 rounded-lg w-96 shadow-lg z-10">
            <h2 className="text-xl font-bold mb-4">Add Product</h2>

            <form onSubmit={handleAddProduct} className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="border w-full px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Category"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                className="border w-full px-3 py-2 rounded"
                required
              />
              <textarea
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                className="border w-full px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Size / Weight"
                value={newProduct.sizeOrWeight}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    sizeOrWeight: e.target.value,
                  })
                }
                className="border w-full px-3 py-2 rounded"
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
                className="border w-full px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newProduct.imageUrl}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, imageUrl: e.target.value })
                }
                className="border w-full px-3 py-2 rounded"
              />

              {/* Buttons */}
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 rounded bg-gray-400 hover:bg-gray-500 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
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
