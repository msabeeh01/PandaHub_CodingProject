import { BiCake } from "react-icons/bi";
import { CgChevronDoubleLeft } from "react-icons/cg";

interface HeaderProps {
  projectName: string;
}

const NavHeader = ({ projectName }: HeaderProps) => {
  return (
    <a href="/projects" className="flex items-center justify-between w-full">
      <div className="flex items-center gap-[9px]">
        <BiCake width={24} height={24} />
        <p className="text-[20px] font-semibold text-nowrap">{projectName}</p>
      </div>

      <div>
        <CgChevronDoubleLeft width={24} height={24} />
      </div>
    </a>
  );
};

export default NavHeader;
