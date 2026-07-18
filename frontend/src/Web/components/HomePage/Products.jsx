import React, { useState } from "react";
import FilterSort from "./FilterSort";
import ProductCard from "./ProductCard";


const products = [
  {
    id: 1,
    name: "iPhone 16 Pro",
    price: 119999,
    category: "Mobiles",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
  },
  {
    id: 2,
    name: "Nike Air Max",
    price: 7999,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 5999,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
  },
];


function Products() {

  const [selectedCategory, setSelectedCategory] = useState("");

  const [priceRange, setPriceRange] = useState("");

  const [sortBy, setSortBy] = useState("");



  let filteredProducts = products.filter((product)=>{


    // Category Filter
    if(
      selectedCategory &&
      product.category !== selectedCategory
    ){
      return false;
    }



    // Price Filter
    if(priceRange === "5000" && product.price > 5000){
      return false;
    }


    if(
      priceRange === "20000" &&
      (product.price < 5000 || product.price > 20000)
    ){
      return false;
    }


    if(
      priceRange === "50000" &&
      (product.price < 20000 || product.price > 50000)
    ){
      return false;
    }


    if(
      priceRange === "50001" &&
      product.price < 50000
    ){
      return false;
    }


    return true;

  });



  // Sorting
  if(sortBy === "low"){
    filteredProducts.sort(
      (a,b)=>a.price-b.price
    );
  }


  if(sortBy === "high"){
    filteredProducts.sort(
      (a,b)=>b.price-a.price
    );
  }




  return (
    <section className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold text-center mb-8">
        Featured Products
      </h1>



      <FilterSort

        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}

        priceRange={priceRange}
        setPriceRange={setPriceRange}

        sortBy={sortBy}
        setSortBy={setSortBy}

      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {
          filteredProducts.length > 0 ?

          filteredProducts.map((product)=>(
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
          :
          <h2 className="text-center col-span-4 text-xl">
            No Products Found
          </h2>
        }
      </div>
    </section>
  );
}


export default Products;