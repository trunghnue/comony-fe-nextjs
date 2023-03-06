import AppLogo from "@/components/atoms/AppLogo/AppLogo";
import { useMemo } from "react";

export default function Header({ bgColor }: { bgColor: string }) {
  const iconColor = useMemo(() => {
    return bgColor === "white" ? "black" : "white";
  }, [bgColor]);

  return (
    <header>
      <AppLogo iconColor={iconColor} size="small" direction="vertical" />
    </header>
  );
}
