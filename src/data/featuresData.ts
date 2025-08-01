export interface FeatureData {
  id: string
  title: string
  description: string
  version: string
}

export const featuresData: FeatureData[] = [
  {
    id: 'concurrent',
    title: '🏃‍♂️ Concurrent Rendering',
    description:
      'React can now interrupt rendering to handle high-priority updates',
    version: 'React 18',
  },
  {
    id: 'suspense',
    title: '⏳ Enhanced Suspense',
    description: 'Better data fetching patterns with Suspense boundaries',
    version: 'React 18',
  },
  {
    id: 'transitions',
    title: '🔄 Transitions',
    description: 'Mark updates as non-urgent to keep UI responsive',
    version: 'React 18',
  },
  {
    id: 'deferred',
    title: '⏱️ useDeferredValue',
    description: 'Defer expensive computations to maintain responsiveness',
    version: 'React 18',
  },
  {
    id: 'use-id',
    title: '🆔 useId Hook',
    description: 'Generate unique IDs for accessibility attributes',
    version: 'React 18',
  },
  {
    id: 'form-actions',
    title: '📝 Form Actions',
    description: 'Native form handling with server actions support',
    version: 'React 19',
  },
  {
    id: 'optimistic',
    title: '✨ useOptimistic',
    description: 'Optimistic updates for better user experience',
    version: 'React 19',
  },
  {
    id: 'use-hook',
    title: '🎯 use Hook',
    description: 'Read promises and context values in render',
    version: 'React 19',
  },
  {
    id: 'hydration',
    title: '🚀 Enhanced Hydration',
    description: 'Better SSR hydration with selective hydration',
    version: 'React 18+',
  },
]
