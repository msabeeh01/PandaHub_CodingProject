import { BiBell, BiCalendar } from "react-icons/bi";
import DropdownIcon from "./DropdownIcon";
import { TbMessageQuestion } from "react-icons/tb";
import UserIcon from "./Profile/UserIcon";
import Profile from "./Profile/Profile";
import SearchBar from "./SearchBar";
import Header from "./Header/Header";

const Navbar = () => {
  return (
    <nav className="flex gap-[50px] py-[44px] border-b border-[#DBDBDB]">
      <Header projectName="Placeholder P" />
      <SearchBar />
      <DropdownContainer />
      <Profile
        src="https://cdn-icons-png.flaticon.com/512/4042/4042171.png"
        userName="Placeholder"
        location="Placeholder"
        label="Profile"
        id="profile-menu"
      >
        <li role="menuitem">
          <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">
            Profile
          </a>
        </li>
      </Profile>
    </nav>
  );
};

const DropdownContainer = () => {
  return (
    <div className="flex gap-[24px]">
      <DropdownIcon
        icon={<BiCalendar className="h-[24px] w-[24px]" />}
        label="Schedule"
        id="schedule-menu"
      >
        <li role="menuitem">
          <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">
            Profile
          </a>
        </li>
      </DropdownIcon>

      <DropdownIcon
        icon={<TbMessageQuestion className="h-[24px] w-[24px]" />}
        label="Questions"
        id="question-menu"
      >
        <li role="menuitem">
          <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">
            Profile
          </a>
        </li>
      </DropdownIcon>

      <DropdownIcon
        icon={<BiBell className="h-[24px] w-[24px]" />}
        label="Notifications"
        id="notif-menu"
      >
        <li role="menuitem">
          <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">
            Profile
          </a>
        </li>
      </DropdownIcon>
    </div>
  );
};

export default Navbar;
