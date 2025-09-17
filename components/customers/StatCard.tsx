export default function StatCard({ title, value, accent }: { title: string; value: React.ReactNode; accent?: string }) {
  return (
    <div className={`bg-white border rounded-lg p-5 shadow-sm flex items-center justify-between`}> 
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold mt-2">{value}</p>
      </div>
      <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
        {/* placeholder for small icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>
  );
}