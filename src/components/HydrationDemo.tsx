export default function HydrationDemo() {
  return (
    <div className='space-y-8'>
      <div className='text-center'>
        <h2 className='text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4'>
          Enhanced Hydration & SSR
        </h2>
        <p className='text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed'>
          React 18+ revolutionizes Server-Side Rendering with{' '}
          <strong>selective hydration</strong>,<strong> streaming SSR</strong>,
          and <strong>concurrent features</strong>. Experience how components
          hydrate independently and prioritize user interactions!
        </p>
      </div>

      {/* Simple Demo */}
      <div className='bg-white rounded-2xl shadow-xl border border-gray-200 p-6'>
        <h3 className='text-2xl font-bold mb-4 flex items-center gap-2'>
          🎛️ Enhanced Hydration Demo
        </h3>
        <p className='text-gray-600 mb-6'>
          This demonstrates React 18+'s enhanced hydration capabilities with
          selective hydration and streaming SSR.
        </p>

        <div className='bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-lg'>
          <h4 className='font-bold text-lg mb-4'>🚀 Hydration Features</h4>
          <ul className='space-y-2'>
            <li>✅ Selective hydration for better performance</li>
            <li>✅ Streaming SSR for faster initial loads</li>
            <li>✅ Priority-based component hydration</li>
            <li>✅ Better user interaction responsiveness</li>
          </ul>
        </div>
      </div>

      {/* Technical Information */}
      <div className='grid md:grid-cols-2 gap-6'>
        {/* How It Works */}
        <div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200'>
          <h3 className='text-xl font-semibold mb-4 text-blue-800 flex items-center gap-2'>
            ⚙️ How Enhanced Hydration Works
          </h3>
          <ul className='space-y-3 text-blue-700'>
            <li className='flex items-start gap-3'>
              <span className='text-blue-500 mt-1'>🎯</span>
              <div>
                <strong>Selective Hydration:</strong> React can hydrate
                individual components as needed
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <span className='text-blue-500 mt-1'>⚡</span>
              <div>
                <strong>Priority-based:</strong> User interactions get higher
                hydration priority
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <span className='text-blue-500 mt-1'>🌊</span>
              <div>
                <strong>Streaming SSR:</strong> HTML can be sent in chunks as
                it's generated
              </div>
            </li>
          </ul>
        </div>

        {/* Benefits */}
        <div className='bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200'>
          <h3 className='text-xl font-semibold mb-4 text-green-800 flex items-center gap-2'>
            🚀 Performance Benefits
          </h3>
          <ul className='space-y-3 text-green-700'>
            <li className='flex items-start gap-3'>
              <span className='text-green-500 mt-1'>📈</span>
              <div>
                <strong>Faster Initial Load:</strong> Critical content appears
                immediately
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <span className='text-green-500 mt-1'>👆</span>
              <div>
                <strong>Better Interactivity:</strong> User can interact while
                other parts load
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <span className='text-green-500 mt-1'>🎛️</span>
              <div>
                <strong>Granular Control:</strong> Load only what's needed when
                it's needed
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Code Example */}
      <div className='bg-gray-900 rounded-2xl p-6 shadow-xl'>
        <h3 className='text-xl font-semibold mb-4 text-white flex items-center gap-2'>
          💻 Implementation Example
        </h3>
        <pre className='text-gray-100 text-sm overflow-x-auto leading-relaxed'>
          {`// React 18+ Enhanced Hydration
import { Suspense, lazy } from 'react'

const HeavyComponent = lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <div>
      {/* This content hydrates immediately */}
      <Header />
      
      {/* This section can hydrate independently */}
      <Suspense fallback={<Skeleton />}>
        <HeavyComponent />
      </Suspense>
      
      {/* Static content doesn't need hydration */}
      <Footer />
    </div>
  )
}

// With streaming SSR, HTML is sent progressively:
// 1. <Header /> renders immediately
// 2. <Skeleton /> shows while <HeavyComponent /> loads
// 3. <Footer /> is already available
// 4. Interactive features hydrate based on user interaction`}
        </pre>
      </div>
    </div>
  )
}
