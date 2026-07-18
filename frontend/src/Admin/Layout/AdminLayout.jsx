import AdminHeader from "../componets/AdminHeader";
import AdminSidebar from "../componets/AdminSidebar";


function AdminLayout({ children }) {
  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <AdminHeader />

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;