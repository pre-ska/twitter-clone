import Image from 'next/image';
import React from 'react';
import SidebarMenuItem from './SidebarMenuItem';
import { HashtagIcon, HomeIcon } from '@heroicons/react/24/solid';
import {
  BellIcon,
  BookmarkIcon,
  ClipboardIcon,
  EllipsisHorizontalCircleIcon,
  EllipsisHorizontalIcon,
  InboxIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
const Sidebar = () => {
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full">
      {/*  twitter logo */}
      <div className="hoverEffect p-0 hover:bg-blue-100 xl:p-1">
        <Image
          src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
          width="50"
          height="50"
          alt="twitter logo"
        />
      </div>

      {/*  menu */}
      <div className="mt-4 mb-2.5 xl:items-start">
        <SidebarMenuItem text="Home" Icon={HomeIcon} active />
        <SidebarMenuItem text="Explore" Icon={HashtagIcon} />
        <SidebarMenuItem text="Notifications" Icon={BellIcon} />
        <SidebarMenuItem text="Messages" Icon={InboxIcon} />
        <SidebarMenuItem text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarMenuItem text="List" Icon={ClipboardIcon} />
        <SidebarMenuItem text="Profile" Icon={UserIcon} />
        <SidebarMenuItem text="More" Icon={EllipsisHorizontalCircleIcon} />
      </div>

      {/*  button */}

      <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">
        Tweet
      </button>

      {/*  mini profile */}

      <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
        <Image
          src="https://avatars.githubusercontent.com/u/18500014?v=4"
          alt="user image"
          width="50"
          height="50"
          className="h-10 w-10 rounded-full xl:mr-2"
        />

        <div className="leading-5 hidden xl:inline">
          <h4 className="font-bold">pre-ska</h4>
          <p className="text-gray-500">@pre-ska</p>
        </div>
        <EllipsisHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
      </div>
    </div>
  );
};

export default Sidebar;
