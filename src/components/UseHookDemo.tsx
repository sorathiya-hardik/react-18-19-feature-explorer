import { use, Suspense } from 'react'

// Simulate realistic API calls
const fetchUserProfile = (userId: string) => {
  return new Promise<{
    id: string
    name: string
    email: string
    avatar: string
    role: string
    joinDate: string
  }>(resolve => {
    setTimeout(
      () =>
        resolve({
          id: userId,
          name: 'Sarah Johnson',
          email: 'sarah.johnson@example.com',
          avatar: '👩‍💼',
          role: 'Senior Developer',
          joinDate: '2022-03-15',
        }),
      1200
    )
  })
}

const fetchUserStats = (_userId: string) => {
  return new Promise<{
    posts: number
    followers: number
    following: number
    projects: number
  }>(resolve => {
    setTimeout(
      () =>
        resolve({
          posts: 847,
          followers: 2340,
          following: 892,
          projects: 23,
        }),
      800
    )
  })
}

const fetchRecentActivity = () => {
  return new Promise<
    Array<{
      id: string
      type: string
      description: string
      timestamp: string
    }>
  >(resolve => {
    setTimeout(
      () =>
        resolve([
          {
            id: '1',
            type: 'commit',
            description: 'Fixed authentication bug',
            timestamp: '2 hours ago',
          },
          {
            id: '2',
            type: 'review',
            description: 'Reviewed PR #342',
            timestamp: '4 hours ago',
          },
          {
            id: '3',
            type: 'deployment',
            description: 'Deployed to production',
            timestamp: '1 day ago',
          },
          {
            id: '4',
            type: 'meeting',
            description: 'Team standup meeting',
            timestamp: '1 day ago',
          },
        ]),
      1000
    )
  })
}

// Component that uses the 'use' hook to read user profile
function UserProfile({ userPromise }: { userPromise: Promise<any> }) {
  const user = use(userPromise)

  return (
    <div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200'>
      <div className='flex items-center gap-4 mb-4'>
        <div className='text-4xl'>{user.avatar}</div>
        <div>
          <h3 className='text-xl font-bold text-gray-900'>{user.name}</h3>
          <p className='text-blue-600 font-medium'>{user.role}</p>
          <p className='text-gray-500 text-sm'>{user.email}</p>
        </div>
      </div>
      <div className='text-sm text-gray-600'>
        <span className='inline-flex items-center gap-1'>
          📅 Joined {user.joinDate}
        </span>
      </div>
    </div>
  )
}

