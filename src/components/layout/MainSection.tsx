import { Outlet } from "react-router-dom";

const MainSection = () => {
  return (
    <div className="w-full max-w-[1280px] h-full border border-border-color rounded-xl max-h-[796px] bg-white p-4 md:p-[60px] overflow-y-auto">
      <Outlet />
    </div>
  );
};

export default MainSection;
