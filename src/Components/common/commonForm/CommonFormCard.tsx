"use client";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const CommonFormCard = ({ children,   }: Props) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CommonFormCard;