// import NavBar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

function ProtectedLayout() {
  return (
    <div>
      {/* <NavBar /> */}
      <main>
        <h1>Welcome to Artist Management Syayem</h1>
        <div className="flex h-[calc(100vh-72px)] w-full items-center justify-center">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default ProtectedLayout;
