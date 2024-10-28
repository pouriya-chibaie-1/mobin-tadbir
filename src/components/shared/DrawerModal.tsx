import React, { useState, useEffect } from "react";
import closeIcon from "../../assets/icon/close-x.svg";
const ResponsiveModalDrawer = ({
  title,
  width,
  height,
  isOpen,
  onClose,
  children,
}: {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  width?: string;
  height?: string;
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update the isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      {isMobile ? (
        // Drawer for mobile (bottom)
        <div onClick={(e) => e.stopPropagation()}
          style={{ height: height ?? "" }}
          className="fixed bottom-0 left-0 w-full bg-white rounded-t-[32px] p-4 shadow-lg"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="text-[#14142A] font-bold text-lg">{title}</div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800"
            >
              <img src={closeIcon} />
            </button>
          </div>
          {children}
        </div>
      ) : (
        // Modal for desktop (center)
        <div onClick={(e) => e.stopPropagation()}
          style={{ width: width ?? "", height: height ?? "" }}
          className="relative bg-white rounded-lg p-6 shadow-lg w-full max-w-lg mx-4"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="text-[#14142A] font-bold text-lg">{title}</div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800"
            >
              <img src={closeIcon} />
            </button>
          </div>
          {children}
        </div>
      )}
    </div>
  );
};

export default ResponsiveModalDrawer;
