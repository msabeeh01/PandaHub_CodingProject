import React from "react";

type SideNavProjectItemProps = {
    icon: React.ReactNode;
    name: string;
    link?: string
};

const SideNavProjectItem = (props: SideNavProjectItemProps) => {
  return(
    <a href="/" className="flex hover:bg-[rgb(80_48_229_/_8%)] gap-[14px] items-center px-[12px] py-[14px] rounded-[5px]">
      {props.icon}
      <p className="text-[16px] font-semibold">{props.name}</p>
    </a>
  );
};

export default SideNavProjectItem;
