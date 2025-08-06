'use client'

import React, { useState } from "react";
import Navbar from "./Navbar/Navbar";
import SideNav from "./SideNav/SideNav";
import Header from "../Main/Header/Header";
import PurpleIcons from "../Main/Header/PurpleIcons";
import { BiPencil, BiPlus, BiMenu, BiX } from "react-icons/bi";
import { LiaLinkSolid } from "react-icons/lia";
import { KanbanBoard } from "@/components/Kanban/KanbanBoard";
import NavHeader from "./Navbar/Header/NavHeader";
import FilterBar from "../Main/Header/FilterBar";
import { FaPlus } from "react-icons/fa6";
import AvatarGroup from "@/components/AvatarGroup/AvatarGroup";

type Props = {};

const Navigation = (props: Props) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen">
      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col h-full">
        {/* Mobile Header */}
        <div className="border-b border-gray-200 flex items-center justify-between px-4 py-4 bg-white">
          <NavHeader projectName="Project M." />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {isMobileMenuOpen ? <BiX size={24} /> : <BiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="bg-white border-b border-gray-200 p-4">
            <SideNav />
          </div>
        )}

        {/* Mobile Main Content */}
        <div className="flex-1 overflow-hidden">
          <MobileMainArea />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-[280px_1fr] md:grid-rows-[auto_1fr] gap-0 h-full">
        {/* Logo area - top left */}
        <div className="border-r border-b border-gray-200 flex items-center px-6 py-[22px]">
          <NavHeader projectName="Project M." />
        </div>
        {/* Main navbar - top right */}
        <div className="border-b border-gray-200 flex items-center px-6 py-[22px]">
          <Navbar />
        </div>
        {/* Sidebar - bottom left */}
        <div className="border-r border-gray-200">
          <SideNav />
        </div>
        {/* Main content area - bottom right */}
        <MainArea />
      </div>
    </div>
  );
};

const MainArea = () => {
  return (
    <main className="flex flex-col p-6 overflow-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-start sm:items-center">
          <Header />
          <div className="flex gap-3">
            <PurpleIcons icon={BiPencil} />
            <PurpleIcons icon={LiaLinkSolid} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <PurpleIcons icon={FaPlus} boxSize={500} size={9} text="Invite" />
          <AvatarGroup/>
        </div>
      </div>
      <div className="mb-6">
        <FilterBar />
      </div>
      <div className="flex-1">
        <KanbanBoard />
      </div>
    </main>
  );
};

const MobileMainArea = () => {
  return (
    <main className="flex flex-col p-4 h-full overflow-auto">
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex justify-between items-center">
          <Header />
          <PurpleIcons icon={BiPlus} boxSize={15} size={9} text="Invite" />
        </div>
        <div className="flex gap-3">
          <PurpleIcons icon={BiPencil} />
          <PurpleIcons icon={LiaLinkSolid} />
        </div>
      </div>
      <div className="mb-4">
        <FilterBar />
      </div>
      <div className="flex-1">
        <KanbanBoard />
      </div>
    </main>
  );
};

export default Navigation;
