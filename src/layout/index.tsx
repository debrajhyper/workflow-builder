import { Outlet } from "react-router-dom";
import { Header } from "@Components";

export function Layout() {
    return (
        <div className="h-screen">
            <Header />
            <Outlet />
        </div>
    )
}