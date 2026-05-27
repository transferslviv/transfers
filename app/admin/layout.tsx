export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-page text-[#070707]">
      {children}
    </div>
  );
}
