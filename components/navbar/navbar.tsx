import { UserButton, auth } from "@clerk/nextjs";
import NavItems from "./navItems";
import Switch from "./switch";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

const Navbar = async () => {
    const { userId } = auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const stores = await prismadb.store.findMany({
        where: {
            userId
        }
    })

    return (
        <div>
            <div className="border-b h-16 flex items-center px-4">
                <Switch items={stores} />
                <NavItems />
                <div className="ml-auto flex items-center space-x-4">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    );
}

export default Navbar;