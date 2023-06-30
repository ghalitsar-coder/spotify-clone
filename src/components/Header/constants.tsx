import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

export const mobileNavigations = [
  {
    label: "Home",
    href: "/",
    icon: <HiHome />,
  },
  {
    label: "Search",
    href: "/search",
    icon: <BiSearch />,
  },
];
export const routeNavigation = [
  { name: "left", icon: <RxCaretLeft key={"left-caret"} /> },
  { name: "right", icon: <RxCaretRight key={"right-caret"} /> },
];

export const authNavigation = [
  {
    label: "Sign Up",
    className: `bg-transparent text-neutral-300 font-medium hover:text-green-500  `,
    href: "/sign-up",
  },
  {
    label: "Sign In",
    className: `bg-white px-6 py-2 hover:bg-slate-100/75 `,
    href: "/sign-in",
  },
];
