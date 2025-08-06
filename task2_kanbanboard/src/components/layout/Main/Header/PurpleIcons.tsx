import React from "react";
import { IconType } from "react-icons";

type Props = {
  icon: IconType;
};

const PurpleIcons = ({ icon: Icon }: Props) => {
  return (
    <div className="bg-[rgb(80_48_229_/_0.2)] rounded-lg h-[25px] w-[25px] flex items-center justify-center">
      <Icon color="#5030E5" size={13} />
    </div>
  );
};

export default PurpleIcons;
