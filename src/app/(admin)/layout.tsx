import { MenuAdmin } from "@/components/reusable/admin/MenuAdmin";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="bg-background md:flex min-h-screen">
      <MenuAdmin />
        <div className="mx-auto my-auto page-container">
          {children}
        </div>
      </div>
    </>
  );
}
