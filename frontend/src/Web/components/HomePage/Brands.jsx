import React from "react";

function Brands() {
  const brands = [
    {
      id: 1,
      name: "Apple",
      logo: "https://cdn-icons-png.flaticon.com/512/0/747.png",
    },
    {
      id: 2,
      name: "Samsung",
      logo: "https://cdn-icons-png.flaticon.com/512/882/882640.png",
    },
    {
      id: 3,
      name: "Nike",
      logo: "https://cdn-icons-png.flaticon.com/512/732/732084.png",
    },
    {
      id: 4,
      name: "Adidas",
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968774.png",
    },
    {
      id: 5,
      name: "Sony",
      logo: "https://cdn-icons-png.flaticon.com/512/5969/5969020.png",
    },
    {
      id: 6,
      name: "Puma",
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
    },
  ];

  return (
    <section className="relative overflow-hidden w-full py-24 px-6 bg-[#f8fafc]">

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gray-300 rounded-full blur-3xl opacity-20"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gray-400 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">

        {/* Heading */}
        <div className="text-center mb-16">

          <span className="text-sm font-medium tracking-[0.3em] uppercase text-gray-500">
            Trusted Partners
          </span>

          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mt-3">
            Popular Brands
          </h2>

          <p className="text-gray-600 mt-4 text-lg">
            Shop from the world's most loved brands
          </p>

        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">

          {brands.map((brand) => (

            <div
              key={brand.id}
              className="
                group
                bg-sky-200
                border
                border-gray-100
                rounded-3xl
                p-8
                flex
                flex-col
                items-center
                justify-center
                cursor-pointer
                transition-all
                duration-500
                hover:-translate-y-3
                hover:border-gray-300
                hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]
              "
            >

              {/* Logo Box */}
              <div
                className="
                  w-24
                  h-24
                  flex
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gray-50
                  transition-all
                  duration-300
                  group-hover:bg-gray-100
                "
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="
                    w-14
                    h-14
                    object-contain
                    transition-all
                    duration-300
                    group-hover:scale-110
                  "
                />
              </div>

              {/* Brand Name */}
              <h3
                className="
                  mt-5
                  text-lg
                  font-semibold
                  text-gray-800
                  group-hover:text-black
                "
              >
                {brand.name}
              </h3>

              {/* Hover Text */}
              <p
                className="text-gray-600
                "
              >
                Explore Products →
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Brands;
