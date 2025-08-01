import { useState, useDeferredValue, useMemo } from 'react'

// Simulate expensive computation
function generateExpensiveList(query: string, count: number = 10000) {
  const items = []
  for (let i = 0; i < count; i++) {
    if (
      query === '' ||
      `Item ${i}`.toLowerCase().includes(query.toLowerCase())
    ) {
      items.push(`Item ${i} - ${query || 'No filter'}`)
    }
  }
  return items
}

function ExpensiveList({ query }: { query: string }) {
  const items = useMemo(() => {
    console.log('🔥 Generating expensive list for:', query)
    return generateExpensiveList(query)
  }, [query])

  return (
    <div className='h-64 overflow-y-auto bg-gray-50 rounded-lg p-4'>
      <div className='text-sm text-gray-600 mb-2'>
        Generated {items.length.toLocaleString()} items
      </div>
      {items.slice(0, 50).map((item, index) => (
        <div
          key={index}
          className='text-sm text-gray-700 py-1 border-b border-gray-200'
        >
          {item}
        </div>
      ))}
      {items.length > 50 && (
        <div className='text-xs text-gray-500 mt-2'>
          ... and {(items.length - 50).toLocaleString()} more items
        </div>
      )}
    </div>
  )
}

export function UseDeferredValueDemo() {
  const [query, setQuery] = useState('')
  const [urgentCount, setUrgentCount] = useState(0)

  // Deferred value - updates after urgent updates are processed
  const deferredQuery = useDeferredValue(query)

  // Show when values are different (stale while revalidating)
  const isStale = query !== deferredQuery

  return (
    <div className='space-y-8'>
      <div className='bg-white rounded-lg p-6 shadow-sm border'>
        <h2 className='text-2xl font-bold text-gray-900 mb-4'>
          useDeferredValue Hook
        </h2>
        <p className='text-gray-600 mb-6'>
          useDeferredValue lets you defer updating a part of the UI. It's
          perfect for expensive computations that shouldn't block urgent updates
          like typing.
        </p>

        <div className='space-y-6'>
          {/* Controls */}
          <div className='flex flex-wrap gap-4 items-center p-4 bg-gray-50 rounded-lg'>
            <div className='flex-1 min-w-64'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Search Query (triggers expensive computation)
              </label>
              <input
                type='text'
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder='Type to search...'
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              />
            </div>

            <div className='flex flex-col items-center'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Urgent Counter
              </label>
              <button
                onClick={() => setUrgentCount(c => c + 1)}
                className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors'
              >
                Count: {urgentCount}
              </button>
            </div>
          </div>

          {/* Value Comparison */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='p-4 bg-red-50 border border-red-200 rounded-lg'>
              <h3 className='font-semibold text-red-800 mb-2'>
                📝 Current Query (Immediate)
              </h3>
              <p className='text-red-700 font-mono text-sm break-all'>
                "{query || '(empty)'}"
              </p>
            </div>

            <div
              className={`p-4 border rounded-lg ${
                isStale
                  ? 'bg-yellow-50 border-yellow-200'
                  : 'bg-green-50 border-green-200'
              }`}
            >
              <h3
                className={`font-semibold mb-2 ${
                  isStale ? 'text-yellow-800' : 'text-green-800'
                }`}
              >
                ⏱️ Deferred Query {isStale ? '(Stale)' : '(Current)'}
              </h3>
              <p
                className={`font-mono text-sm break-all ${
                  isStale ? 'text-yellow-700' : 'text-green-700'
                }`}
              >
                "{deferredQuery || '(empty)'}"
              </p>
            </div>
          </div>

          {/* Expensive Component */}
          <div className='border border-gray-200 rounded-lg p-4'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-lg font-semibold text-gray-900'>
                🔥 Expensive List Component
              </h3>
              {isStale && (
                <span className='inline-flex items-center gap-1 text-yellow-600 text-sm'>
                  <div className='w-2 h-2 bg-yellow-400 rounded-full animate-pulse'></div>
                  Stale data (will update soon)
                </span>
              )}
            </div>

            <ExpensiveList query={deferredQuery} />
          </div>

          {/* Demo Instructions */}
          <div className='p-4 bg-blue-50 border border-blue-200 rounded-lg'>
            <h4 className='font-semibold text-blue-800 mb-2'>
              🧪 Try This Experiment:
            </h4>
            <ol className='text-blue-700 text-sm space-y-1 list-decimal list-inside'>
              <li>Type quickly in the search input</li>
              <li>Notice how the input stays responsive</li>
              <li>
                The expensive list updates with a delay using deferred values
              </li>
              <li>Click the counter while typing - it updates immediately</li>
              <li>Watch the console to see when expensive computations run</li>
              <li>See the "Stale" indicator when values don't match</li>
            </ol>
          </div>

          {/* Use Cases */}
          <div className='p-4 bg-green-50 border border-green-200 rounded-lg'>
            <h4 className='font-semibold text-green-800 mb-2'>
              💡 Perfect Use Cases:
            </h4>
            <ul className='text-green-700 text-sm space-y-1 list-disc list-inside'>
              <li>
                Search results that involve expensive filtering or API calls
              </li>
              <li>Charts and visualizations that take time to render</li>
              <li>Large lists that need complex calculations</li>
              <li>
                Any UI that can show stale data while computing fresh data
              </li>
              <li>Implementing "stale-while-revalidate" patterns</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Code Example */}
      <div className='bg-gray-900 text-gray-100 p-6 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>💻 Code Example</h3>
        <pre className='text-sm overflow-x-auto'>
          <code>{`import { useState, useDeferredValue, useMemo } from 'react'

function SearchResults() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  
  // Expensive computation uses deferred value
  const results = useMemo(() => {
    return expensiveSearch(deferredQuery)
  }, [deferredQuery])
  
  // Check if showing stale data
  const isStale = query !== deferredQuery
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      
      {isStale && <div>Updating results...</div>}
      
      <ExpensiveResultsList results={results} />
    </div>
  )
}`}</code>
        </pre>
      </div>
    </div>
  )
}
