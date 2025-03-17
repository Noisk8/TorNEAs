import { Outlet } from "@remix-run/react";

export default function EquiposLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  );
}
