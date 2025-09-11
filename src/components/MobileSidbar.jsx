import { Fragment } from "react";
import { Dialog, Transition, Disclosure } from "@headlessui/react";
import { ChevronRightIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { navigation } from "../constant/Menu";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MobileSidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 lg:hidden"
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" />
        </Transition.Child>

        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative mr-0 flex w-full max-w-xs flex-1">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute right-[82%] top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="h-6 w-6 text-gray-800"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>

              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-yellow-50 px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                  <img
                    className="h-12 w-auto"
                    src="/img/Vector.png"
                    alt="Your Company"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li
                            key={item.name}
                            className={classNames(
                              location.pathname === item.href
                                ? "bg-green-200"
                                : "hover:bg-yellow-200",
                              "flex items-start gap-3 py-2 border-2 border-gray-700 rounded-md"
                            )}
                           
                          >
                            <span className="text-xl mr-2">{item.src}</span>
                            {!item.children ? (
                              <Link
                                to={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={classNames(
                                  item.current
                                    ? ""
                                    : " hover:text-gray-700",
                                  "block rounded-md pr-2 pl-10 text-sm leading-6 font-semibold text-gray-700"
                                )}
                              >
                                {item.name}
                              </Link>
                            ) : (
                              <Disclosure as="div" dir="ltr">
                                {({ open }) => (
                                  <>
                                    <Disclosure.Button
                                      className={classNames(
                                        item.current
                                          ? "bg-gray-50"
                                          : "hover:bg-gray-50 hover:text-gray-700",
                                        "flex items-center justify-end w-full rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700"
                                      )}
                                    >
                                      <ChevronRightIcon
                                        className={classNames(
                                          open
                                            ? "rotate-90 text-gray-500"
                                            : "text-gray-700 rotate-180",
                                          "h-5 w-5 shrink-0"
                                        )}
                                        aria-hidden="true"
                                      />
                                      {item.name}
                                    </Disclosure.Button>
                                    <Disclosure.Panel
                                      as="ul"
                                      className="mt-1 px-2"
                                    >
                                      {item.children.map((subItem) => (
                                        <li key={subItem.name}>
                                          <Disclosure.Button
                                            as={Link}
                                            to={subItem.href}
                                            onClick={() =>
                                              setSidebarOpen(false)
                                            }
                                            className={classNames(
                                              subItem.current
                                                ? "bg-gray-50"
                                                : "hover:bg-gray-50 hover:text-gray-700",
                                              "block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700"
                                            )}
                                          >
                                            {subItem.name}
                                          </Disclosure.Button>
                                        </li>
                                      ))}
                                    </Disclosure.Panel>
                                  </>
                                )}
                              </Disclosure>
                            )}
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li></li>
                  </ul>
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
