import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Menu } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { FaRegCircleUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../features/user/userSlice";
import { MdOutlineFreeCancellation } from "react-icons/md";
import { TbStatusChange } from "react-icons/tb";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiLogOutCircle } from "react-icons/bi";
import { CiUser } from "react-icons/ci";
import { TiPhoneOutline } from "react-icons/ti";

export default function Header({
  setSidebarOpen,
  desktopSidebarOpen,
  setDesktopSidebarOpen,
}) {
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
   const handleLogout = useCallback(() => {
  //   // Clear token and redux user, then redirect to login
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USER");
    localStorage.removeItem("loginResponse");
    localStorage.removeItem("loginTimestamp");
    dispatch(addUser(null));
    navigate("/auth/login");
   }, [navigate, dispatch]);



  Header.propTypes = {
    setSidebarOpen: PropTypes.func.isRequired,
    desktopSidebarOpen: PropTypes.bool.isRequired,
    setDesktopSidebarOpen: PropTypes.func.isRequired,
  };

  const menuItems = [
    {
      label: "ابطال",
      path: "/cancel",
      icon: <MdOutlineFreeCancellation className="w-4 h-4" />,
    },
    {
      label: "تغییر وضعیت",
      path: "/change-status",
      icon: <TbStatusChange className="w-4 h-4 " />,
    },
    {
      label: "تغییر رمز",
      path: "/change-password",
      icon: <RiLockPasswordFill className="w-4 h-4 " />,
    },
    {
      label: "خروج",
      action: handleLogout,
      icon: <BiLogOutCircle className="w-4 h-4 " />,
    },
    {
      label: "ورود",
      path: "/auth/login",
      icon: <RiLockPasswordFill className="w-4 h-4 " />,
    },
  ];

  return (
    <div className="header-panel sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4  border-b-2 border-[#3b466c] px-4 sm:gap-x-6 sm:px-6 lg:px-8 shadow-sm text-right font-sans">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-white lg:hidden hover:text-[#fdcb44] transition-colors duration-200"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">باز کردن منو</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      {!desktopSidebarOpen && (
        <button
          type="button"
          className="-m-2.5 p-2.5 text-white hidden lg:block hover:text-[#fdcb44] transition-colors duration-200"
          onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
        >
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      )}
      <div className="flex flex-1 gap-x-4 justify-end lg:gap-x-6">
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <Menu
            as="div"
            className="flex flex-wrap items-center justify-end gap-1"
          >
            <div className=" flex overflow-hidden w-7 bg-white h-7 rounded-full border border-[#5B7380]">
              <div className="w-full flex items-center justify-center gap-1 cursor-pointer  transition-colors duration-200">
                <div onClick={() => setUserMenuOpen(!userMenuOpen)}>
                  <FaRegCircleUser className="w-6 h-6 cursor-pointer" />
                </div>
                {userMenuOpen && (
                  <div
                    className="fixed top-10 left-0 w-[160px] h-full   z-50 flex flex-col items-start p-4 animate-slideIn"
                    style={{
                      animation:
                        "slideIn 0.4s cubic-bezier(.68,-0.55,.27,1.55)",
                    }}
                  >
                    <span className="w-[160px] border border-white bg-[#0d0d2f]  flex items-center justify-start gap-1 text-sm my-2  p-1 rounded-lg text-right text-white  hover:bg-[#1f1f53] transition-colors duration-200 opacity-0 animate-fadeInStagger">
                      <div className="flex flex-col">
                        <div className="flex items-center justify-start gap-1">
                          <CiUser />
                          <span>
                            {user
                              ? `${user.name ?? ""} ${
                                  user.last_name ?? ""
                                }`.trim()
                              : "کاربر"}
                          </span>
                        </div>

                        <div className="flex items-center justify-start gap-1">
                          <TiPhoneOutline />
                          <span>
                            {user?.mobile || user?.mobile || "شماره تماس"}
                          </span>
                        </div>
                      </div>
                    </span>
                    {menuItems.map((item, idx) => (
                      <button
                        key={item.label}
                        onClick={() => {
                          setUserMenuOpen(false);
                          if (item.action) {
                            item.action();
                          } else if (item.path) {
                            navigate(item.path);
                          }
                        }}
                        className="w-[120px] mr-8 flex border border-white bg-[#0d0d2f] items-center justify-start gap-1 text-sm my-2  p-1 rounded-lg text-right text-white  hover:bg-[#1f1f53] transition-colors duration-200 opacity-0 animate-fadeInStagger"
                        style={{
                          animationDelay: `${0.35 * idx}s`, // فاصله بیشتر برای آرام‌تر شدن
                          animationFillMode: "forwards",
                        }}
                      >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Menu>
        </div>
      </div>
    </div>
  );
}
