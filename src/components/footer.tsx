"use client"
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const Footer = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section:any) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };

  return (
    <footer className="bg-white dark:bg-gray-900 px-5 pt-10 lg:pt-20">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="flex flex-wrap md:justify-between">
          <div className="w-full md:w-auto">
            <h2
              className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white flex justify-between items-center md:block cursor-pointer"
              onClick={() => toggleSection("company")}
            >
              Company
              <FiChevronDown
                className={`ml-2 md:hidden ${
                  openSection === "company" ? "rotate-180" : ""
                }`}
              />
            </h2>
            <ul
              className={`text-gray-500 dark:text-gray-400 font-medium ${
                openSection === "company" || !openSection
                  ? "block"
                  : "hidden md:block"
              }`}
            >
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  About
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Brand Center
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-auto">
            <h2
              className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white flex justify-between items-center md:block cursor-pointer"
              onClick={() => toggleSection("help")}
            >
              Help center
              <FiChevronDown
                className={`ml-2 md:hidden ${
                  openSection === "help" ? "rotate-180" : ""
                }`}
              />
            </h2>
            <ul
              className={`text-gray-500 dark:text-gray-400 font-medium ${
                openSection === "help" || !openSection
                  ? "block"
                  : "hidden md:block"
              }`}
            >
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Discord Server
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Twitter
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Facebook
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-auto">
            <h2
              className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white flex justify-between items-center md:block cursor-pointer"
              onClick={() => toggleSection("legal")}
            >
              Legal
              <FiChevronDown
                className={`ml-2 md:hidden ${
                  openSection === "legal" ? "rotate-180" : ""
                }`}
              />
            </h2>
            <ul
              className={`text-gray-500 dark:text-gray-400 font-medium ${
                openSection === "legal" || !openSection
                  ? "block"
                  : "hidden md:block"
              }`}
            >
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Licensing
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-auto">
            <h2
              className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white flex justify-between items-center md:block cursor-pointer"
              onClick={() => toggleSection("download")}
            >
              Download
              <FiChevronDown
                className={`ml-2 md:hidden ${
                  openSection === "download" ? "rotate-180" : ""
                }`}
              />
            </h2>
            <ul
              className={`text-gray-500 dark:text-gray-400 font-medium ${
                openSection === "download" || !openSection
                  ? "block"
                  : "hidden md:block"
              }`}
            >
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  iOS
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Android
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Windows
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  MacOS
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="px-4 py-6 dark:bg-gray-700 md:flex md:items-center justify-center md:justify-between mx-auto w-full max-w-screen-xl">
          <span className="text-sm text-gray-500 dark:text-gray-300 text-center md:text-start block">
            © 2024{" "}
            <a href="/" className="hover:underline">
              Vaccination Management
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
            {/* Social icons */}
            <a
              href="#"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              {/* Facebook Icon */}
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fillRule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Facebook page</span>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              {/* Discord Icon */}
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 21 16"
              >
                <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.824c.144-.105.285-.214.42-.326 3.285 1.543 6.841 1.543 10.086 0 .141.12.28.236.418.348a10.816 10.816 0 0 1-1.71.826c.312.625.676 1.221 1.085 1.785a15.706 15.706 0 0 0 4.963-2.521 17.36 17.36 0 0 0-3.716-11.662ZM7.126 11.289c-1.073 0-1.955-.977-1.955-2.177 0-1.2.865-2.177 1.955-2.177 1.103 0 1.988.992 1.955 2.177 0 1.2-.865 2.177-1.955 2.177Zm6.718 0c-1.073 0-1.955-.977-1.955-2.177 0-1.2.865-2.177 1.955-2.177 1.103 0 1.988.992 1.955 2.177 0 1.2-.865 2.177-1.955 2.177Z" />
              </svg>
              <span className="sr-only">Discord community</span>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              {/* Twitter Icon */}
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 17"
              >
                <path
                  fillRule="evenodd"
                  d="M17.316 4.21c.01.139.01.28.01.419 0 4.275-3.25 9.2-9.2 9.2A9.14 9.14 0 0 1 0 12.713a6.521 6.521 0 0 0 .761.04 6.48 6.48 0 0 0 4.018-1.384A3.24 3.24 0 0 1 1.82 8.801a4.06 4.06 0 0 0 .613.055 3.42 3.42 0 0 0 .853-.109 3.24 3.24 0 0 1-2.592-3.182v-.04c.44.245.94.39 1.48.409A3.24 3.24 0 0 1 1.102 2.28 9.18 9.18 0 0 0 7.753 5.12 3.652 3.652 0 0 1 7.62 4.455a3.24 3.24 0 0 1 5.594-2.953 6.313 6.313 0 0 0 2.056-.784 3.244 3.244 0 0 1-1.423 1.8 6.435 6.435 0 0 0 1.865-.509 6.973 6.973 0 0 1-1.396 1.442Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Twitter page</span>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              {/* GitHub Icon */}
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 .222a10 10 0 0 0-3.162 19.486c.5.09.683-.215.683-.48 0-.237-.01-1.026-.014-1.859-2.78.603-3.368-1.342-3.368-1.342-.454-1.153-1.11-1.46-1.11-1.46-.908-.621.07-.609.07-.609 1.003.07 1.532 1.03 1.532 1.03.892 1.529 2.34 1.088 2.91.832.09-.646.35-1.088.637-1.338-2.22-.253-4.555-1.11-4.555-4.945 0-1.092.39-1.985 1.03-2.685-.104-.253-.447-1.27.098-2.648 0 0 .842-.27 2.758 1.025A9.547 9.547 0 0 1 10 4.801c.854.004 1.713.115 2.515.337 1.915-1.296 2.756-1.025 2.756-1.025.547 1.378.204 2.395.1 2.648.642.7 1.03 1.593 1.03 2.685 0 3.843-2.337 4.688-4.563 4.936.359.308.678.917.678 1.85 0 1.335-.012 2.415-.012 2.742 0 .269.18.576.688.479A10.005 10.005 0 0 0 10 .222Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">GitHub account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
