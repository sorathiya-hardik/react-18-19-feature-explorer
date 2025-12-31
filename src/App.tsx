import { useState, Suspense } from 'react'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Navbar } from './components/Navbar'
import { ConcurrentFeatures } from './components/ConcurrentFeatures'
import { SuspenseDemo } from './components/SuspenseDemo'
import { TransitionDemo } from './components/TransitionDemo'
import { UseDeferredValueDemo } from './components/UseDeferredValueDemo'
import UseIdDemo from './components/UseIdDemo'
import { FormActionsDemo } from './components/FormActionsDemo'
import { UseOptimisticDemo } from './components/UseOptimisticDemo'
import { UseHookDemo } from './components/UseHookDemo'
import HydrationDemo from './components/HydrationDemo'
import { featuresData, tabsData } from './data'

export default function App() {
  const [activeTab, setActiveTab] = useState('overview')

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab onNavigateToTab={setActiveTab} />
      case 'concurrent':
        return <ConcurrentFeatures />
      case 'suspense':
        return <SuspenseDemo />
      case 'transitions':
        return <TransitionDemo />
      case 'deferred':
        return <UseDeferredValueDemo />
      case 'use-id':
        return <UseIdDemo />
      case 'form-actions':
        return <FormActionsDemo />
      case 'optimistic':
        return <UseOptimisticDemo />
      case 'use-hook':
        return <UseHookDemo />
      case 'hydration':
        return <HydrationDemo />
      default:
        return <OverviewTab onNavigateToTab={setActiveTab} />
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30'>
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className='container mx-auto px-4 sm:px-6 py-12'>
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className='flex flex-col items-center justify-center py-20'>
                <div className='relative'>
                  <div className='w-16 h-16 border-4 border-blue-500/20 rounded-full'></div>
                  <div className='absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
                </div>
                <div className='text-gray-600 font-semibold mt-6 text-lg'>
                  Loading React features...
                </div>
                <div className='text-gray-400 text-sm mt-2'>
                  Preparing interactive demonstrations
                </div>
              </div>
            }
          >
            {activeTab === 'overview' ? (
              <OverviewTab onNavigateToTab={setActiveTab} />
            ) : (
              <div className='bg-white/70 backdrop-blur-sm rounded-3xl border border-gray-200/50 shadow-xl p-8 md:p-12'>
                <div className='mb-8'>
                  <div className='flex items-center gap-4 mb-4'>
                    <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center'>
                      <span className='text-white text-xl font-bold'>
                        {tabsData
                          .find(tab => tab.id === activeTab)
                          ?.label.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h1 className='text-3xl md:text-4xl font-bold text-gray-900'>
                        {tabsData.find(tab => tab.id === activeTab)?.label}
                      </h1>
                      <p className='text-gray-500 text-lg mt-1'>
                        Interactive demonstration and examples
                      </p>
                    </div>
                  </div>
                </div>
                <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6'>
                  {renderActiveComponent()}
                </div>
              </div>
            )}
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  )
}

interface OverviewTabProps {
  onNavigateToTab: (tab: string) => void
}

function OverviewTab({ onNavigateToTab }: OverviewTabProps) {
  return (
    <div className='space-y-16'>
      {/* Hero Section */}
      <div className='relative'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 rounded-3xl'></div>
        <div className='relative px-8 py-16 text-center'>
          <div className='mb-8'>
            <h1 className='text-5xl md:text-6xl lg:text-7xl font-black mb-6'>
              <span className='bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent'>
                React 18 & 19
              </span>
              <br />
              <span className='bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>
                Feature Explorer
              </span>
            </h1>

            <p className='text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8'>
              Discover and master the latest React features with interactive
              demonstrations of{' '}
              <span className='font-semibold text-blue-600'>
                concurrent rendering
              </span>
              ,{' '}
              <span className='font-semibold text-purple-600'>
                advanced hooks
              </span>
              , and{' '}
              <span className='font-semibold text-pink-600'>
                performance optimizations
              </span>{' '}
              that define modern React development.
            </p>

            <div className='flex flex-wrap items-center justify-center gap-4'>
              <div className='flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-sm'>
                <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                <span className='text-sm font-medium text-gray-700'>
                  9 Interactive Demos
                </span>
              </div>
              <div className='flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-sm'>
                <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                <span className='text-sm font-medium text-gray-700'>
                  React 18 & 19 Features
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
        {featuresData.map(feature => (
          <FeatureCard
            key={feature.id}
            title={feature.title}
            description={feature.description}
            version={feature.version}
            onClick={() => onNavigateToTab(feature.id)}
          />
        ))}
      </div>
    </div>
  )
}

interface FeatureCardProps {
  title: string
  description: string
  version?: string
  onClick?: () => void
}

function FeatureCard({
  title,
  description,
  version,
  onClick,
}: FeatureCardProps) {
  return (
    <div
      className={`group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 hover:border-blue-200 transition-all duration-300 hover:shadow-xl hover:shadow-blue-100/50 ${
        onClick ? 'cursor-pointer hover:-translate-y-1' : ''
      }`}
      onClick={onClick}
    >
      <div className='absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
      <div className='relative'>
        <h3 className='text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors'>
          {title}
        </h3>
        <p className='text-gray-600 mb-4 leading-relaxed'>{description}</p>
        {version && (
          <span className='inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-semibold rounded-full border border-blue-200/50'>
            {version}
          </span>
        )}
      </div>
    </div>
  )
}
