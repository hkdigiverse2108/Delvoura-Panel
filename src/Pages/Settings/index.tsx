"use client";

import { useEffect, useState } from "react";
import { 
  Save, Settings as SettingsIcon, Globe, CreditCard, 
  Smartphone, MapPin, Phone, Mail, Facebook, Twitter, 
  Instagram, Linkedin, Link as LinkIcon, Key, 
  Lock, Eye, EyeOff, Share2 
} from "lucide-react";
import { Queries } from "../../Api/Queries";
import { Mutations } from "../../Api/Mutations";
import "../../../public/assets/css/setting.css";
import {  CommonInput } from "../../Components/common/commonForm";
import { SingleImageField } from "../../Components/common/uploads";

// Define types
interface SocialMediaLinks {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
}

interface SettingsForm {
  logo: string | null;
  isRazorpay: boolean;
  razorpayApiKey: string;
  razorpayApiSecret: string;
  isPhonePe: boolean;
  phonePeApiKey: string;
  phonePeApiSecret: string;
  phonePeVersion: string;
  link: string;
  address: string;
  phoneNumber: string;
  email: string;
  socialMediaLinks: SocialMediaLinks;
}

interface Errors {
  razorpayApiKey?: string;
  razorpayApiSecret?: string;
  phonePeApiKey?: string;
  phonePeApiSecret?: string;
  phonePeVersion?: string;
}

interface ApiResponse {
  _id?: string;
  logo?: string;
  isRazorpay?: boolean;
  razorpayApiKey?: string;
  razorpayApiSecret?: string;
  isPhonePe?: boolean;
  phonePeApiKey?: string;
  phonePeApiSecret?: string;
  phonePeVersion?: string | number;
  link?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  socialMediaLinks?: Partial<SocialMediaLinks>;
}

