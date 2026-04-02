"use client";

import { useEffect, useState } from "react";
import { Star, User, Package, MessageSquare, Sparkles, Search, ChevronDown, } from "lucide-react";

import { Queries } from "../../Api/Queries";

import {
  CommonFormActions,
  CommonFormCard,
  CommonInput,
  CommonPageHeaderForm,
} from "../common/commonForm";

const RatingFormPage = ({ onBack, onSubmit, initialValues }: any) => {
  const [form, setForm] = useState({
    productId: "",
    firstName: "",
    lastName: "",
    email: "",
    description: "",
    starRating: 0,
  });

  const [errors, setErrors] = useState<any>({});
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const isEdit = !!initialValues;

  const { data } = Queries.useGetProductDropdown({}, true);
interface ProductOption {
  label: string;
  value: string;
}
  const products =
    data?.data?.product_data?.map((p: any) => ({
      label: p.name,
      value: p._id,
      image: p.image || null,
      category: p.category || "Product"
    })) || [];

  // Find selected product
const selectedProduct = products.find(
  (p: ProductOption) => p.value === form.productId
);

const filteredProducts = products.filter(
  (product: ProductOption) =>
    product.label.toLowerCase().includes(searchTerm.toLowerCase())
);
  useEffect(() => {
    if (initialValues) {
      setForm({
        productId: initialValues.productId || "",
        firstName: initialValues.firstName || "",
        lastName: initialValues.lastName || "",
        email: initialValues.email || "",
        description: initialValues.description || "",
        starRating: initialValues.starRating || 0,
      });
    }
  }, [initialValues]);

  const validate = () => {
    let newErrors: any = {};

    if (!form.productId) newErrors.productId = "Please select a product";
    if (!form.firstName) newErrors.firstName = "First name is required";
    if (!form.lastName) newErrors.lastName = "Last name is required";
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!form.starRating) newErrors.starRating = "Please select a rating";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit(form);
  };

  const ratingLabels = {
    1: "Very Poor",
    2: "Poor",
    3: "Average",
    4: "Good",
    5: "Excellent"
  };

  const handleSelectProduct = (product: any) => {
    setForm({ ...form, productId: product.value });
    setIsProductDropdownOpen(false);
    setSearchTerm("");
  };

  return (
    <CommonFormCard>
      <CommonPageHeaderForm
        title={isEdit ? "Edit Rating" : "Create Rating"}
        description="Share your experience and help others make informed decisions"
        onBack={onBack}
      />

      <div className="p-8 space-y-8 bg-gradient-to-br from-white to-gray-50">
        {/* Product Selection Section - A1 Style */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-primary-10 rounded-lg">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Product Information</h3>
          </div>
          
          {/* Custom Product Select - Premium UI */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Product <span className="text-red-500">*</span>
            </label>
            
            {/* Dropdown Trigger Button */}
            <button
              type="button"
              onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
            
            className="w-full px-4 py-3 text-left input-primary"
            >
              <div className="flex items-center justify-between">
                {selectedProduct ? (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary-gradient">
                      {selectedProduct.image ? (
                        <img src={selectedProduct.image} alt="" className="w-6 h-6 object-contain" />
                      ) : (
                        <Package className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium text-gray-900">{selectedProduct.label}</span>
                      <span className="text-xs text-gray-500">{selectedProduct.category}</span>
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-500">Choose a product to review</span>
                )}
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isProductDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>
            
            {/* Dropdown Menu */}
            {isProductDropdownOpen && (
              <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Search Bar */}
                <div className="p-3 border-b border-gray-100">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                     className="w-full input-primary"
                      autoFocus
                    />
                  </div>
                </div>
                
                {/* Products List */}
                <div className="max-h-80 overflow-y-auto">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product : any) => (
                      <button
                        key={product.value}
                        type="button"
                        onClick={() => handleSelectProduct(product)}
                    className={`w-full text-left px-4 py-5 transition-colors duration-150 flex items-center gap-3 border-b border-gray-50 last:border-0 hover-primary ${
    form.productId === product.value ? "selected-primary" : ""
  }`}
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          {product.image ? (
                            <img src={product.image} alt="" className="w-6 h-6 object-contain" />
                          ) : (
                            <Package className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">{product.label}</p>
                          <p className="text-xs text-gray-500">{product.category}</p>
                        </div>
                        {form.productId === product.value && (
                          <div className="w-2 h-2 bg-primary-10  rounded-full"></div>

                          
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center">
                      <Package className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No products found</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {errors.productId && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.productId}
              </p>
            )}
          </div>
        </div>

        {/* Rating Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2  bg-primary-10 rounded-lg">
              <Star className="w-5 h-5  bg-primary-10" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Your Rating</h3>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Rate your experience *
            </label>
            
            <div className="flex flex-col gap-4">
              <div className="flex gap-3 items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setForm({ ...form, starRating: star })}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110 focus:outline-none"
                  >
                    <Star
                      size={36}
                      className={
                        star <= (hoveredRating || form.starRating)
                          ? "star-primary cursor-pointer transition-all duration-200"
                          : "text-gray-300 cursor-pointer transition-all duration-200 hover:text-yellow-400"
                      }
                    />
                  </button>
                ))}
              </div>
              
              {form.starRating > 0 && (
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-gray-700">
                    {ratingLabels[form.starRating as keyof typeof ratingLabels]}
                  </span>
                </div>
              )}
            </div>
            
            {errors.starRating && (
              <p className="text-red-500 text-sm mt-3 flex items-center gap-1">
                <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.starRating}
              </p>
            )}
          </div>
        </div>

        {/* Reviewer Information Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <User className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Reviewer Details</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <CommonInput
              label="First Name"
              required
              value={form.firstName}
              error={errors.firstName}
              placeholder="Enter first name"
              onChange={(val) => setForm({ ...form, firstName: val })}
            />
            
            <CommonInput
              label="Last Name"
              required
              value={form.lastName}
              error={errors.lastName}
              placeholder="Enter last name"
              onChange={(val) => setForm({ ...form, lastName: val })}
            />
          </div>
          
          <CommonInput
            label="Email Address"
            required
            type="email"
            value={form.email}
            error={errors.email}
            placeholder="your.email@example.com"
            onChange={(val) => setForm({ ...form, email: val })}
          />
        </div>

        {/* Review Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MessageSquare className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Your Review</h3>
          </div>
          
          <div className="relative">
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Tell us about your experience with this product..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
              {form.description.length} characters
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Your honest feedback helps other customers make better decisions
          </p>
        </div>

        {/* Form Actions */}
        <div className="pt-4 border-t border-gray-200">
          <CommonFormActions
            onCancel={onBack}
            onSubmit={handleSubmit}
            submitText={isEdit ? "Update Rating" : "Create Rating"}
            cancelText="Cancel"
          />
        </div>
      </div>
    </CommonFormCard>
  );
};

export default RatingFormPage;