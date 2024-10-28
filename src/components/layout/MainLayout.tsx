import SideBar from "./SideBar";
import MainSection from "./MainSection";
import 'flowbite';
const MainLayout = () => {
  return (<html data-theme="mytheme">

    <div
      className="h-screen overflow-hidden flex p-4 md:px-0 md:py-[60px] gap-8  justify-center bg-[#FBFDFF]"
      dir="rtl"
      >
      <div className="w-[300px] h-full hidden md:block">
        <SideBar />
      </div>
      <MainSection />
    </div>
      </html>
  );
};

export default MainLayout;
