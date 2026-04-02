"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Mutations } from "../../Api/Mutations";
import { CommonPageHeader, CommonPagination, ScentTable } from "../../Components";
import CommonSearchFilterBar from "../../Components/common/CommonSearchFillterBar";
import ScentFormPage from "../../Components/Scent/ScentForm";
import { Queries } from "../../Api/Queries";
import ConfirmModal from "../../Components/common/ConfirmModal";

const Scent = () => {
  const [mode, setMode] = useState<"list" | "form">("list");
  const [editData, setEditData] = useState<any>(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [filters, setFilters] = useState({ search: "" });
  const [statusToggle, setStatusToggle] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const queryParams = { page: pagination.page, limit: pagination.limit, ...(filters.search.trim() && { search: filters.search.trim() }), status: statusToggle ? "active" : "inactive" };
  const { data, isLoading, refetch } = Queries.useGetScents(queryParams);
  const scents = data?.data?.scent_data || [];
  const total = data?.data?.totalData || 0;
  const filteredScents = useMemo(() => scents, [scents]);
  const addScent = Mutations.useAddScent();
  const updateScent = Mutations.useUpdateScent();
  const deleteScent = Mutations.useDeleteScent();

  const handleSubmit = async (values: any) => {
    try {
      if (editData) { await updateScent.mutateAsync({ ...values, scentId: editData._id }); } 
      else { await addScent.mutateAsync(values); }
      setMode("list");
      setEditData(null);
      refetch();
    } catch (error) { console.error(error); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try { await deleteScent.mutateAsync(deleteId); setDeleteId(null); refetch(); } 
    catch (error) { console.error(error); }
  };

  const handleToggleStatus = async (item: any) => {
    await updateScent.mutateAsync({ scentId: item._id, name: item.name, isActive: !item.isActive });
    refetch();
  };

  if (mode === "form") { return <ScentFormPage initialValues={editData} onSubmit={handleSubmit} onBack={() => { setMode("list"); setEditData(null); }} />; }

  return (
    <div className="user-page">
      <CommonPageHeader title="Scents" subtitle="Manage fragrance types" buttonText="Add Scent" buttonIcon={<Plus size={18} />} onButtonClick={() => { setEditData(null); setMode("form"); }} />
      <CommonSearchFilterBar onStatusChange={(val) => { setStatusToggle(val); setPagination((prev) => ({ ...prev, page: 1 })); }} total={total} label="scents" search={filters.search} onSearchChange={(val) => setFilters({ search: val })} onSearchSubmit={refetch} status={statusToggle} />
      <ScentTable data={filteredScents} loading={isLoading} page={pagination.page} limit={pagination.limit} onEdit={(item: any) => { setEditData(item); setMode("form"); }} onDelete={(id: string) => setDeleteId(id)} onToggleStatus={handleToggleStatus} />
      <ConfirmModal open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} loading={deleteScent.isPending} title="Delete Scent" description="Are you sure you want to delete this scent?" />
      <CommonPagination page={pagination.page} limit={pagination.limit} total={total} currentCount={filteredScents.length} label="scents" onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))} onLimitChange={(limit) => setPagination({ page: 1, limit, total })} />
    </div>
  );
};

export default Scent;