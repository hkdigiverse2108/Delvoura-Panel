"use client";

interface CommonPageHeaderProps {
  title: string;
  subtitle?: string; 
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  onButtonClick?: () => void;
}

const CommonPageHeader = ({ title, buttonText, onButtonClick, buttonIcon }: CommonPageHeaderProps) => {
  return (
    <header className="mb-6 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {/* <p className="text-gray-500 text-sm">{subtitle}</p> */}
      </div>

      <button className="btn-add-product" onClick={onButtonClick}>
        {buttonIcon} {buttonText}
      </button>
    </header>
  );
};

export default CommonPageHeader;