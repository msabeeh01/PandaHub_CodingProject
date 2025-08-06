import React from 'react';
import { HiOutlineFilter, HiOutlineViewGrid } from 'react-icons/hi';
import { BsCalendar3 } from 'react-icons/bs';
import { IoShareOutline } from 'react-icons/io5';
import { HiViewGrid } from 'react-icons/hi';
import { BiChevronDown } from 'react-icons/bi';
import { HiBars2 } from 'react-icons/hi2';

const FilterBar = () => {
  return (
    <div className="flex items-center justify-between w-full py-[30px] bg-white">
      {/* Left side - Filter and Today buttons */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <HiOutlineFilter className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Filter</span>
          <BiChevronDown className="w-4 h-4 text-gray-500" />
        </button>
        
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <BsCalendar3 className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Today</span>
          <BiChevronDown className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Right side - Share and Grid buttons */}
      <div className="flex items-center gap-3">
        
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <IoShareOutline className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Share</span>
        </button>
        
        <div className="h-6 w-px bg-gray-300"></div>


        <button className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
          <HiBars2 className="w-5 h-5 text-white" />
        </button>        
        
        <button className="p-2 bg-white rounded-lg hover:bg-blue-700 transition-colors">
          <HiOutlineViewGrid className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default FilterBar;