import React from "react";
import Navbar from "./Navbar/Navbar";
import SideNav from "./SideNav/SideNav";
import Header from "../Main/Header/Header";
import PurpleIcons from "../Main/Header/PurpleIcons";
import { BiPencil } from "react-icons/bi";
import { LiaLinkSolid } from "react-icons/lia";
import KanbanBoard from "@/components/Kanban/KanbanBoard";

type Props = {};

const Navigation = (props: Props) => {
  return (
    <div>
      <Navbar />
      <SideMainArea />
    </div>
  );
};

const SideMainArea = () => {
  return (
    <div className="flex">
      <SideNav />
      <MainArea />
    </div>
  );
};

const MainArea = () => {
  return (
    <main className="flex flex-row items-start p-[24px]">
      <div className="flex flex-col">
        <div className="flex gap-[20px]  items-center">
          <Header />
          <div className="flex gap-[12px]">
            <PurpleIcons icon={BiPencil} />
            <PurpleIcons icon={LiaLinkSolid} />
          </div>
        </div>

        <KanbanBoard />
      </div>
    </main>
  );
};

export default Navigation;
