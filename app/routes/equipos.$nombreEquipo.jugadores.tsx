import { Outlet } from "@remix-run/react";

export default function JugadoresLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <Outlet />
      </div>
    </div>
  );
}
