import React, { useEffect, useState } from "react";
import AddProductButton from "../components/Add_Product/AddButton";
import { FaTrash, FaEdit } from "react-icons/fa";


const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;


  // For Edit Modal
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete product");
      fetchProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  // Open modal with selected product
  const handleEdit = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  // Save updated product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/api/products/${editProduct.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editProduct),
        }
      );

      if (!response.ok) throw new Error("Failed to update product");

      setShowModal(false);
      setEditProduct(null);
      fetchProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        Error: {error}
      </div>
    );

  // Search filter
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100 w-full p-6">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-800 px-3 py-2 w-1/2 rounded-4xl"
          />
          <AddProductButton onProductAdded={fetchProducts} />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white shadow-md rounded-lg p-4 relative"
            >
              {/* Actions */}
              <div className="absolute top-3 right-3 flex gap-3">
                <button
                  onClick={() => handleEdit(p)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </div>

              {/* Image */}
              <img
                src={
                  p.imageUrl
                    ? p.imageUrl
                    : "https://via.placeholder.com/300x200?text=No+Image"
                }
                alt={p.name}
                className="w-full h-40 object-cover rounded"
              />

              {/* Info */}
              <h2 className="text-lg font-bold mb-2">{p.name}</h2>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Category:</span> {p.category}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Description:</span>{" "}
                {p.description || "—"}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Status:</span> {p.status}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Size / Weight:</span>{" "}
                {p.sizeOrWeight || "—"}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Unit:</span> {p.unitOfMeasure}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Quantity:</span>{" "}
                {p.totalQuantity}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && editProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => {
              setShowModal(false);
              setEditProduct(null);
            }}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white/95 p-6 rounded-2xl w-[500px] max-w-lg shadow-2xl z-10 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-5 text-center">
              ✏️ Edit Product
            </h2>

            <form onSubmit={handleUpdateProduct} className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={editProduct.name}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, name: e.target.value })
                }
                className="border border-gray-300 w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />

              <select
                value={editProduct.category}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, category: e.target.value })
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
                value={editProduct.description}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    description: e.target.value,
                  })
                }
                className="border border-gray-300 w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

              <input
                type="text"
                placeholder="Size / Weight"
                value={editProduct.sizeOrWeight}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    sizeOrWeight: e.target.value,
                  })
                }
                className="border border-gray-300 w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

              <input
                type="number"
                placeholder="Total Quantity"
                value={editProduct.totalQuantity}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    totalQuantity: Number(e.target.value),
                  })
                }
                className="border border-gray-300 w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

              <input
                type="text"
                placeholder="Image URL"
                value={editProduct.imageUrl}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    imageUrl: e.target.value,
                  })
                }
                className="border border-gray-300 w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditProduct(null);
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
    </div>
  );
};

export default Product;
