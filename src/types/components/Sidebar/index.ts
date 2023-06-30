import { ReactNode } from "react";
import { IconType } from "react-icons";
export interface RoutesProps {
  label: string;
  active: boolean;
  href: string;
  icon: ReactNode;
}
