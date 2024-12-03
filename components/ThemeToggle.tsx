"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
// import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from "next-themes";

type ThemeToggleProps = {
  side?: "left" | "top" | "right" | "bottom";
};

const ThemeToggle = ({ side }: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="ghost"
          className={
            theme === "light"
              ? "text-black border-none"
              : "text-white border-none"
          }
        >
          {theme !== "light" ? (
            <MoonIcon
              color={theme === "light" ? "black" : "white"}
              className={`absolute h-[2.3rem] w-[2.3rem] rotate-0 scale-100 transition-all ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            />
          ) : (
            <SunIcon
              color=""
              className={`h-[2.3rem] w-[2.3rem] rotate-0 scale-100 transition-all ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        className={
          theme === "light" ? "text-black text-lg" : "text-white text-lg"
        }
      >
        <DropdownItem
          onClick={() => {
            setTheme("light");
          }}
        >
          Light
        </DropdownItem>
        <DropdownItem onClick={() => setTheme("dark")}>Dark</DropdownItem>
        {/* <DropdownItem onClick={() => setTheme("system")}>System</DropdownItem> */}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ThemeToggle;
