"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Mutations } from "../../Api/Mutations";
import { CommonPageHeader, CommonPagination, SeasonTable } from "../../Components";
import CommonSearchFilterBar from "../../Components/common/CommonSearchFillterBar";
import { PAGE_TITLE } from "../../Constants";
import SeasonFormPage from "../../Components/Season/SeasonForm";
import { Queries } from "../../Api/Queries";
import ConfirmModal from "../../Components/common/ConfirmModal";

const Season = () => {
  const [mode, setMode] = useState<"list" | "form">("list");
  const [editData, setEditData] = useState<any>(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [filters, setFilters] = useState({ search: "" });
  const [statusToggle, setStatusToggle] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const queryParams = { page: pagination.page, limit: pagination.limit, ...(filters.search && { search: filters.search }), status: statusToggle ? "active" : "inactive" };
  const { data, isLoading, refetch } = Queries.useGetSeasons(queryParams);
  const seasons = data?.data?.season_data || [];
  const total = data?.data?.totalData || 0;
  const addSeason = Mutations.useAddSeason();
  const updateSeason = Mutations.useUpdateSeason();
  const deleteSeason = Mutations.useDeleteSeason();

  const handleSubmit = async (values: any) => {
    if (editData) { await updateSeason.mutateAsync({ ...values, seasonId: editData._id }); } 
    else { await addSeason.mutateAsync(values); }
    setMode("list");
    setEditData(null);
    refetch();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteSeason.mutateAsync(deleteId);
    setDeleteId(null);
    refetch();
  };

  const handleToggleStatus = async (item: any) => {
    await updateSeason.mutateAsync({ seasonId: item._id, name: item.name, isActive: !item.isActive });
    refetch();
  };

  if (mode === "form") { return <SeasonFormPage initialValues={editData} onSubmit={handleSubmit} onBack={() => { setMode("list"); setEditData(null); }} />; }

  return (
    <div className="user-page">
      <CommonPageHeader title={PAGE_TITLE.SEASON.TITLE} subtitle={PAGE_TITLE.SEASON.SUB_TITLE} buttonText={PAGE_TITLE.SEASON.BUTTON_TEXT} buttonIcon={<Plus size={18} />} onButtonClick={() => { setEditData(null); setMode("form"); }} />
      <CommonSearchFilterBar total={total} label={PAGE_TITLE.SEASON.LABEL} search={filters.search} onSearchChange={(val) => setFilters({ search: val })} onSearchSubmit={refetch} status={statusToggle} onStatusChange={setStatusToggle} />
      <SeasonTable data={seasons} loading={isLoading} page={pagination.page} limit={pagination.limit} onEdit={(item: any) => { setEditData(item); setMode("form"); }} onDelete={(id: string) => setDeleteId(id)} onToggleStatus={handleToggleStatus} />
      <ConfirmModal open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} loading={deleteSeason.isPending} />
      <CommonPagination page={pagination.page} limit={pagination.limit} total={total} currentCount={seasons.length} label={PAGE_TITLE.SEASON.LABEL} onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))} onLimitChange={(limit) => setPagination({ page: 1, limit, total })} />
    </div>
  );
};

export default Season;