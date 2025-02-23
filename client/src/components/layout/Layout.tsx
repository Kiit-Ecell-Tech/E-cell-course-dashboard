import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import CourseAnnouncement from "../course/CourseAnnouncement";
import Dashboard from "../course/Dashboard";
import Footer from "./Footer";
import DescriptionBox from "./DescriptioBox";
import TaskApp from "./TaskApp";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [openSection, setOpenSection] = useState<number | null>(null);
  const [login, updateLoginStatus] = useState(false);
  const [loginUser, updateLoginStatusUser] = useState(false);

  const [editState, updateEditState] = useState(false);
  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };
  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("userType") === "admin"
    ) {
      updateLoginStatus(true);
    }
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("userType") === "user"
    ) {
      updateLoginStatusUser(true);
    }
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar
        openSection={openSection}
        toggleSection={toggleSection}
        updateLoginStatus={updateLoginStatus}
        login={login}
        loginUser={loginUser}
        updateLoginStatusUser={updateLoginStatusUser}
      />

      <div className="flex-1 flex">
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="fixed h-screen w-64">
            <Sidebar
              openSection={openSection}
              toggleSection={toggleSection}
              updateLoginStatus={updateLoginStatus}
              login={login}
              loginUser={loginUser}
              updateLoginStatusUser={updateLoginStatusUser}
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="p-4 mt-5">
            <CourseAnnouncement />
          </div>

          <div className="max-w-3xl mx-auto">
            <DescriptionBox title="Welcome to Our Course" description="xyzzz" />
          </div>

          <div className="p-4">
            <Dashboard
              openSection={openSection}
              toggleSection={toggleSection}
              login={login}
              editState={editState}
              updateEditState={updateEditState}
              loginUser={loginUser}
            />
          </div>
          <TaskApp />
          <div className="p-4">
            <Footer />
          </div>

          <main className="p-4">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
