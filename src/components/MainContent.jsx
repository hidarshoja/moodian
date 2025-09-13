import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MainContent({
  sidebarOpen,
  setSidebarOpen,
  desktopSidebarOpen,
  setDesktopSidebarOpen,
}) {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/Login" && (
        <div
          className={classNames(
            "flex-1 relative h-screen overflow-y-auto scrollbar-hide lg:h-screen lg:overflow-y-auto",
            desktopSidebarOpen ? "lg:w-4/5" : "lg:w-full"
          )}
        >
          {location.pathname !== "/Login" && (
            <Header
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              desktopSidebarOpen={desktopSidebarOpen}
              setDesktopSidebarOpen={setDesktopSidebarOpen}
            />
          )}
          <div>
            <main>
              <div>
                <div className="w-full min-h-[100vh] p-2 md:p-3 lg:p-5 bg-[#3a3a65]   transition-all duration-300 ease-in-out">
                  <Outlet />
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}
