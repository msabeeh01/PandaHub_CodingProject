import React from "react";
import { IconType } from "react-icons";

type Props = {
  icon: IconType;
  size?: number;
  boxSize?: number;
  text?: string;
};

const PurpleIcons = ({ icon: Icon, size, boxSize, text }: Props) => {
  return (
    <a href="/" className="flex items-center">
      <div
        className={`bg-[rgb(80_48_229_/_0.2)] rounded-lg flex items-center justify-center
      ${boxSize ? `h-[${boxSize}px] w-[${boxSize}px]` : "h-[25px] w-[25px]"}
    `}
      >
        <Icon color="#5030E5" size={size ?? 13} />
      </div>

      {text && <p className="text-[#5030E5] text-[16px] ml-[8px]">{text}</p>}
    </a>
  );
};

export default PurpleIcons;
