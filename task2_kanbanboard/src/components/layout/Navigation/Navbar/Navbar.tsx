import { BiBell, BiCalendar } from "react-icons/bi";
import DropdownIcon from "./DropdownIcon";
import { TbMessageQuestion } from "react-icons/tb";
import Profile from "./Profile/Profile";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center w-full h-full">
      <div className="flex-1 max-w-md">
        <SearchBar />
      </div>
      <div className="flex items-center gap-4 lg:gap-[50px]">
        <DropdownContainer />
        <Profile
          src="https://cdn-icons-png.flaticon.com/512/4042/4042171.png"
          userName="Anima Agrawal"
          location="U.P, India"
          label="Profile"
          id="profile-menu"
        >
          <li role="menuitem">
            <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">
              Profile
            </a>
          </li>
        </Profile>
      </div>
    </nav>
  );
};

const DropdownContainer = () => {
  return (
    <div className="flex gap-4 lg:gap-[24px]">
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