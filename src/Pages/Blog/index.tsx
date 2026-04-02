"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Mutations } from "../../Api/Mutations";
import { CommonPageHeader, CommonPagination } from "../../Components";
import CommonSearchFilterBar from "../../Components/common/CommonSearchFillterBar";
import BlogTable from "../../Components/Blog/BlogTable";
import BlogFormPage from "../../Components/Blog/BlogForm";
import { Queries } from "../../Api/Queries";
import ConfirmModal from "../../Components/common/ConfirmModal";

const Blog = () => {
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [filters, setFilters] = useState({ search: "" });
  const [statusToggle, setStatusToggle] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const queryParams = { page: pagination.page, limit: pagination.limit, ...(filters.search.trim() && { search: filters.search.trim() }), status: statusToggle ? "active" : "inactive" };
  const { data, isLoading, refetch } = Queries.useGetBlogs(queryParams);
  const blogs = data?.data?.blog_data || [];
  const total = data?.data?.totalData || 0;
  const addBlog = Mutations.useAddBlog();
  const updateBlog = Mutations.useUpdateBlog();
  const deleteBlog = Mutations.useDeleteBlog();

  const handleSubmit = async (values: any) => {
    if (editData) { await updateBlog.mutateAsync({ blogId: editData._id, ...values }); } 
    else { await addBlog.mutateAsync(values); }
    setShowForm(false);
    setEditData(null);
    refetch();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try { await deleteBlog.mutateAsync(deleteId); setDeleteId(null); refetch(); } 
    catch (error) { console.error(error); }
  };

  if (showForm) { return <BlogFormPage initialValues={editData} onSubmit={handleSubmit} onBack={() => { setShowForm(false); setEditData(null); }} />; }

  return (
    <div className="user-page">
      <CommonPageHeader title="Blog" subtitle="Manage blog content" buttonText="Add Blog" buttonIcon={<Plus size={18} />} onButtonClick={() => { setEditData(null); setShowForm(true); }} />
      <CommonSearchFilterBar search={filters.search} onSearchChange={(val) => { setFilters({ search: val }); setPagination((prev) => ({ ...prev, page: 1 })); }} onSearchSubmit={refetch} status={statusToggle} onStatusChange={(val) => { setStatusToggle(val); setPagination((prev) => ({ ...prev, page: 1 })); }} total={total} label="blogs" />
      <BlogTable data={blogs} loading={isLoading} page={pagination.page} limit={pagination.limit} onEdit={(item: any) => { setEditData(item); setShowForm(true); }} onDelete={(id: string) => setDeleteId(id)} onToggleStatus={async (item: any) => { await updateBlog.mutateAsync({ blogId: item._id, title: item.title, content: item.content || item.description, image: item.image, isActive: !item.isActive }); refetch(); }} />
      <ConfirmModal open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} loading={deleteBlog.isPending} title="Delete Blog" description="Are you sure you want to delete this Blog?" />
      <CommonPagination page={pagination.page} limit={pagination.limit} total={total} currentCount={blogs.length} label="blogs" onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))} onLimitChange={(limit) => setPagination({ page: 1, limit })} />
    </div>
  );
};

export default Blog;