import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { calculateMonthlyPayment } from "../utils/emi";
import Header from "../components/Header";

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setSelectedVariant(data.variants[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-neutral-200 border-t-emerald-500 mb-4"></div>
            <p className="text-neutral-600 font-medium text-sm sm:text-base">Loading product...</p>
          </div>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
          <div className="text-center">
            <p className="text-neutral-600 text-base sm:text-lg mb-4">Product not found</p>
            <Link
              to="/"
              className="text-emerald-600 hover:text-emerald-700 font-medium text-sm sm:text-base"
            >
              Return to products
            </Link>
          </div>
        </div>
      </>
    );
  }

  const handleVariantChange = (variant) => setSelectedVariant(variant);

  const totalPayment =
    selectedPlan &&
    (
      calculateMonthlyPayment(
        selectedVariant.price,
        selectedPlan.tenureMonths,
        selectedPlan.annualInterestRate
      ) * selectedPlan.tenureMonths
    ).toFixed(2);

  const discount =
    selectedVariant.mrp > selectedVariant.price
      ? Math.round(
          ((selectedVariant.mrp - selectedVariant.price) /
            selectedVariant.mrp) *
            100
        )
      : 0;

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-3 sm:py-4 md:py-5">
          <nav className="flex items-center space-x-2 sm:space-x-2.5 text-xs sm:text-sm text-neutral-600 overflow-x-auto">
            <Link
              to="/"
              className="hover:text-neutral-900 transition-colors duration-200 font-medium whitespace-nowrap"
            >
              Home
            </Link>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-900 font-semibold truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20">
        <motion.div
          className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg sm:shadow-xl lg:shadow-2xl border border-neutral-200/60 sm:border-2 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-16">
            {/* Left: Product Image */}
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              <div className="relative bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-50 rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden aspect-square shadow-lg sm:shadow-xl lg:shadow-2xl">
                {discount > 0 && (
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6 lg:top-8 lg:left-8 z-10 bg-emerald-500 text-white text-xs sm:text-sm md:text-base font-extrabold px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-3 rounded-full shadow-lg sm:shadow-xl lg:shadow-2xl">
                    {discount}% OFF
                  </div>
                )}
                <motion.img
                  key={selectedVariant.image}
                  src={selectedVariant.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 2xl:p-20"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            {/* Right: Product Details */}
            <div className="flex flex-col space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 xl:space-y-10">
              {/* Brand & Name */}
              <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                <p className="text-xs sm:text-sm md:text-base font-extrabold text-emerald-600 uppercase tracking-wider sm:tracking-widest">
                  {product.brand}
                </p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold text-neutral-900 tracking-tight leading-tight sm:leading-none">
                  {product.name}
                </h1>
              </div>

              {/* Price */}
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-4 md:gap-6 pb-4 sm:pb-5 md:pb-6 lg:pb-8 border-b sm:border-b-2 border-neutral-200">
                <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-neutral-900">
                  ₹{selectedVariant.price.toLocaleString()}
                </span>
                {selectedVariant.mrp !== selectedVariant.price && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-neutral-400 line-through font-bold">
                      ₹{selectedVariant.mrp.toLocaleString()}
                    </span>
                    <span className="text-xs sm:text-sm md:text-base font-extrabold text-emerald-600 bg-emerald-50 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-lg sm:rounded-xl w-fit">
                      Save ₹{(selectedVariant.mrp - selectedVariant.price).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Variants */}
              <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                <h3 className="text-xs sm:text-sm md:text-base font-extrabold text-neutral-900 uppercase tracking-wider sm:tracking-widest">
                  Choose Variant
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                  {product.variants.map((v) => (
                    <button
                      key={v.sku}
                      onClick={() => handleVariantChange(v)}
                      className={`px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-4 rounded-lg sm:rounded-xl lg:rounded-2xl border-2 text-xs sm:text-sm md:text-base font-bold transition-all duration-200 ${
                        v.sku === selectedVariant.sku
                          ? "bg-emerald-500 text-white border-emerald-500 shadow-lg sm:shadow-xl scale-105 sm:scale-110"
                          : "bg-white border-neutral-300 text-neutral-700 hover:border-emerald-400 hover:text-emerald-600 hover:shadow-md sm:hover:shadow-lg hover:scale-105"
                      }`}
                    >
                      {v.attributes.storage} • {v.attributes.color}
                    </button>
                  ))}
                </div>
              </div>

              {/* EMI Plans */}
              <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                <h3 className="text-xs sm:text-sm md:text-base font-extrabold text-neutral-900 uppercase tracking-wider sm:tracking-widest">
                  EMI Options Backed by Mutual Funds
                </h3>
                <div className="space-y-3 sm:space-y-4 md:space-y-5 max-h-[300px] sm:max-h-[350px] md:max-h-[400px] overflow-y-auto pr-2 sm:pr-3 md:pr-4 custom-scrollbar">
                  {product.emiPlans.map((plan) => {
                    const monthly = calculateMonthlyPayment(
                      selectedVariant.price,
                      plan.tenureMonths,
                      plan.annualInterestRate
                    );
                    const isSelected = selectedPlan?.name === plan.name;
                    return (
                      <motion.div
                        key={plan.name}
                        whileHover={{ scale: 1.01, x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedPlan(plan)}
                        className={`cursor-pointer rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 border-2 transition-all duration-200 ${
                          isSelected
                            ? "bg-emerald-50 border-emerald-500 shadow-lg sm:shadow-xl"
                            : "border-neutral-200 bg-white hover:border-emerald-300 hover:shadow-md sm:hover:shadow-lg"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 md:gap-6">
                          <div className="flex-1 space-y-1 sm:space-y-2 md:space-y-3">
                            <p
                              className={`text-sm sm:text-base md:text-lg font-extrabold ${
                                isSelected
                                  ? "text-emerald-900"
                                  : "text-neutral-900"
                              }`}
                            >
                              {plan.name}
                            </p>
                            <p className="text-xs sm:text-sm md:text-base text-neutral-600 font-medium sm:font-semibold">
                              {plan.tenureMonths} months •{" "}
                              {plan.annualInterestRate}% interest rate
                            </p>
                            {plan.cashback?.enabled && (
                              <p className="text-emerald-600 text-xs sm:text-sm md:text-base font-extrabold mt-1 sm:mt-2 md:mt-3 flex items-center gap-1 sm:gap-2">
                                🎁 Cashback: ₹{plan.cashback.amount}
                              </p>
                            )}
                          </div>
                          <div className="text-left sm:text-right">
                            <p
                              className={`text-2xl sm:text-3xl md:text-4xl font-extrabold ${
                                isSelected
                                  ? "text-emerald-600"
                                  : "text-neutral-900"
                              }`}
                            >
                              ₹{monthly.toFixed(0)}
                            </p>
                            <p className="text-xs sm:text-sm text-neutral-500 mt-1 sm:mt-2 font-medium sm:font-semibold">
                              per month
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Total Payable */}
              {selectedPlan && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-emerald-50 to-neutral-50 border-2 border-emerald-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
                    <div className="space-y-1 sm:space-y-2">
                      <p className="text-sm sm:text-base md:text-lg font-extrabold text-neutral-700">
                        Total Payable
                      </p>
                      <p className="text-xs sm:text-sm md:text-base text-neutral-500 font-medium sm:font-semibold">
                        Over {selectedPlan.tenureMonths} months
                      </p>
                    </div>
                    <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900">
                      ₹{Number(totalPayment).toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (!selectedPlan)
                    return alert("Please select an EMI plan first!");
                  alert(
                    `✅ Selected ${selectedPlan.name}\nTotal Payable: ₹${totalPayment}`
                  );
                }}
                className={`mt-2 sm:mt-4 py-3 sm:py-4 md:py-5 lg:py-6 w-full font-extrabold text-sm sm:text-base md:text-lg lg:text-xl rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl transition-all duration-200 ${
                  selectedPlan
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                    : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                }`}
                disabled={!selectedPlan}
              >
                {selectedPlan
                  ? `Proceed with ${selectedPlan.name}`
                  : "Select an EMI Plan to Continue"}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
