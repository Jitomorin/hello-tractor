import { classNames } from "@/contexts/utils";
import { getUrl } from "@/utils/formatString";
import Link from "next/link";
import React from "react";

const DashboardTab = ({ router, tabs }: any) => {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-[#1C4D9C] focus:ring-[#1C4D9C]"
          defaultValue={tabs
            .find((tab: any) => getUrl(router) === tab.slug.toLowerCase())
            ?.toString()}
        >
          {tabs.map((tab: any) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab: any) => (
            <Link
              key={tab.name}
              href={tab.href}
              className={classNames(
                getUrl(router) === tab.slug.toLowerCase()
                  ? "bg-[#1c4d9c1c] text-[#1C4D9C]"
                  : "text-gray-500 hover:text-gray-700",
                "rounded-md px-3 py-2 text-lg font-medium"
              )}
              aria-current={tab.current ? "page" : undefined}
            >
              {tab.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default DashboardTab;
