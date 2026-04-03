"use client";

interface CommonPageHeaderProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  onButtonClick?: () => void;
}

const CommonPageHeader = ({
  title,
  subtitle,
  buttonText,
  onButtonClick,
  buttonIcon,
}: CommonPageHeaderProps) => {
  return (
    <header className="mb-6 flex justify-between items-center px-4">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && (
          <p className="text-gray-500 text-sm">{subtitle}</p>
        )}
      </div>

      {/* ✅ ONLY SHOW BUTTON IF buttonText EXISTS */}
      {buttonText && (
        <button className="btn-add-product" onClick={onButtonClick}>
          {buttonIcon} {buttonText}
        </button>
      )}
    </header>
  );
};

export default CommonPageHeader;