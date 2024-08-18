import React from "react";
import { BiMenu } from "react-icons/bi";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
const Tabs = ({ tab, setTab }) => {
  const {dispatch} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  return (
    <div>
      <div>
        <span className="lg:hidden">
          <BiMenu className="w-6 h-6 cursor-pointer" />
        </span>
        <div className="hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md">
          <button
            onClick={() => setTab("overview")}
            className={`${
              tab === "overview"
                ? "bg-indigo-100 text-primaryColor"
                : "bg-transparent text-headingColor"
            } w-full btn mt-0 rounded-md`}
          >
            overview
          </button>
          <button
            onClick={() => setTab("appointments")}
            className={`${
              tab === "appointments"
                ? "bg-indigo-100 text-primaryColor"
                : "bg-transparent text-headingColor"
            } w-full btn mt-0 rounded-md`}
          >
            appointments
          </button>
          <button
            onClick={() => setTab("settings")}
            className={`${
              tab === "settings"
                ? "bg-indigo-100 text-primaryColor"
                : "bg-transparent text-headingColor"
            } w-full btn mt-0 rounded-md`}
          >
            profile
          </button>

          <div className="mt-[100px] w-full">
            <button
              className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
              onClick={handleLogout}
            >
              logout
            </button>
            <button className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white">
              delete account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
