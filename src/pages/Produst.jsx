import React, { useEffect, useState } from "react";

const Produst = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch stocks");
        }
        const data = await response.json();
        setStocks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="flex min-h-screen items-center justify-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 w-full p-6">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Stock List</h1>
        <table className="w-full border border-gray-300 bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Batch No.</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Purchase Price</th>
              <th className="p-2 border">Selling Price</th>
              <th className="p-2 border">MRP</th>
              <th className="p-2 border">Product Name</th>
              <th className="p-2 border">Supplier</th>
              <th className="p-2 border">Expiry</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.id} className="text-center">
                <td className="p-2 border">{stock.id}</td>
                <td className="p-2 border">{stock.batchNumber}</td>
                <td className="p-2 border">{stock.quantity}</td>
                <td className="p-2 border">{stock.purchasePrice}</td>
                <td className="p-2 border">{stock.sellingPrice}</td>
                <td className="p-2 border">{stock.mrp}</td>
                <td className="p-2 border">{stock.productName}</td>
                <td className="p-2 border">{stock.supplierName}</td>
                <td className="p-2 border">{stock.expiryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Produst;
