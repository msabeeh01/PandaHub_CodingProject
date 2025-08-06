"use client";

import { useState } from "react";
import { BiSearch } from "react-icons/bi";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  return (
    <form
      action=""
      role="search"
      className="bg-[#F5F5F5] rounded-sm h-[44px] max-w-[417px] pl-4 gap-2 items-center flex"
    >
      <BiSearch width={22} height={22} />
      <input
        type="search"
        className="w-full h-full"
        placeholder="Search for anything..."
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
