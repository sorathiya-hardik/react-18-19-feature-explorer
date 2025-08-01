import React, { Suspense, useState, lazy } from 'react'

// Lazy load the LazyComponent
const LazyComponent = lazy(() => import('./LazyComponent'))

// Mock async data component
const AsyncDataComponent: React.FC<{ data: string }> = ({ data }) => {
  return (
    <div className='bg-green-50 border border-green-200 rounded-lg p-4 mt-4'>
      <h4 className='font-semibold text-green-800'>
        Data Loaded Successfully!
      </h4>
      <p className='text-green-700'>{data}</p>
    </div>
  )
}

// Mock user info component
const UserInfoComponent: React.FC<{
  user: { name: string; email: string }
}> = ({ user }) => {
  return (
    <div className='bg-purple-50 border border-purple-200 rounded-lg p-4 mt-4'>
      <h4 className='font-semibold text-purple-800'>User Information</h4>
      <p className='text-purple-700'>Name: {user.name}</p>
      <p className='text-purple-700'>Email: {user.email}</p>
    </div>
  )
}

export const SuspenseDemo: React.FC = () => {
  const [showLazyComponent, setShowLazyComponent] = useState(false)
  const [showData, setShowData] = useState(false)
  const [showUserInfo, setShowUserInfo] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [isLoadingUser, setIsLoadingUser] = useState(false)
  const [data, setData] = useState<string | null>(null)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  // Mock data loading function
  const loadData = async () => {
    setIsLoadingData(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setData('This is mock data loaded asynchronously from an API!')
    setIsLoadingData(false)
    setShowData(true)
  }

  // Mock user loading function
  const loadUserInfo = async () => {
    setIsLoadingUser(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setUser({
      name: 'John Doe',
      email: 'john.doe@example.com',
    })
    setIsLoadingUser(false)
    setShowUserInfo(true)
  }

  // Clear all functionality
  const clearAll = () => {
    setShowLazyComponent(false)
    setShowData(false)
    setShowUserInfo(false)
    setIsLoadingData(false)
    setIsLoadingUser(false)
    setData(null)
    setUser(null)
  }

  // Check if any content is loaded
  const hasLoadedContent = showLazyComponent || showData || showUserInfo

  return (
    <div className='space-y-6'>
      <div className='bg-white rounded-lg shadow-md p-6'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>
          Enhanced Suspense in React 18/19
        </h2>
        <p className='text-gray-600 mb-6'>
          Demonstrates React Suspense for code splitting, data fetching, and
          lazy loading.
        </p>

        {/* Button Controls */}
        <div className='flex flex-wrap gap-4 mb-6'>
          <button
            onClick={() => setShowLazyComponent(true)}
            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors'
            disabled={showLazyComponent}
          >
            {showLazyComponent
              ? 'Lazy Component Loaded'
              : 'Load Lazy Component'}
          </button>

          <button
            onClick={loadData}
            className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors'
            disabled={isLoadingData || showData}
          >
            {isLoadingData
              ? 'Loading Data...'
              : showData
                ? 'Data Loaded'
                : 'Load Data'}
          </button>

          <button
            onClick={loadUserInfo}
            className='bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors'
            disabled={isLoadingUser || showUserInfo}
          >
            {isLoadingUser
              ? 'Loading User...'
              : showUserInfo
                ? 'User Loaded'
                : 'Load User Info'}
          </button>

          {/* Clear All Button - only show when there's content to clear */}
          {hasLoadedContent && (
            <button
              onClick={clearAll}
              className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors ml-auto'
              disabled={isLoadingData || isLoadingUser}
            >
              Clear All
            </button>
          )}
        </div>

        {/* Loading States */}
        {isLoadingData && (
          <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4'>
            <div className='flex items-center'>
              <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-2'></div>
              <span className='text-yellow-800'>Loading data...</span>
            </div>
          </div>
        )}

        {isLoadingUser && (
          <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4'>
            <div className='flex items-center'>
              <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2'></div>
              <span className='text-blue-800'>Loading user information...</span>
            </div>
          </div>
        )}

        {/* Content Sections */}
        <div className='space-y-4'>
          {/* Lazy Component Section */}
          {showLazyComponent && (
            <Suspense
              fallback={
                <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
                  <div className='flex items-center'>
                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2'></div>
                    <span className='text-blue-800'>
                      Loading lazy component...
                    </span>
                  </div>
                </div>
              }
            >
              <LazyComponent />
            </Suspense>
          )}

          {/* Data Section */}
          {showData && data && <AsyncDataComponent data={data} />}

          {/* User Info Section */}
          {showUserInfo && user && <UserInfoComponent user={user} />}
        </div>

        <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
          <h3 className='font-semibold text-gray-800 mb-2'>
            Features Demonstrated:
          </h3>
          <ul className='text-sm text-gray-600 space-y-1'>
            <li>
              • <strong>Code Splitting:</strong> LazyComponent is loaded on
              demand
            </li>
            <li>
              • <strong>Suspense Boundaries:</strong> Graceful loading states
              with fallbacks
            </li>
            <li>
              • <strong>Async Data Loading:</strong> Simulated API calls with
              loading indicators
            </li>
            <li>
              • <strong>Progressive Loading:</strong> Load components and data
              independently
            </li>
            <li>
              • <strong>State Management:</strong> Clear All functionality to
              reset and retry demos
            </li>
            <li>
              • <strong>Error Boundaries:</strong> Wrapped with error handling
              (from App.tsx)
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
