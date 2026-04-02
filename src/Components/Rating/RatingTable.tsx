"use client";

import { useState } from "react";
import { Star, Eye, Mail, User, Calendar, MessageSquare, X, ThumbsUp, ThumbsDown, Copy, Check, Pencil, Trash2 } from "lucide-react";
import CommonTable from "../common/CommonTable";
import dayjs from "dayjs";

// Full rating preview modal - Premium Design with Custom Colors
const RatingPreviewModal = ({ open, onClose, rating }: any) => {
  const [copied, setCopied] = useState(false);
  
  if (!open || !rating) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (date: string) => {
    if (!date) return "Recently";
    try {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return "Recently";
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    const first = firstName?.charAt(0) || '';
    const last = lastName?.charAt(0) || '';
    return `${first}${last}`.toUpperCase() || 'U';
  };

  const getRatingLabel = (rating: number) => {
    switch(rating) {
      case 5: return { text: "Excellent!", color: "bg-primary-10 text-primary-dark", icon: ThumbsUp };
      case 4: return { text: "Very Good", color: "bg-primary-10 text-primary-dark", icon: ThumbsUp };
      case 3: return { text: "Average", color: "bg-primary-10 text-primary-dark", icon: null };
      case 2: return { text: "Below Average", color: "bg-primary-10 text-primary-dark", icon: ThumbsDown };
      case 1: return { text: "Poor", color: "bg-primary-10 text-primary-dark", icon: ThumbsDown };
      default: return { text: "Rated", color: "bg-gray-medium text-gray-dark", icon: null };
    }
  };

  const ratingInfo = getRatingLabel(rating.starRating);
  const RatingIcon = ratingInfo.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
      <div className="relative max-w-2xl w-full bg-white rounded-2xl shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-medium transition-all duration-200 z-10"
          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
        >
          <X size={20} className="text-gray-dark" />
        </button>

        {/* Header Section with Primary Color */}
        <div className="rounded-t-2xl p-6 text-white" style={{ backgroundColor: 'var(--primary-dark)' }}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {getInitials(rating.firstName, rating.lastName)}
                </span>
              </div>
              
              {/* User Info */}
              <div>
                <h3 className="text-2xl font-bold mb-1">
                  {rating.firstName || ''} {rating.lastName || ''}
                </h3>
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <Mail size={14} />
                  <span>{rating.email || 'No email'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-6">
          
          {/* Rating Section */}
          <div className="rounded-xl p-4 border" style={{ backgroundColor: 'var(--primary-10)', borderColor: 'var(--primary-30)' }}>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Star size={18} style={{ color: 'var(--primary-dark)', fill: 'var(--primary-dark)' }} />
                Customer Rating
              </h4>
              <span className="text-sm text-gray-dark">
                {formatDate(rating.createdAt)}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={28}
                    style={{
                      color: star <= rating.starRating ? 'var(--primary-dark)' : '#d1d5db',
                      fill: star <= rating.starRating ? 'var(--primary-dark)' : 'none'
                    }}
                  />
                ))}
              </div>
              <div className="ml-auto">
                <span className="text-3xl font-bold text-gray-900">{rating.starRating || 0}</span>
                <span className="text-gray-dark">/5</span>
              </div>
            </div>
            
            {/* Rating Label */}
            {rating.starRating > 0 && (
              <div className="mt-3">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${ratingInfo.color}`}>
                  {RatingIcon && <RatingIcon size={14} />}
                  {ratingInfo.text}
                </span>
              </div>
            )}
          </div>

          {/* Review Section */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <MessageSquare size={18} style={{ color: 'var(--primary-dark)' }} />
              Review Details
            </h4>
            
            <div className="rounded-xl p-5 border" style={{ backgroundColor: 'var(--gray-light)', borderColor: 'var(--gray-border)' }}>
              {rating.description ? (
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {rating.description}
                </p>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare size={48} className="text-gray-dark mx-auto mb-2" />
                  <p className="text-gray-dark">No review text provided</p>
                </div>
              )}
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: 'var(--gray-border)' }}>
            <div className="flex items-center gap-2 text-sm text-gray-dark">
              <User size={16} className="text-gray-dark" />
              <span>Review ID: <span className="font-mono text-xs">{rating._id?.slice(-8) || 'N/A'}</span></span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-dark justify-end">
              <Calendar size={16} className="text-gray-dark" />
              <span>Submitted: {formatDate(rating.createdAt)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t" style={{ borderColor: 'var(--gray-border)' }}>
            <button
              onClick={() => window.location.href = `mailto:${rating.email}`}
              className="flex-1 px-4 py-2 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 font-medium"
              style={{ backgroundColor: 'var(--primary-10)', color: 'var(--primary-dark)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-20)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-10)'}
            >
              <Mail size={18} />
              Contact Reviewer
            </button>
            
            <button
              onClick={handleCopyLink}
              className="flex-1 px-4 py-2 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 font-medium"
              style={{ backgroundColor: 'var(--primary-10)', color: 'var(--primary-dark)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-20)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-10)'}
            >
              {copied ? (
                <>
                  <Check size={18} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={18} />
                  Copy Link
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RatingTable = ({ data, loading, page, limit, onEdit, onDelete }: any) => {
  const [selectedRating, setSelectedRating] = useState<any>(null);

  const columns = [
    {
      title: "Sr No",
      key: "srNo",
      render: (_item: any, index: number = 0) => {
        const srNo = ((page || 1) - 1) * (limit || 10) + (index + 1);
        return <span className="text-gray-dark">{srNo}</span>;
      },
    },
    {
      title: "User",
      key: "user",
      render: (item: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary-10)' }}>
            <span className="text-xs font-semibold" style={{ color: 'var(--primary-dark)' }}>
              {`${item.firstName?.charAt(0) || ''}${item.lastName?.charAt(0) || ''}`.toUpperCase() || 'U'}
            </span>
          </div>
          <span className="font-medium text-gray-900">
            {item.firstName || ''} {item.lastName || ''}
          </span>
        </div>
      ),
    },
    {
      title: "Email",
      key: "email",
      render: (item: any) => (
        <span className="text-gray-dark text-sm">{item.email || '-'}</span>
      ),
    },
    {
      title: "Rating",
      key: "rating",
      render: (item: any) => (
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={16}
              style={{
                color: star <= (item.starRating || 0) ? 'var(--primary-dark)' : '#d1d5db',
                fill: star <= (item.starRating || 0) ? 'var(--primary-dark)' : 'none'
              }}
            />
          ))}
        </div>
      ),
    },
  
     {
            title: "Created / Updated",
            key: "createdUpdatedAt",
            width: 280,
            render: (item: any) => (
              <div className="date-group-cell">
                <div className="date-line flex flex-direction-row">
                  <span className="date-label">Created:</span>
                  <span className="date-value">
                    {item.createdAt
                      ? dayjs(item.createdAt).format("DD MMM YYYY, hh:mm A")
                      : "-"}
                  </span>
                </div>
      
                <div className="date-line">
                  <span className="date-label">Updated:</span>
                  <span className="date-value">
                    {item.updatedAt
                      ? dayjs(item.updatedAt).format("DD MMM YYYY, hh:mm A")
                      : "-"}
                  </span>
                </div>
              </div>
            ),
          },

     
    {
      title: "Actions",
      key: "actions",

      
      render: (item: any) => (
        <div className="flex gap-2">


  <button
          onClick={() => setSelectedRating(item)}
          className="group p-2 rounded-lg transition-all duration-200 action-btn "
          style={{ backgroundColor: 'transparent' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-10)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          title="View full review"
        >
          <Eye size={18} style={{ color: 'var(--gray-dark)' }} className="group-hover"  />
        </button>
          <button
            className="action-btn edit"
            onClick={() => onEdit(item)}
          >
            <Pencil size={16}/>
          </button>

          <button
            className="action-btn delete"
            onClick={() => onDelete(item._id)}
          >
            <Trash2 size={16}/>
          </button>

        </div>
      ),
    },
  ];

  return (
    <>
      <CommonTable
        title="Ratings List"
        columns={columns}
        data={data || []}
        loading={loading || false}
        emptyText="No ratings found"
      />

      {/* Premium Preview Modal */}
      {selectedRating && (
        <RatingPreviewModal
          open={true}
          onClose={() => setSelectedRating(null)}
          rating={selectedRating}
        />
      )}
    </>
  );
};

export default RatingTable;