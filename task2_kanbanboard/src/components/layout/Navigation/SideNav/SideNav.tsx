import { GrGrid } from "react-icons/gr";
import SideNavItem from "./SideNavPageItem";
import SideNavProjectItem from "./SideNavProjectItem";
import { BiCircle } from "react-icons/bi";
import { BsCircleFill, BsPlusSquare } from "react-icons/bs";
import { PiCircleFill, PiPlusSquare } from "react-icons/pi";
import { RiCircleFill } from "react-icons/ri";

const SideNav = () => {
  return (
    <aside className="flex flex-col border-r border-[#DBDBDB] w-fit">
      <SideNavItems />
      <SideNavProjectItems />
    </aside>
  );
};

const SideNavItems = () => {
  return (
    <div className="w-[250px] py-[24px] mr-[12px]">

      <SideNavItem
        icon={<GrGrid width={24} height={24} color="#787486" />}
        name="Home"
      />
      <SideNavItem
        icon={<GrGrid width={24} height={24} color="#787486" />}
        name="Home"
      />
      <SideNavItem
        icon={<GrGrid width={24} height={24} color="#787486" />}
        name="Home"
      />
      <SideNavItem
        icon={<GrGrid width={24} height={24} color="#787486" />}
        name="Home"
      />
      <SideNavItem
        icon={<GrGrid width={24} height={24} color="#787486" />}
        name="Home"
      />
            <hr className="my-4 border-t border-gray-200" />
    </div>
  );
};

const SideNavProjectItems = () => {
  return (
    <div className="w-[250px] pr-[12px]">
      <div className="flex justify-between items-center">
        <p>My Projects </p>
        <a href="/">
          <BsPlusSquare />
        </a>
      </div>

      <SideNavProjectItem
        icon={<RiCircleFill color="#787486" className="h-[8px] w-[8px]" />}
        name="Home"
      />
      <SideNavProjectItem
        icon={<RiCircleFill color="red" className="h-[8px] w-[8px]" />}
        name="Home"
      />
      <SideNavProjectItem
        icon={<RiCircleFill color="orange" className="h-[8px] w-[8px]" />}
        name="Home"
      />
      <SideNavProjectItem
        icon={<RiCircleFill color="green" className="h-[8px] w-[8px]" />}
        name="Home"
      />
    </div>
  );
};

export default SideNav;
