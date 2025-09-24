import React, { useEffect, useState } from "react";
import AddProductButton from "../components/Add_Product/AddButton";
import { FaTrash, FaEdit } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion"; // Add animation library
import Products from "../assets/product.png";

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
      const response = await fetch(`${API_URL}/products/${id}`, {
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
        `${API_URL}/products/${editProduct.id}`,
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

  // Category Color Map
  const categoryColors = {
    STATIONARY: "bg-orange-500",
    GROCERY: "bg-green-500",
    GENERAL_STORE: "bg-blue-500",
  };

  // Simple status badge mapping
  const statusColors = {
    New: "bg-red-500",
    "In Stock": "bg-green-600",
    Out: "bg-gray-500",
    Hot: "bg-yellow-400",
  };

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="relative group bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              {/* Category badge */}
              <span
                className={`absolute top-3 left-3 text-xs px-2 py-1 rounded-full text-white font-semibold ${
                  categoryColors[p.category] || "bg-gray-400"
                }`}
              >
                {p.category}
              </span>
              {/* Status badge */}
              <span
                className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-full text-white font-semibold ${
                  statusColors[p.status] || "bg-gray-400"
                }`}
              >
                {p.status}
              </span>

              {/* Image with hover overlay */}
              <div className="relative h-40 w-full overflow-hidden">
              <img
  src={p.imageUrl ? p.imageUrl : Products}
  alt={p.name}
  className="w-full h-full object-cover rounded transition-scale"
  onError={(e) => {
    e.currentTarget.onerror = null; // prevent infinite loop
    e.currentTarget.src = Products;
  }}
/> 
                 

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 gap-3">
                  <button
                    onClick={() => handleEdit(p)}
                    className="p-3 rounded-full bg-white shadow hover:scale-110 transition"
                  >
                    <FaEdit className="text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="p-3 rounded-full bg-white shadow hover:scale-110 transition"
                  >
                    <FaTrash className="text-red-600" />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
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
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal - with Framer Motion for animation */}
      <AnimatePresence>
        {showModal && editProduct && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => {
                setShowModal(false);
                setEditProduct(null);
              }}
            ></div>

            {/* Modal Content */}
            <motion.div
              className="relative bg-white/95 p-6 rounded-2xl w-[500px] max-w-lg shadow-2xl z-10 border border-gray-200"
              initial={{ y: -40, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Product;
