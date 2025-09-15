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

      // Refresh list
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

  // Filter products
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
        <div className="flex justify-between items-center mb-4 bg-transparent">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-800 px-3 py-2 w-1/2 rounded-4xl"
          />
          {/* Pass fetchProducts to refresh list */}
          <AddProductButton onProductAdded={fetchProducts} />
        </div>

        {/* Table */}
        <table className="w-full border border-gray-300 bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Size / Weight</th>
              <th className="p-2 border">Unit</th>
              <th className="p-2 border">Total Quantity</th>
              <th className="p-2 border">Created By</th>
              <th className="p-2 border">Created At</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p.id} className="text-center">
                <td className="p-2 border">{p.id}</td>
                <td className="p-2 border">{p.name}</td>
                <td className="p-2 border">{p.category}</td>
                <td className="p-2 border">{p.description}</td>
                <td className="p-2 border">{p.status}</td>
                <td className="p-2 border">{p.sizeOrWeight}</td>
                <td className="p-2 border">{p.unitOfMeasure}</td>
                <td className="p-2 border">{p.totalQuantity}</td>
                <td className="p-2 border">{p.createdBy}</td>
                <td className="p-2 border">
                  {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;
