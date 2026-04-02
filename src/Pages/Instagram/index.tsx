"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { CommonPageHeader, CommonPagination } from "../../Components";
import InstagramForm from "../../Components/Instagram/InstagramForm";
import InstagramTable from "../../Components/Instagram/InstagramTable";
import { Queries } from "../../Api/Queries";
import { Mutations } from "../../Api/Mutations";
import CommonSearchFilterBar from "../../Components/common/CommonSearchFillterBar";

const Instagram = () => {
  const [mode, setMode] = useState("list");
  const [editData, setEditData] = useState<any>(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [filters, setFilters] = useState({ search: "" });
  const [statusToggle, setStatusToggle] = useState(true);
  const queryParams = { page: pagination.page, limit: pagination.limit, ...(filters.search && { search: filters.search }), status: statusToggle ? "active" : "inactive" };
  const { data, isLoading, refetch } = Queries.useGetInstagrams(queryParams);
  const list = data?.data?.instagram_data || [];
  const total = data?.data?.totalData || 0;
  const add = Mutations.useAddInstagram();
  const update = Mutations.useUpdateInstagram();
  const remove = Mutations.useDeleteInstagram();

  const handleSubmit = async (values: any) => {
    if (editData) { await update.mutateAsync({ ...values, instagramId: editData._id }); } 
    else { await add.mutateAsync(values); }
    setMode("list");
    setEditData(null);
    refetch();
  };

  const handleDelete = async (id: string) => { await remove.mutateAsync(id); refetch(); };
  const handleToggle = async (item: any) => { await update.mutateAsync({ instagramId: item._id, type: item.type, imageUrl: item.imageUrl, link: item.link, videoUrl: item.videoUrl, isActive: !item.isActive }); refetch(); };

  if (mode === "form") { return <InstagramForm initialValues={editData} onSubmit={handleSubmit} onBack={() => { setMode("list"); setEditData(null); }} />; }

  return (<><div className="user-page">
    <CommonPageHeader title="Instagram" buttonText="Add Instagram" buttonIcon={<Plus />} onButtonClick={() => setMode("form")} />
    <CommonSearchFilterBar total={total} search={filters.search} onSearchChange={(val) => setFilters({ search: val })} onSearchSubmit={refetch} status={statusToggle} onStatusChange={setStatusToggle} />
    <InstagramTable data={list} loading={isLoading} page={pagination.page} limit={pagination.limit} onEdit={(item: any) => { setEditData(item); setMode("form"); }} onDelete={handleDelete} onToggleStatus={handleToggle} />
    <CommonPagination page={pagination.page} limit={pagination.limit} total={total} currentCount={list.length} onPageChange={(page) => setPagination((p) => ({ ...p, page }))} onLimitChange={(limit) => setPagination({ page: 1, limit })} />
  </div></>);
};

export default Instagram;