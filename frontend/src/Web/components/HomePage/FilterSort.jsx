import React from "react";
import {
  FaFilter,
  FaTags,
  FaRupeeSign,
  FaSortAmountDown,
} from "react-icons/fa";

function FilterSort({
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gray-200 shadow-xl p-6 md:p-8 mb-10">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center">
          <FaFilter />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Filter Products
          </h2>

          <p className="text-gray-500 text-sm">
            Find products faster with smart filters
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Category */}
        <div className="bg-gray-100 border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-all">
          <label className="flex items-center gap-2 text-sm font-semibold mb-3 text-gray-700">
            <FaTags />
            Category
          </label>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">All Categories</option>

            {categories.map((category) => (
              <option
                key={category._id}
                value={category.name}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-all">
          <label className="flex items-center gap-2 text-sm font-semibold mb-3 text-gray-700">
            <FaRupeeSign />
            Price Range
          </label>

          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">All Prices</option>
            <option value="5000">Under ₹5,000</option>
            <option value="20000">₹5,000 - ₹20,000</option>
            <option value="50000">₹20,000 - ₹50,000</option>
            <option value="50001">Above ₹50,000</option>
          </select>
        </div>

        {/* Sort */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-all">
          <label className="flex items-center gap-2 text-sm font-semibold mb-3 text-gray-700">
            <FaSortAmountDown />
            Sort By
          </label>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Popularity</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>

      </div>

      {/* Active Filters */}
      <div className="flex flex-wrap gap-3 mt-8">

        {selectedCategory && (
          <span className="px-4 py-2 rounded-full bg-black text-white text-sm">
            {
              categories.find(
                (cat) => cat._id === selectedCategory
              )?.name
            }
          </span>
        )}

        {priceRange && (
          <span className="px-4 py-2 rounded-full bg-gray-800 text-white text-sm">
            Price Filter
          </span>
        )}

        {sortBy && (
          <span className="px-4 py-2 rounded-full bg-gray-700 text-white text-sm">
            {sortBy === "low"
              ? "Low → High"
              : "High → Low"}
          </span>
        )}

      </div>

    </div>
  );
}

export default FilterSort;