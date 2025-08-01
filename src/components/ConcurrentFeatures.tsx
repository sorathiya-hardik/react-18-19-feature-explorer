import React, { useState, useDeferredValue, useTransition } from 'react'

export function ConcurrentFeatures() {
  const [count, setCount] = useState(0)
  const [list, setList] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isPending, startTransition] = useTransition()

  // Deferred value for expensive operations
  const deferredQuery = useDeferredValue(searchQuery)
  const deferredList = useDeferredValue(list)

  // Simulate expensive computation based on search
  const filteredItems = React.useMemo(() => {
    if (!deferredQuery) return deferredList.slice(0, 100)
    // Simulate expensive filtering
    const start = performance.now()
    while (performance.now() - start < 50) {
      // Simulate work - this makes filtering slow
    }
    return deferredList
      .filter(item => item.toString().includes(deferredQuery))
      .slice(0, 100)
  }, [deferredQuery, deferredList])

  const handleExpensiveUpdate = () => {
    // Using startTransition for non-urgent updates
    startTransition(() => {
      const newList = Array.from({ length: 5000 }, () =>
        Math.floor(Math.random() * 10000)
      )
      setList(newList)
    })
  }

  const handleUrgentUpdate = () => {
    setCount(c => c + 1)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This is urgent - user typing should be responsive
    setSearchQuery(e.target.value)
  }

  return (
    <div className='space-y-8'>
      <div className='bg-white rounded-lg p-6 shadow-sm border'>
        <h2 className='text-2xl font-bold text-gray-900 mb-4'>
          Concurrent Rendering Features
        </h2>
        <p className='text-gray-600 mb-6'>
          React 18+ concurrent rendering allows React to pause expensive work
          and prioritize urgent updates. This keeps your UI responsive even
          during heavy computations.
        </p>

        {/* Live Demo Section */}
        <div className='mb-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border'>
          <h3 className='text-xl font-semibold text-gray-800 mb-4'>
            🎯 Interactive Demo - See It In Action!
          </h3>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {/* Counter - Always Responsive */}
            <div className='bg-white p-4 rounded-lg shadow-sm'>
              <h4 className='font-semibold text-green-700 mb-2'>
                🚨 Urgent Updates
              </h4>
              <p className='text-sm text-gray-600 mb-3'>
                Always processed immediately
              </p>
              <button
                onClick={handleUrgentUpdate}
                className='w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors'
              >
                Click Me! ({count})
              </button>
            </div>

            {/* Search Input - Always Responsive */}
            <div className='bg-white p-4 rounded-lg shadow-sm'>
              <h4 className='font-semibold text-blue-700 mb-2'>
                ⌨️ User Input
              </h4>
              <p className='text-sm text-gray-600 mb-3'>
                Typing is always responsive
              </p>
              <input
                type='text'
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder='Type to search...'
                className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500'
              />
            </div>

            {/* Heavy Computation - Can Be Interrupted */}
            <div className='bg-white p-4 rounded-lg shadow-sm'>
              <h4 className='font-semibold text-orange-700 mb-2'>
                ⏳ Non-Urgent Work
              </h4>
              <p className='text-sm text-gray-600 mb-3'>
                Can be paused for urgent updates
              </p>
              <button
                onClick={handleExpensiveUpdate}
                disabled={isPending}
                className='w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors disabled:opacity-50'
              >
                {isPending ? 'Processing...' : 'Generate Data'}
              </button>
            </div>
          </div>

          {/* Results Display */}
          <div className='mt-6 p-4 bg-white rounded-lg shadow-sm'>
            <div className='flex justify-between items-center mb-3'>
              <h4 className='font-semibold text-gray-800'>
                📊 Live Results {isPending && '(updating...)'}
              </h4>
              <div className='text-sm text-gray-600'>
                {list.length > 0 &&
                  `${filteredItems.length} of ${list.length.toLocaleString()} items`}
              </div>
            </div>

            {list.length > 0 && (
              <div className='h-32 overflow-y-auto bg-gray-50 rounded p-3 text-sm'>
                {filteredItems.length > 0 ? (
                  <div className='grid grid-cols-10 gap-1'>
                    {filteredItems.map((item, index) => (
                      <span
                        key={index}
                        className='bg-blue-100 px-2 py-1 rounded text-xs'
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className='text-gray-500 text-center py-4'>
                    No items match "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Explanation Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* What Happens Without Transitions */}
          <div className='bg-red-50 p-4 rounded-lg border border-red-200'>
            <h3 className='text-lg font-semibold text-red-800 mb-3'>
              ❌ Without startTransition
            </h3>
            <ul className='text-red-700 text-sm space-y-2'>
              <li>• Heavy work blocks the entire UI</li>
              <li>• Clicking buttons becomes laggy</li>
              <li>• Typing in inputs stutters</li>
              <li>• Users notice the app is "frozen"</li>
              <li>• Poor user experience</li>
            </ul>
          </div>

          {/* What Happens With Transitions */}
          <div className='bg-green-50 p-4 rounded-lg border border-green-200'>
            <h3 className='text-lg font-semibold text-green-800 mb-3'>
              ✅ With startTransition
            </h3>
            <ul className='text-green-700 text-sm space-y-2'>
              <li>• Heavy work can be paused/resumed</li>
              <li>• Button clicks stay responsive</li>
              <li>• Typing remains smooth</li>
              <li>• UI feels fast and reactive</li>
              <li>• Great user experience</li>
            </ul>
          </div>
        </div>

        {/* Interactive Test */}
        <div className='mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg'>
          <h4 className='font-semibold text-yellow-800 mb-3'>
            🧪 Try This Test:
          </h4>
          <ol className='text-yellow-700 text-sm space-y-2 list-decimal list-inside'>
            <li>
              <strong>Click "Generate Data"</strong> to start heavy computation
            </li>
            <li>
              <strong>While it's processing</strong>, try clicking the counter
              button multiple times
            </li>
            <li>
              <strong>Also try typing</strong> in the search box while
              processing
            </li>
            <li>
              <strong>Notice:</strong> Counter and typing stay responsive even
              during heavy work!
            </li>
            <li>
              <strong>This is the magic</strong> of React's concurrent features
              - urgent updates interrupt non-urgent ones
            </li>
          </ol>
        </div>
      </div>

      {/* Code Example */}
      <div className='bg-gray-900 text-gray-100 p-6 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>
          💻 How It Works - Code Explanation
        </h3>
        <div className='space-y-4'>
          <div>
            <h4 className='text-green-400 font-medium mb-2'>
              1. Urgent Updates (High Priority)
            </h4>
            <pre className='text-sm bg-gray-800 p-3 rounded overflow-x-auto'>
              <code>{`// ✅ This runs immediately - cannot be interrupted
const handleUrgentUpdate = () => {
  setCount(c => c + 1)  // User interactions must be instant
}`}</code>
            </pre>
          </div>

          <div>
            <h4 className='text-orange-400 font-medium mb-2'>
              2. Non-Urgent Updates (Low Priority)
            </h4>
            <pre className='text-sm bg-gray-800 p-3 rounded overflow-x-auto'>
              <code>{`// ⏳ This can be paused if urgent updates come in
const handleExpensiveUpdate = () => {
  startTransition(() => {  // 🔑 This is the magic!
    // Heavy computation that can be interrupted
    const newList = Array.from({ length: 5000 }, () => 
      Math.floor(Math.random() * 10000)
    )
    setList(newList)
  })
}`}</code>
            </pre>
          </div>

          <div>
            <h4 className='text-blue-400 font-medium mb-2'>
              3. Deferred Values (Smart Updates)
            </h4>
            <pre className='text-sm bg-gray-800 p-3 rounded overflow-x-auto'>
              <code>{`// 🧠 This waits for urgent updates to finish first
const deferredQuery = useDeferredValue(searchQuery)

// Expensive filtering only runs when safe to do so
const filteredItems = useMemo(() => {
  return list.filter(item => 
    item.toString().includes(deferredQuery)
  )
}, [deferredQuery, list])`}</code>
            </pre>
          </div>

          <div className='bg-blue-900 p-4 rounded-lg'>
            <h4 className='text-blue-300 font-medium mb-2'>🎯 Key Concept:</h4>
            <p className='text-blue-100 text-sm'>
              <strong>startTransition</strong> tells React: "This update is not
              urgent. If something more important happens (like user clicking or
              typing), pause this work and handle the urgent stuff first."
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
