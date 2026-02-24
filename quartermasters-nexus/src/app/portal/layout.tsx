import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PortalSidebar } from "@/components/portal/PortalSidebar";

export default function PortalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute>
            <div className="flex h-screen overflow-hidden bg-[#001429]">
                {/* Sidebar (Desktop) */}
                <div className="hidden md:block">
                    <PortalSidebar />
                </div>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto relative">
                    {/* Ambient Background Glows */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#002147] blur-[120px] rounded-full mix-blend-screen opacity-50" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#C15A2C]/10 blur-[120px] rounded-full mix-blend-screen opacity-50" />
                    </div>

                    <div className="relative z-10 w-full">
                        {children}
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
