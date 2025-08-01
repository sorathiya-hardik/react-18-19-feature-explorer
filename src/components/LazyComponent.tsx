export default function LazyComponent() {
  return (
    <div className='bg-purple-50 p-6 rounded-lg border border-purple-200'>
      <h3 className='text-lg font-semibold text-purple-800 mb-3'>
        🚀 Lazy Loaded Component
      </h3>
      <p className='text-purple-700 mb-4'>
        This component was loaded on-demand using React.lazy() and Suspense. It
        demonstrates code splitting and lazy loading capabilities.
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='bg-white p-3 rounded border'>
          <h4 className='font-semibold text-gray-800 mb-2'>
            📦 Code Splitting
          </h4>
          <p className='text-sm text-gray-600'>
            This component is in a separate bundle that only loads when needed.
          </p>
        </div>
        <div className='bg-white p-3 rounded border'>
          <h4 className='font-semibold text-gray-800 mb-2'>⚡ Performance</h4>
          <p className='text-sm text-gray-600'>
            Reduces initial bundle size and improves loading performance.
          </p>
        </div>
      </div>
    </div>
  )
}
