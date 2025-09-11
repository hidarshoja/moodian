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
            "lg:flex-1 lg:relative lg:overflow-hidden",
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
              <div className="px-2">
                <div className="w-full min-h-[90vh] bg-white rounded-2xl p-4 transition-all duration-300 ease-in-out">
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
