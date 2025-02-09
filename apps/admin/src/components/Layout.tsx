export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <div className="w-64 border-r bg-gray-100/40 p-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold">디프만 16기</h2>
          </div>

          <div className="space-y-4">
            <div className="font-medium hover:bg-gray-200 p-2 rounded-md cursor-pointer">출결 관리</div>
            <div className="font-medium hover:bg-gray-200 p-2 rounded-md cursor-pointer">증빙 관리</div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
