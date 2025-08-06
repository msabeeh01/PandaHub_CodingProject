import React from "react";

type SideNavItemProps = {
    icon: React.ReactNode;
    name: string;
    link?: string
};

const SideNavItem = (props: SideNavItemProps) => {
  return(
    <div className="flex gap-[14px] items-center px-[12px] py-[14px]">
      {props.icon}
      <p className="text-[16px] text-[#787486]">{props.name}</p>
    </div>
  );
};

export default SideNavItem;
