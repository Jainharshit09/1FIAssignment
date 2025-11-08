import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-neutral-50">
          <div className="text-center space-y-4">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-neutral-200 border-t-neutral-900" />
            <p className="text-neutral-500 font-medium text-sm">Loading products...</p>
          </div>
        </div>
      </>
    );
  }

  if (!products.length) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-neutral-50">
          <p className="text-neutral-500 text-lg">No products available</p>
        </div>
      </>
    );
  }

  return (
    <div className="bg-gradient-to-b from-neutral-50 to-white min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="text-center py-24 sm:py-32 md:py-36 bg-gradient-to-b from-white to-neutral-50 border-b border-neutral-200/50">
        <div className="max-w-4xl mx-auto space-y-6 px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-neutral-900 tracking-tight leading-tight">
            Discover Our Products
          </h1>
          <p className="text-lg sm:text-xl text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            Explore our curated selection of premium tech with flexible EMI options.
          </p>
          <div className="pt-4">
            <a
              href="#products"
              className="inline-block border border-neutral-900 text-neutral-900 px-5 py-2 rounded-full text-xs font-medium hover:bg-neutral-900 hover:text-white transition-all duration-300"
            >
              Shop Now
            </a>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <main
        id="products"
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 xl:px-12 py-16 sm:py-20 md:py-24"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.map((p) => {
            const variant = p.variants?.[0];
            const price = variant?.price || 0;
            const mrp = variant?.mrp || price;
            const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

            return (
              <Link
                key={p.slug}
                to={`/products/${p.slug}`}
                className="group"
              >
                <div className="bg-white rounded-[28px] overflow-hidden border border-neutral-200/70 shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1 flex flex-col">

                  {/* Product Image */}
                  <div className="relative bg-neutral-50 aspect-square flex items-center justify-center">
                    {discount > 0 && (
                      <div className="absolute top-4 right-4 bg-neutral-900 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                        {discount}% OFF
                      </div>
                    )}
                    <img
                      src={variant?.image || "https://via.placeholder.com/400"}
                      alt={p.name}
                      className="w-4/5 h-4/5 object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col flex-grow p-6">
                    <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest mb-1">
                      {p.brand}
                    </p>

                    <h2 className="text-lg font-medium text-neutral-900 mb-2 leading-tight group-hover:text-neutral-700 transition-colors duration-300">
                      {p.name}
                    </h2>

                    <div className="mt-auto pt-3 border-t border-neutral-100">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                        <span className="text-2xl font-semibold text-neutral-900">
                          ₹{price.toLocaleString()}
                        </span>
                        {mrp > price && (
                          <span className="text-sm text-neutral-400 line-through">
                            ₹{mrp.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-500 font-normal mt-1">
                        Starting from
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