const Settings = () => {
  const { data, refetch } = Queries.useGetSettings();
  const addEditMutation = Mutations.useAddEditSettings();

  const [form, setForm] = useState<SettingsForm>({
  logo: null,
    isRazorpay: false,
    razorpayApiKey: "",
    razorpayApiSecret: "",
    isPhonePe: false,
    phonePeApiKey: "",
    phonePeApiSecret: "",
    phonePeVersion: "",
    link: "",
    address: "",
    phoneNumber: "",
    email: "",
    socialMediaLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
    },
  });

  const [errors, setErrors] = useState<Errors>({});
  const [showRazorpaySecret, setShowRazorpaySecret] = useState<boolean>(false);
  const [showPhonePeSecret, setShowPhonePeSecret] = useState<boolean>(false);

  useEffect(() => {
    if (data?.data) {
      const apiData = data.data as ApiResponse;
      
      setForm({
       logo: apiData.logo ?? null,
        isRazorpay: apiData.isRazorpay || false,
        razorpayApiKey: apiData.razorpayApiKey || "",
        razorpayApiSecret: apiData.razorpayApiSecret || "",
        isPhonePe: apiData.isPhonePe || false,
        phonePeApiKey: apiData.phonePeApiKey || "",
        phonePeApiSecret: apiData.phonePeApiSecret || "",
        phonePeVersion: apiData.phonePeVersion ? String(apiData.phonePeVersion) : "",
        link: apiData.link || "",
        address: apiData.address || "",
        phoneNumber: apiData.phoneNumber || "",
        email: apiData.email || "",
        socialMediaLinks: {
          facebook: apiData.socialMediaLinks?.facebook || "",
          twitter: apiData.socialMediaLinks?.twitter || "",
          instagram: apiData.socialMediaLinks?.instagram || "",
          linkedin: apiData.socialMediaLinks?.linkedin || "",
        },
      });
    }
  }, [data]);

  const handleChange = (key: keyof SettingsForm, value: any): void => {
    setForm({ ...form, [key]: value });
  };

  const handleSocialChange = (key: keyof SocialMediaLinks, value: string): void => {
    setForm({
      ...form,
      socialMediaLinks: {
        ...form.socialMediaLinks,
        [key]: value,
      },
    });
  };

  const validate = (): boolean => {
    let newErrors: Errors = {};
    
    if (form.isRazorpay) {
      if (!form.razorpayApiKey) newErrors.razorpayApiKey = "Razorpay API Key is required";
      if (!form.razorpayApiSecret) newErrors.razorpayApiSecret = "Razorpay API Secret is required";
    }
    
    if (form.isPhonePe) {
      if (!form.phonePeApiKey) newErrors.phonePeApiKey = "PhonePe API Key is required";
      if (!form.phonePeApiSecret) newErrors.phonePeApiSecret = "PhonePe API Secret is required";
      if (!form.phonePeVersion) newErrors.phonePeVersion = "PhonePe Version is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (): Promise<void> => {
    if (!validate()) return;
    await addEditMutation.mutateAsync(form);
    refetch();
  };

  return (
    <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8 custom-scrollbar">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 rounded-lg bg-primary-10">
              <SettingsIcon size={28} className="text-primary-dark" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-500 mt-1">Configure your website preferences and integrations</p>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="space-y-6">
          
          {/* Logo Section */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden section-card">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-light">
              <div className="flex items-center gap-2">
                <Globe size={18} className="text-primary-dark" />
                <h3 className="font-semibold text-gray-900">Brand Identity</h3>
              </div>
            </div>
            <div className="p-6">

<SingleImageField
  label="Logo"
  variant="banner"
  value={form.logo || ""}
  onChange={(url) => handleChange("logo", url)}
/>
            </div>
          </div>

          {/* Payment Gateways Section */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden section-card">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-light">
              <div className="flex items-center gap-2">
                <CreditCard size={18} className="text-primary-dark" />
                <h3 className="font-semibold text-gray-900">Payment Gateways</h3>
              </div>
            </div>
            <div className="p-6 space-y-6">
              
              {/* Razorpay */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-10 flex items-center justify-center">
                      <CreditCard size={18} className="text-primary-dark" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Razorpay</h4>
                      <p className="text-xs text-gray-500">Secure payment processing</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={form.isRazorpay}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("isRazorpay", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                
                {form.isRazorpay && (
                  <div className="grid md:grid-cols-2 gap-4 pl-14">
                    <div>
                      <CommonInput
                        label="API Key"
                        required
                        value={form.razorpayApiKey}
                        onChange={(val: string) => handleChange("razorpayApiKey", val)}
                        placeholder="rzp_live_xxxxxxxxxxxxx"
                        prefix={<Key size={16} className="text-gray-dark" />}
                        error={errors.razorpayApiKey}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        API Secret <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showRazorpaySecret ? "text" : "password"}
                          placeholder="••••••••••••••••"
                          value={form.razorpayApiSecret}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("razorpayApiSecret", e.target.value)}
                          className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-30 transition-all"
                        />
                        <Lock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-dark" />
                        <button
                          type="button"
                          onClick={() => setShowRazorpaySecret(!showRazorpaySecret)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showRazorpaySecret ? 
                            <EyeOff size={16} className="text-gray-dark" /> : 
                            <Eye size={16} className="text-gray-dark" />
                          }
                        </button>
                      </div>
                      {errors.razorpayApiSecret && (
                        <p className="text-red-500 text-xs mt-2">{errors.razorpayApiSecret}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* PhonePe */}
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-10 flex items-center justify-center">
                      <Smartphone size={18} className="text-primary-dark" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">PhonePe</h4>
                      <p className="text-xs text-gray-500">UPI payments made easy</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={form.isPhonePe}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("isPhonePe", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                
                {form.isPhonePe && (
                  <div className="grid md:grid-cols-3 gap-4 pl-14">
                    <div>
                      <CommonInput
                        label="API Key"
                        required
                        value={form.phonePeApiKey}
                        onChange={(val: string) => handleChange("phonePeApiKey", val)}
                        placeholder="phonepe_live_xxxxxxxx"
                        prefix={<Key size={16} className="text-gray-dark" />}
                        error={errors.phonePeApiKey}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        API Secret <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPhonePeSecret ? "text" : "password"}
                          placeholder="••••••••••••••••"
                          value={form.phonePeApiSecret}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("phonePeApiSecret", e.target.value)}
                          className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-30 transition-all"
                        />
                        <Lock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-dark" />
                        <button
                          type="button"
                          onClick={() => setShowPhonePeSecret(!showPhonePeSecret)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showPhonePeSecret ? 
                            <EyeOff size={16} className="text-gray-dark" /> : 
                            <Eye size={16} className="text-gray-dark" />
                          }
                        </button>
                      </div>
                      {errors.phonePeApiSecret && (
                        <p className="text-red-500 text-xs mt-2">{errors.phonePeApiSecret}</p>
                      )}
                    </div>
                    <div>
                      <CommonInput
                        label="Version"
                        required
                        value={form.phonePeVersion}
                        onChange={(val: string) => handleChange("phonePeVersion", val)}
                        placeholder="v1, v2, etc."
                        error={errors.phonePeVersion}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden section-card">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-light">
              <div className="flex items-center gap-2">
                <Globe size={18} className="text-primary-dark" />
                <h3 className="font-semibold text-gray-900">Contact Information</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <CommonInput
                    label="Website URL"
                    value={form.link}
                    onChange={(val: string) => handleChange("link", val)}
                    placeholder="https://yourwebsite.com"
                    prefix={<LinkIcon size={16} className="text-gray-dark" />}
                  />
                </div>
                <div>
                  <CommonInput
                    label="Phone Number"
                    value={form.phoneNumber}
                    onChange={(val: string) => handleChange("phoneNumber", val)}
                    placeholder="+91 98765 43210"
                    prefix={<Phone size={16} className="text-gray-dark" />}
                  />
                </div>
                <div>
                  <CommonInput
                    label="Email Address"
                    value={form.email}
                    onChange={(val: string) => handleChange("email", val)}
                    placeholder="support@yourwebsite.com"
                    prefix={<Mail size={16} className="text-gray-dark" />}
                  />
                </div>
                <div>
                  <CommonInput
                    label="Address"
                    value={form.address}
                    onChange={(val: string) => handleChange("address", val)}
                    placeholder="Your business address"
                    prefix={<MapPin size={16} className="text-gray-dark" />}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden section-card">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-light">
              <div className="flex items-center gap-2">
                <Share2 size={18} className="text-primary-dark" />
                <h3 className="font-semibold text-gray-900">Social Media Links</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <CommonInput
                    label="Facebook"
                    value={form.socialMediaLinks.facebook}
                    onChange={(val: string) => handleSocialChange("facebook", val)}
                    placeholder="https://facebook.com/yourpage"
                    prefix={<Facebook size={16} className="text-gray-dark" />}
                  />
                </div>
                <div>
                  <CommonInput
                    label="Twitter"
                    value={form.socialMediaLinks.twitter}
                    onChange={(val: string) => handleSocialChange("twitter", val)}
                    placeholder="https://twitter.com/yourhandle"
                    prefix={<Twitter size={16} className="text-gray-dark" />}
                  />
                </div>
                <div>
                  <CommonInput
                    label="Instagram"
                    value={form.socialMediaLinks.instagram}
                    onChange={(val: string) => handleSocialChange("instagram", val)}
                    placeholder="https://instagram.com/yourprofile"
                    prefix={<Instagram size={16} className="text-gray-dark" />}
                  />
                </div>
                <div>
                  <CommonInput
                    label="LinkedIn"
                    value={form.socialMediaLinks.linkedin}
                    onChange={(val: string) => handleSocialChange("linkedin", val)}
                    placeholder="https://linkedin.com/company/yourcompany"
                    prefix={<Linkedin size={16} className="text-gray-dark" />}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end sticky bottom-4">
            <button
              onClick={handleSave}
              className="save-button flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover-scale"
              style={{ 
                backgroundColor: 'var(--primary-dark)',
                color: 'white'
              }}
            >
              <Save size={18} />
              Save All Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;