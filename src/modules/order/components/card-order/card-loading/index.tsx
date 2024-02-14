export function CardLoading() {
  return (
    <div
      data-cy="card-loading"
      className="p-2 bg-white rounded-lg font-inter animate-pulse space-y-4"
    >
      <div className="bg-gray-800 h-4 w-20 rounded"></div>

      <hr className="border border-slate-200" />

      <div className="flex items-center justify-between">
        <div className="bg-gray-800 h-4 w-32 rounded"></div>
        <div className="bg-gray-800 h-4 w-20 rounded"></div>
      </div>

      <div className="flex items-center justify-between">
        <div className="bg-gray-800 h-4 w-20 rounded"></div>
        <div className="bg-gray-800 h-4 w-24 rounded"></div>
      </div>

      <div>
        <div className="bg-gray-800 h-4 w-20 rounded"></div>
        <div className="bg-gray-800 h-4 w-full rounded mt-4"></div>
      </div>

      <div className="flex justify-between items-center gap-2">
        <button className="font-rubik font-semibold rounded text-xs w-full h-8 bg-gray-800"></button>
        <button className="font-rubik font-semibold rounded text-xs w-full h-8 bg-gray-800"></button>
      </div>
    </div>
  );
}
