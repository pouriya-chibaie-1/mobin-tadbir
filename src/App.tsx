import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { Provider } from "react-redux";
import store from "./redux/store";
import { CustomFlowbiteTheme, Flowbite } from "flowbite-react";

function App() {
  const customTheme: CustomFlowbiteTheme = {
    button: {
      color: {
        primaryColor:
          "bg-[#034CA0]  hover:bg-blue-900 focus:ring-4  ring-[#034CA0] focus:ring-offset-2   text-white hover:text-white  disabled:bg-[#DDDDDD] disabled:text-[rgba(0,0,0,0.38)] disabled:opacity-100 disabled:cursor-not-allowed transition-none",
        secondaryColor:
          "bg-[#0D6EFD]  focus:ring-4 focus:ring-offset-2 ring-[#0D6EFD]    text-white hover:text-white  disabled:bg-[#DDDDDD] disabled:text-[rgba(0,0,0,0.38)] disabled:opacity-100 disabled:cursor-not-allowed transition-none",
        errorColor:
          "bg-[#B3261E]  focus:ring-4 focus:ring-offset-2 ring-[#B3261E]    text-white hover:text-white disabled:bg-[#DDDDDD] disabled:text-[rgba(0,0,0,0.38)] disabled:opacity-100 disabled:cursor-not-allowed transition-none",
      },
    },
  };
  return (
    <>
      <Provider store={store}>
        <Flowbite theme={{ theme: customTheme }}>
          <RouterProvider router={router} />
        </Flowbite>
      </Provider>
    </>
  );
}

export default App;
