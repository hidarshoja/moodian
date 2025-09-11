import { useState, useEffect } from "react";
import MobileSidebar from "./components/MobileSidbar";
import DesktopSidebar from "./components/DesktopSidebar";
import MainContent from "./components/MainContent";
import "./App.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const isAuthPage = location.pathname.startsWith("/auth");

  return (
    <>
      <div
        className={`lg:flex lg:h-screen lg:overflow-hidden transition-all duration-300 ease-in-out bg-color1`}
      >
        {!isAuthPage && (
          <MobileSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        )}
        {!isAuthPage && (
          <DesktopSidebar
            desktopSidebarOpen={desktopSidebarOpen}
            setDesktopSidebarOpen={setDesktopSidebarOpen}
          />
        )}
        <MainContent
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          desktopSidebarOpen={desktopSidebarOpen}
          setDesktopSidebarOpen={setDesktopSidebarOpen}
        />
      </div>
    </>
  );
}

export default App;
