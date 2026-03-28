"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Mutations } from "../../Api/Mutations";
import { PAGE_TITLE } from "../../Constants";
import { BannerGallery, CommonPageHeader } from "../../Components";
import BannerFormPage from "../../Components/Banner/BannerFrom";
import { Queries } from "../../Api/Queries";

const Banner = () => {
  const [showForm, setShowForm] = useState(false);

  const { data, refetch } = Queries.useGetBanner();
  const banner = data?.data || null;

  const addEditBanner = Mutations.useAddEditBanner();

  const handleSubmit = async (values: any) => {
    await addEditBanner.mutateAsync(values);
    setShowForm(false);
    refetch();
  };

  if (showForm) {
    return (
      <BannerFormPage
        initialValues={banner}
        onSubmit={handleSubmit}
        onBack={() => setShowForm(false)}
      />
    );
  }

  return (
    <div className="user-page">

      <CommonPageHeader
        title={PAGE_TITLE.BANNER.TITLE}
        subtitle={PAGE_TITLE.BANNER.SUB_TITLE}
        buttonText={PAGE_TITLE.BANNER.LABEL}
        buttonIcon={<Plus size={18} />}
        onButtonClick={() => setShowForm(true)}
      />

   <BannerGallery
  data={banner}
  onEdit={() => setShowForm(true)}
  onToggleStatus={async (item: any) => {
    await addEditBanner.mutateAsync({
      bannerImages: item.bannerImages,
      isActive: !item.isActive,
    });
    refetch();
  }}
  status={true} 
  onStatusChange={(val: boolean) => {
    console.log(val); 
  }}
/>   
    </div>
  );
};

export default Banner;