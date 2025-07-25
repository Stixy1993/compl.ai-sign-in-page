"use client";
import { useAuth } from "../../lib/hooks/useAuth";
import { FaCog } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";
import Image from "next/image";
import {
  HiHome,
  HiFolderOpen,
  HiChartBar,
  HiDocumentText,
  HiPhotograph,
  HiPencilAlt,
  HiClipboardList,
  HiClipboardCheck,
  HiCheckCircle,
  HiTruck,
  HiClipboardCopy,
  HiOfficeBuilding,
  HiBadgeCheck,
  HiChevronLeft,
  HiChevronRight,
  HiViewGrid,
} from "react-icons/hi";
import LightbulbCheckAnimated from "../../components/LightbulbCheckAnimated";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const navItems = [
  { label: "Dashboard", icon: HiHome },
  { label: "Projects", icon: HiFolderOpen },
  { label: "Trackers", icon: HiChartBar },
  { label: "Documents", icon: HiDocumentText },
  { label: "Drawings", icon: HiPhotograph },
  { label: "Markups", icon: HiPencilAlt },
  { label: "Inspection Test Plans", icon: HiClipboardList },
  { label: "Inspection Test Reports", icon: HiClipboardCheck },
  { label: "Punch Lists", icon: HiCheckCircle },
  { label: "Procurement Tracker", icon: HiTruck },
  { label: "Delivery Acknowledgements", icon: HiClipboardCopy },
  { label: "Factory Acceptance Tests", icon: HiOfficeBuilding },
  { label: "Calibration & Licenses", icon: HiBadgeCheck, href: "/dashboard/calibration-licenses" },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!searchOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    // Focus the input when search opens
    if (inputRef.current) {
      inputRef.current.focus();
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);
  // Simulate no projects for first-time user
  const hasProjects = false;

  return (
    <div className="flex min-h-screen bg-blue-400">
      {/* Sidebar */}
      <aside
        className={`relative flex flex-col py-6 px-2 min-h-screen shadow-lg bg-white border-r border-gray-200 transition-all duration-200 ${collapsed ? "w-14" : "w-64 px-4"}`}
      >
        {/* Compl.ai Logo at the top of the sidebar, perfectly centered */}
        <div className={`flex items-center h-10 -mt-4 mb-4 transition-all duration-200 ${collapsed ? 'justify-center' : ''}`}>
          <Image
            src="/Compl.ai Logo Black.svg"
            alt="Compl.ai Logo Black"
            width={36}
            height={36}
            priority
          />
          {!collapsed && (
            <span className="ml-3 text-lg font-semibold text-gray-700 select-none">Menu</span>
          )}
        </div>
        <nav className="flex-1 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.label === "Dashboard";
            const isCalibration = item.label === "Calibration & Licenses";
            const buttonContent = (
              <>
                <Icon className={`w-8 h-8 ${isActive ? "text-blue-700" : "text-blue-500"}`} />
                {!collapsed && <span className="text-sm">{item.label}</span>}
              </>
            );
            return (
              <div key={item.label} className="relative group">
                {isCalibration ? (
                  <Link href={item.href!} legacyBehavior>
                    <a className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg text-left text-gray-700 hover:bg-blue-200 transition ${isActive ? "bg-blue-200 font-semibold text-blue-700" : ""} ${collapsed ? "justify-center" : ""}`}>{buttonContent}</a>
                  </Link>
                ) : (
                  <button
                    className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg text-left text-gray-700 hover:bg-blue-200 transition ${isActive ? "bg-blue-200 font-semibold text-blue-700" : ""} ${collapsed ? "justify-center" : ""}`}
                    disabled={item.label !== "Dashboard"}
                  >
                    {buttonContent}
                  </button>
                )}
                {collapsed && (
                  <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1 rounded bg-gray-800/80 text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20 transition-opacity duration-200">
                    {item.label}
                  </span>
                )}
              </div>
            );
          })}
        </nav>
        {/* Collapse toggle */}
        <button
          className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full p-2 shadow transition"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <HiChevronRight className="text-2xl" /> : <HiChevronLeft className="text-2xl" />}
        </button>
      </aside>
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-2 bg-blue-500 shadow-md">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-white">thinkcompl<span className="text-blue-200">.ai</span></span>
          </div>
          <div className="flex items-center gap-2">
            {/* Stylish Search Icon and Animated Search Box */}
            <div className="relative flex items-center group" ref={searchRef}>
              <button
                className={`flex items-center justify-center text-white text-2xl transition-all duration-200 rounded-full hover:bg-blue-400 hover:shadow-lg focus:outline-none ${searchOpen ? 'bg-blue-400 shadow-lg' : ''}`}
                style={{ width: 40, height: 40 }}
                onClick={() => setSearchOpen((v) => !v)}
                aria-label="Open search"
              >
                <HiOutlineSearch />
              </button>
              {/* Tooltip for Search */}
              <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 px-3 py-1 rounded bg-gray-800/80 text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20 transition-opacity duration-200 shadow-lg">Search</span>
              <div
                className={`absolute right-0 top-1/2 -translate-y-1/2 flex items-center transition-all duration-300 ${searchOpen ? 'w-64 opacity-100 ml-2' : 'w-0 opacity-0 ml-0'} overflow-hidden`}
                style={{ zIndex: 20 }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                  placeholder="Search..."
                  className="w-full px-5 py-2 bg-white text-gray-900 border-none shadow-lg rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-base transition-all duration-300"
                  style={{ minWidth: searchOpen ? 200 : 0 }}
                />
              </div>
            </div>
            <div className="relative group">
              <button
                className={
                  `flex items-center justify-center text-white text-xl transition-all duration-200 rounded-full hover:bg-blue-400 hover:shadow-lg focus:outline-none`
                }
                style={{ width: 40, height: 40 }}
                aria-label="Settings"
              >
                <FaCog />
              </button>
              {/* Tooltip for Settings */}
              <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 px-3 py-1 rounded bg-gray-800/80 text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20 transition-opacity duration-200 shadow-lg">Settings</span>
            </div>
            {user && user.photoURL ? (
              <div className="relative group flex items-center gap-2 px-2 py-1 rounded-full transition-all duration-200 hover:bg-blue-400/80 hover:shadow-lg cursor-pointer">
                <Image
                  src={user.photoURL}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="rounded-full border-2 border-blue-200"
                />
                {/* Tooltip for Profile */}
                <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 px-3 py-1 rounded bg-gray-800/80 text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20 transition-opacity duration-200 shadow-lg">Profile</span>
                <span className="text-white font-medium">{user.displayName}</span>
              </div>
            ) : (
              <span className="text-white font-medium">Not signed in</span>
            )}
          </div>
        </header>
        {/* Dashboard Heading */}
        <div className="px-4 pt-2 pb-2">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        </div>
        <main className="flex-1 px-0 max-w-5xl mx-auto w-full pt-12 relative">
          <div className="flex items-center justify-center min-h-[60vh] w-full">
            <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-xl w-full flex flex-col items-center">
              <h2 className="text-3xl font-bold text-black mb-4">
                Welcome{user && user.displayName ? ` ${user.displayName.split(' ')[0]}` : ''}!
              </h2>
              <p className="text-lg text-black mb-6 text-center">Here you can manage your projects, track progress, and access all your documents in one place.</p>
              <button className="mt-2 px-8 py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold shadow transition">Get Started</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 