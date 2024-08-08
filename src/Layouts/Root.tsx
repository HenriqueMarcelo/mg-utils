import { Outlet } from "react-router-dom";
import { Header } from "../Components/Header";

export default function Root() {
    return (
      <>
        <Header />
        <div className="mt-16" id="detail">
            <Outlet />
        </div>
      </>
    );
  }