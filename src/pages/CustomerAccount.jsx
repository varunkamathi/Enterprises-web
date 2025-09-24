import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const CustomerAccount = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  // Edit Modal state
  const [showModal, setShowModal] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Fetch customers
  const fetchCustomers = async () => {
    try {
      const response = await fetch(`${API_URL}/customerAccount`);
      if (!response.ok) throw new Error("Failed to fetch customers");
      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete customer
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    try {
      const response = await fetch(`${API_URL}/customers/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete customer");
      fetchCustomers();
    } catch (err) {
      alert(err.message);
    }
  };

  // Open edit modal
  const handleEdit = (customer) => {
    setEditCustomer(customer);
    setShowModal(true);
  };

  // Update customer
  const handleUpdateCustomer = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/customers/${editCustomer.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editCustomer),
      });

      if (!response.ok) throw new Error("Failed to update customer");

      setShowModal(false);
      setEditCustomer(null);
      fetchCustomers();
    } catch (err) {
      alert(err.message);
    }
  };

  // Loading state
  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );

  // Error state
  if (error)
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        Error: {error}
      </div>
    );

  // Search filter
  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100 w-full p-6">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-800 px-3 py-2 w-1/2 rounded-4xl"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCustomers.map((c) => (
            <div
              key={c.id}
              className="relative group bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              {/* Info */}
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2">{c.name}</h2>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">Email:</span> {c.email}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">Phone:</span> {c.phone}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">Address:</span> {c.address || "—"}
                </p>
              </div>

              {/* Hover Actions */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 gap-3">
                <button
                  onClick={() => handleEdit(c)}
                  className="p-3 rounded-full bg-white shadow hover:scale-110 transition"
                >
                  <FaEdit className="text-blue-600" />
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="p-3 rounded-full bg-white shadow hover:scale-110 transition"
                >
                  <FaTrash className="text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {showModal && editCustomer && (
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
                setEditCustomer(null);
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
                ✏️ Edit Customer
              </h2>

              <form onSubmit={handleUpdateCustomer} className="space-y-4">
                <input
                  type="text"
                  placeholder="Customer Name"
                  value={editCustomer.name}
                  onChange={(e) =>
                    setEditCustomer({ ...editCustomer, name: e.target.value })
                  }
                  className="border border-gray-300 w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={editCustomer.email}
                  onChange={(e) =>
                    setEditCustomer({ ...editCustomer, email: e.target.value })
                  }
                  className="border border-gray-300 w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />

                <input
                  type="text"
                  placeholder="Phone"
                  value={editCustomer.phone}
                  onChange={(e) =>
                    setEditCustomer({ ...editCustomer, phone: e.target.value })
                  }
                  className="border border-gray-300 w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                <textarea
                  placeholder="Address"
                  value={editCustomer.address}
                  onChange={(e) =>
                    setEditCustomer({ ...editCustomer, address: e.target.value })
                  }
                  className="border border-gray-300 w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditCustomer(null);
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

export default CustomerAccount;
