import React, { useEffect, useState } from "react";
import AddProductButton from "../components/Add_Product/AddButton";
import { FaTrash } from "react-icons/fa"; // trash bin icon

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete product by ID
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

  // Filter products by search
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100 w-full p-6">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header with Search + Add Button */}
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

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white shadow-md rounded-lg p-4 relative"
            >
              {/* Delete Button */}
              <button
                onClick={() => handleDelete(p.id)}
                className="absolute top-3 right-3 text-red-600 hover:text-red-800"
              >
                <FaTrash />
              </button>

              {/* Product Image */}
              <img
                src={
                  p.imageUrl
                    ? p.imageUrl
                    : "https://via.placeholder.com/300x200?text=No+Image"
                }
                alt={p.name}
                className="w-full h-40 object-cover rounded"
              />

              {/* Product Info */}
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
              <p className="text-xs text-gray-500 mt-2">
                Created By: {p.createdBy || "system"}
              </p>
              <p className="text-xs text-gray-500">
                {p.createdAt
                  ? new Date(p.createdAt).toLocaleString()
                  : "Not available"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
