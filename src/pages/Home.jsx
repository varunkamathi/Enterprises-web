import React from 'react'

const Home = () => {
  return (
      <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-4">
          <a href="#" className="block text-gray-700 hover:text-blue-600">
            Buyers
          </a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">
            Products
          </a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Overview</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h2 className="text-xl font-semibold">Total Buyers</h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">150</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h2 className="text-xl font-semibold">Total Products</h2>
            <p className="text-3xl font-bold text-green-600 mt-2">200</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h2 className="text-xl font-semibold">Access to Buy</h2>
            <p className="text-3xl font-bold text-purple-600 mt-2">75</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            View Buyers
          </button>
          <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50">
            View Products
          </button>
        </div>
      </main>
    </div>
  )
}

export default Home