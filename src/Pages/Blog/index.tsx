"use client";

import {  useState } from "react";
import { Plus } from "lucide-react";
import { Mutations } from "../../Api/Mutations";

import { CommonPageHeader, CommonPagination } from "../../Components";
import CommonSearchFilterBar from "../../Components/common/CommonSearchFillterBar";
import BlogTable from "../../Components/Blog/BlogTable";
import BlogFormPage from "../../Components/Blog/BlogForm";
import { Queries } from "../../Api/Queries";

const Blog = () => {
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [filters, setFilters] = useState({ search: "" });
  const [statusToggle, setStatusToggle] = useState(true);

  const queryParams = {
    page: pagination.page,
    limit: pagination.limit,
    ...(filters.search.trim() && { search: filters.search.trim() }),
    status: statusToggle ? "active" : "inactive",
  };

  const { data, isLoading, refetch } =
    Queries.useGetBlogs(queryParams);

  const blogs = data?.data?.blog_data || [];
  const total = data?.data?.totalData || 0;

  const addBlog = Mutations.useAddBlog();
  const updateBlog = Mutations.useUpdateBlog();
  const deleteBlog = Mutations.useDeleteBlog();

  const handleSubmit = async (values: any) => {
    if (editData) {
      await updateBlog.mutateAsync({
        blogId: editData._id,
        ...values,
      });
    } else {
      await addBlog.mutateAsync(values);
    }

    setShowForm(false);
    setEditData(null);
    refetch();
  };

  if (showForm) {
    return (
      <BlogFormPage
        initialValues={editData}
        onSubmit={handleSubmit}
        onBack={() => {
          setShowForm(false);
          setEditData(null);
        }}
      />
    );
  }

  return (
    <div className="user-page">

      <CommonPageHeader
        title="Blog"
        subtitle="Manage blog content"
        buttonText="Add Blog"
        buttonIcon={<Plus size={18} />}
        onButtonClick={() => {
          setEditData(null);
          setShowForm(true);
        }}
      />

      <CommonSearchFilterBar
        search={filters.search}
        onSearchChange={(val) => {
          setFilters({ search: val });
          setPagination((prev) => ({ ...prev, page: 1 }));
        }}
        onSearchSubmit={refetch}
        status={statusToggle}
        onStatusChange={(val) => {
          setStatusToggle(val);
          setPagination((prev) => ({ ...prev, page: 1 }));
        }}
        total={total}
        label="blogs"
      />

      <BlogTable
        data={blogs}
        loading={isLoading}
        page={pagination.page}
        limit={pagination.limit}
        onEdit={(item: any) => {
          setEditData(item);
          setShowForm(true);
        }}
        onDelete={async (id: string) => {
          if (confirm("Delete this blog?")) {
            await deleteBlog.mutateAsync(id);
            refetch();
          }
        }}
        onToggleStatus={async (item: any) => {
          await updateBlog.mutateAsync({
            blogId: item._id,
            ...item,
            isActive: !item.isActive,
          });
          refetch();
        }}
      />

      <CommonPagination
        page={pagination.page}
        limit={pagination.limit}
        total={total}
        currentCount={blogs.length}
        label="blogs"
        onPageChange={(page) =>
          setPagination((prev) => ({ ...prev, page }))
        }
        onLimitChange={(limit) =>
          setPagination({ page: 1, limit })
        }
      />
    </div>
  );
};

export default Blog;