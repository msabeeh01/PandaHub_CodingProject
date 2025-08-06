import { GrGrid, GrTasks } from "react-icons/gr";
import SideNavItem from "./SideNavPageItem";
import SideNavProjectItem from "./SideNavProjectItem";
import { BiCircle, BiMessageSquare } from "react-icons/bi";
import { BsCircleFill, BsPlusSquare } from "react-icons/bs";
import { PiCircleFill, PiPlusSquare } from "react-icons/pi";
import { RiCircleFill } from "react-icons/ri";
import { FaTasks } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { FcSettings } from "react-icons/fc";
import { IoSettings, IoSettingsOutline } from "react-icons/io5";

const SideNav = () => {
  return (
    <aside className="flex flex-col w-full md:w-[280px]">
      <SideNavItems />
      <SideNavProjectItems />
    </aside>
  );
};

const SideNavItems = () => {
  return (
    <div className="flex flex-col px-[24px] w-full">
      <div className="py-[12px]">
        <SideNavItem
          icon={<GrGrid width={24} height={24} color="#787486" />}
          name="Home"
        />
        <SideNavItem
          icon={<BiMessageSquare width={24} height={24} color="#787486" />}
          name="Messages"
        />
        <SideNavItem
          icon={<FaTasks width={24} height={24} color="#787486" />}
          name="Tasks"
        />
        <SideNavItem
          icon={<CgProfile width={24} height={24} color="#787486" />}
          name="Members"
        />
        <SideNavItem
          icon={<IoSettingsOutline width={24} height={24} color="#787486" />}
          name="Settings"
        />
      </div>
      <hr className="border-t border-gray-200" />
    </div>
  );
};

const SideNavProjectItems = () => {
  return (
    <div className="w-full px-[12px] py-[12px]">
      <div className="flex justify-between items-center px-[12px] py-[12px]">
        <p className="font-bold text-[12px] text-[#787486]">MY PROJECTS </p>
        <a href="/">
          <BsPlusSquare />
        </a>
      </div>
      <SideNavProjectItem
        icon={<RiCircleFill color="#787486" className="h-[8px] w-[8px]" />}
        name="Mobile App"
      />
      <SideNavProjectItem
        icon={<RiCircleFill color="red" className="h-[8px] w-[8px]" />}
        name="Website Redesign"
      />
      <SideNavProjectItem
        icon={<RiCircleFill color="orange" className="h-[8px] w-[8px]" />}
        name="Design System"
      />
      <SideNavProjectItem
        icon={<RiCircleFill color="green" className="h-[8px] w-[8px]" />}
        name="Wireframes"
      />
    </div>
  );
};

export default SideNav;