import { useState, useTransition, useDeferredValue } from 'react'

// Simulate expensive filtering operation
function filterItems(items: string[], query: string): string[] {
  if (!query) return items

  // Simulate expensive computation
  const start = performance.now()
  while (performance.now() - start < 1) {
    // Busy wait for 1ms to simulate expensive operation
  }

  return items.filter(item => item.toLowerCase().includes(query.toLowerCase()))
}

export function TransitionDemo() {
  const [query, setQuery] = useState('')
  const [isPending, startTransition] = useTransition()
  const [filteredItems, setFilteredItems] = useState<string[]>([])

  // Create a large list of items
  const items = Array.from({ length: 20000 }, (_, i) => `Item ${i + 1}`)

  // Deferred value to show the difference
  const deferredQuery = useDeferredValue(query)
  const deferredItems = filterItems(items, deferredQuery)

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery)

    // Use transition for expensive filtering
    startTransition(() => {
      const filtered = filterItems(items, newQuery)
      setFilteredItems(filtered)
    })
  }

  return (
    <div className='space-y-8'>
      <div className='bg-white rounded-lg p-6 shadow-sm border'>
        <h2 className='text-2xl font-bold text-gray-900 mb-4'>
          React 18 Transitions
        </h2>
        <p className='text-gray-600 mb-6'>
          Transitions allow you to mark updates as non-urgent, keeping the UI
          responsive during expensive operations. Compare the two search
          implementations below.
        </p>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Regular Update */}
          <div className='border border-gray-200 rounded-lg p-4'>
            <h3 className='text-lg font-semibold text-red-700 mb-3'>
              ❌ Without Transitions (Blocking)
            </h3>
            <p className='text-sm text-gray-600 mb-4'>
              Regular state updates that block the UI during expensive
              operations.
            </p>

            <input
              type='text'
              placeholder='Search items (blocks UI)...'
              className='w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-red-500 focus:border-red-500'
              onChange={e => {
                const filtered = filterItems(items, e.target.value)
                setFilteredItems(filtered)
              }}
            />

            <div className='text-sm text-gray-600'>
              Results: {filteredItems.length.toLocaleString()} items
            </div>
            <div className='h-32 overflow-y-auto bg-gray-50 rounded p-2 mt-2'>
              {filteredItems.slice(0, 100).map((item, index) => (
                <div key={index} className='text-xs text-gray-700 py-1'>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Transition Update */}
          <div className='border border-gray-200 rounded-lg p-4'>
            <h3 className='text-lg font-semibold text-green-700 mb-3'>
              ✅ With Transitions (Non-blocking)
            </h3>
            <p className='text-sm text-gray-600 mb-4'>
              Uses startTransition to keep the UI responsive during filtering.
            </p>

            <input
              type='text'
              placeholder='Search items (responsive)...'
              value={query}
              className='w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-green-500 focus:border-green-500'
              onChange={e => handleQueryChange(e.target.value)}
            />

            <div className='text-sm text-gray-600 flex items-center gap-2'>
              Results: {deferredItems.length.toLocaleString()} items
              {isPending && (
                <span className='inline-flex items-center gap-1 text-yellow-600'>
                  <div className='w-3 h-3 bg-yellow-400 rounded-full animate-pulse'></div>
                  Updating...
                </span>
              )}
            </div>
            <div className='h-32 overflow-y-auto bg-gray-50 rounded p-2 mt-2'>
              {deferredItems.slice(0, 100).map((item, index) => (
                <div key={index} className='text-xs text-gray-700 py-1'>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Demonstration Instructions */}
        <div className='mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg'>
          <h4 className='font-semibold text-yellow-800 mb-2'>
            🧪 Try This Experiment:
          </h4>
          <ol className='text-yellow-700 text-sm space-y-1 list-decimal list-inside'>
            <li>Type quickly in the left input (without transitions)</li>
            <li>Notice how the typing feels laggy and unresponsive</li>
            <li>Now type in the right input (with transitions)</li>
            <li>
              The input stays responsive while the expensive filtering happens
              in the background
            </li>
            <li>
              You can see the "Updating..." indicator when transitions are
              running
            </li>
          </ol>
        </div>

        {/* Benefits */}
        <div className='mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
          <h4 className='font-semibold text-blue-800 mb-2'>
            ✅ Benefits of Transitions:
          </h4>
          <ul className='text-blue-700 text-sm space-y-1 list-disc list-inside'>
            <li>Keep UI responsive during expensive updates</li>
            <li>Automatic pending states with isPending</li>
            <li>Can be interrupted by more urgent updates</li>
            <li>
              Better user experience for search, filtering, and navigation
            </li>
            <li>
              Works great with useDeferredValue for stale-while-revalidate
              patterns
            </li>
          </ul>
        </div>
      </div>

      {/* Code Example */}
      <div className='bg-gray-900 text-gray-100 p-6 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>💻 Code Example</h3>
        <pre className='text-sm overflow-x-auto'>
          <code>{`import { useTransition, useDeferredValue } from 'react'

function SearchComponent() {
  const [query, setQuery] = useState('')
  const [isPending, startTransition] = useTransition()
  const deferredQuery = useDeferredValue(query)
  
  const handleSearch = (newQuery) => {
    setQuery(newQuery) // Urgent: update input immediately
    
    startTransition(() => {
      // Non-urgent: expensive filtering
      const results = expensiveFilter(items, newQuery)
      setResults(results)
    })
  }
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {isPending && <div>Searching...</div>}
      <Results items={filteredItems} />
    </div>
  )
}`}</code>
        </pre>
      </div>
    </div>
  )
}
