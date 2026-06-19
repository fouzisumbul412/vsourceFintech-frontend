import React from "react";
import Navbar from "../Navbar";

interface LayoutProps {
  children: React.ReactNode;
  showNavbar?: boolean;
}

export function Layout({
  children,
  showNavbar = true,
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {showNavbar && <Navbar />}
      <main className="flex-1">{children}</main>
    </div>
  );
}