// Component that uses the 'use' hook to read user statistics
function UserStats({ statsPromise }: { statsPromise: Promise<any> }) {
  const stats = use(statsPromise)

  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
      {[
        {
          label: 'Posts',
          value: stats.posts,
          icon: '📝',
          color: 'text-green-600',
        },
        {
          label: 'Followers',
          value: stats.followers.toLocaleString(),
          icon: '👥',
          color: 'text-blue-600',
        },
        {
          label: 'Following',
          value: stats.following,
          icon: '➕',
          color: 'text-purple-600',
        },
        {
          label: 'Projects',
          value: stats.projects,
          icon: '🚀',
          color: 'text-orange-600',
        },
      ].map((stat, index) => (
        <div
          key={index}
          className='bg-white rounded-lg p-4 border shadow-sm hover:shadow-md transition-shadow'
        >
          <div className='text-2xl mb-2'>{stat.icon}</div>
          <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
          <div className='text-gray-500 text-sm'>{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

// Component that uses the 'use' hook to read recent activity
function RecentActivity({
  activityPromise,
}: {
  activityPromise: Promise<any>
}) {
  const activities = use(activityPromise)

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'commit':
        return '💻'
      case 'review':
        return '👀'
      case 'deployment':
        return '🚀'
      case 'meeting':
        return '🤝'
      default:
        return '📌'
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'commit':
        return 'bg-green-100 text-green-800'
      case 'review':
        return 'bg-blue-100 text-blue-800'
      case 'deployment':
        return 'bg-purple-100 text-purple-800'
      case 'meeting':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className='space-y-3'>
      {activities.map((activity: any) => (
        <div
          key={activity.id}
          className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'
        >
          <div className='text-xl'>{getActivityIcon(activity.type)}</div>
          <div className='flex-1'>
            <p className='text-gray-900 font-medium'>{activity.description}</p>
            <p className='text-gray-500 text-sm'>{activity.timestamp}</p>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getActivityColor(activity.type)}`}
          >
            {activity.type}
          </span>
        </div>
      ))}
    </div>
  )
}

export function UseHookDemo() {
  // Create promises for the demo - these would typically come from props or context
  const userProfilePromise = fetchUserProfile('user-123')
  const userStatsPromise = fetchUserStats('user-123')
  const recentActivityPromise = fetchRecentActivity()

  return (
    <div className='space-y-8'>
      <div className='text-center'>
        <h2 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4'>
          React 19 use Hook
        </h2>
        <p className='text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed'>
          The revolutionary{' '}
          <code className='bg-blue-100 text-blue-800 px-3 py-1 rounded-lg font-semibold'>
            use
          </code>{' '}
          hook allows you to read promises and context values directly in your
          render function. Experience a real-world dashboard that fetches user
          data seamlessly!
        </p>
      </div>

      {/* Live Dashboard Demo */}
      <div className='bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden'>
        <div className='bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6'>
          <h3 className='text-2xl font-bold mb-2'>📊 User Dashboard</h3>
          <p className='text-blue-100'>
            Real-time data fetching with the use hook
          </p>
        </div>

        <div className='p-6 space-y-6'>
          {/* User Profile Section */}
          <div>
            <h4 className='text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2'>
              👤 Profile Information
            </h4>
            <Suspense
              fallback={
                <div className='bg-gray-100 rounded-xl p-6 animate-pulse'>
                  <div className='flex items-center gap-4'>
                    <div className='w-16 h-16 bg-gray-300 rounded-full'></div>
                    <div className='space-y-2'>
                      <div className='h-4 bg-gray-300 rounded w-48'></div>
                      <div className='h-3 bg-gray-300 rounded w-32'></div>
                      <div className='h-3 bg-gray-300 rounded w-56'></div>
                    </div>
                  </div>
                </div>
              }
            >
              <UserProfile userPromise={userProfilePromise} />
            </Suspense>
          </div>

          {/* User Stats Section */}
          <div>
            <h4 className='text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2'>
              📈 Statistics
            </h4>
            <Suspense
              fallback={
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className='bg-gray-100 rounded-lg p-4 animate-pulse'
                    >
                      <div className='w-8 h-8 bg-gray-300 rounded mb-3'></div>
                      <div className='h-6 bg-gray-300 rounded mb-2'></div>
                      <div className='h-4 bg-gray-300 rounded w-16'></div>
                    </div>
                  ))}
                </div>
              }
            >
              <UserStats statsPromise={userStatsPromise} />
            </Suspense>
          </div>

          {/* Recent Activity Section */}
          <div>
            <h4 className='text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2'>
              🕒 Recent Activity
            </h4>
            <Suspense
              fallback={
                <div className='space-y-3'>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className='flex items-center gap-3 p-3 bg-gray-100 rounded-lg animate-pulse'
                    >
                      <div className='w-6 h-6 bg-gray-300 rounded'></div>
                      <div className='flex-1 space-y-2'>
                        <div className='h-4 bg-gray-300 rounded w-3/4'></div>
                        <div className='h-3 bg-gray-300 rounded w-1/2'></div>
                      </div>
                      <div className='w-16 h-6 bg-gray-300 rounded-full'></div>
                    </div>
                  ))}
                </div>
              }
            >
              <RecentActivity activityPromise={recentActivityPromise} />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Technical Details */}
      <div className='grid md:grid-cols-2 gap-6'>
        {/* Code Example */}
        <div className='bg-gray-900 rounded-2xl p-6 shadow-xl'>
          <h3 className='text-xl font-semibold mb-4 text-white flex items-center gap-2'>
            💻 Code Example
          </h3>
          <pre className='text-gray-100 text-sm overflow-x-auto leading-relaxed'>
            {`function UserDashboard({ userId }) {
  // Multiple promises fetched in parallel
  const userPromise = fetchUser(userId)
  const statsPromise = fetchStats(userId)
  
  return (
    <Suspense fallback={<Loading />}>
      <UserProfile promise={userPromise} />
      <UserStats promise={statsPromise} />
    </Suspense>
  )
}

function UserProfile({ promise }) {
  // The 'use' hook suspends until resolved
  const user = use(promise)
  
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  )
}`}
          </pre>
        </div>

        {/* Key Benefits */}
        <div className='bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200'>
          <h3 className='text-xl font-semibold mb-4 text-green-800 flex items-center gap-2'>
            ⚡ Key Benefits
          </h3>
          <ul className='space-y-3 text-green-700'>
            <li className='flex items-start gap-3'>
              <span className='text-green-500 mt-1 text-lg'>✓</span>
              <div>
                <strong>Simplified Data Fetching:</strong> No more useEffect +
                useState boilerplate
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <span className='text-green-500 mt-1 text-lg'>✓</span>
              <div>
                <strong>Automatic Suspense:</strong> Components suspend
                naturally while data loads
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <span className='text-green-500 mt-1 text-lg'>✓</span>
              <div>
                <strong>Parallel Loading:</strong> Multiple promises can be read
                simultaneously
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <span className='text-green-500 mt-1 text-lg'>✓</span>
              <div>
                <strong>Error Boundaries:</strong> Integrates seamlessly with
                error handling
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Performance Note */}
      <div className='bg-blue-50 border border-blue-200 rounded-2xl p-6'>
        <h3 className='text-xl font-semibold mb-4 text-blue-800 flex items-center gap-2'>
          🎯 Best Practices
        </h3>
        <div className='grid md:grid-cols-2 gap-4 text-blue-700'>
          <div>
            <h4 className='font-semibold mb-2'>✨ Do:</h4>
            <ul className='space-y-1 text-sm'>
              <li>• Use stable promise references (avoid recreating)</li>
              <li>• Wrap components in Suspense boundaries</li>
              <li>• Handle errors with Error Boundaries</li>
              <li>• Cache promises for better performance</li>
            </ul>
          </div>
          <div>
            <h4 className='font-semibold mb-2'>⚠️ Avoid:</h4>
            <ul className='space-y-1 text-sm'>
              <li>• Creating new promises on every render</li>
              <li>• Using without Suspense boundary</li>
              <li>• Ignoring loading and error states</li>
              <li>• Over-fetching data unnecessarily</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
