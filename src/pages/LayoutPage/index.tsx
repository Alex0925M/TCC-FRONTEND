import { Outlet } from "react-router";
import { Infobar } from "../../components/Infobar";
import { Sidebar } from "../../components/Sidebar";

export function LayoutPage() {
    return (
        <>
            <Infobar />

            <div className='flex h-full'>
                <Sidebar />

                <Outlet />
            </div>
        </>
    );
};
