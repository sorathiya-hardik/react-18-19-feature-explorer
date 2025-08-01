export interface TabData {
  id: string
  label: string
  shortLabel: string
}

export const tabsData: TabData[] = [
  { id: 'overview', label: '🏠', shortLabel: 'Home' },
  { id: 'concurrent', label: 'Concurrent Rendering', shortLabel: 'Concurrent' },
  { id: 'suspense', label: 'Enhanced Suspense', shortLabel: 'Suspense' },
  { id: 'transitions', label: 'Transitions', shortLabel: 'Transitions' },
  { id: 'deferred', label: 'useDeferredValue', shortLabel: 'Deferred' },
  { id: 'use-id', label: 'useId Hook', shortLabel: 'useId' },
  { id: 'form-actions', label: 'Form Actions', shortLabel: 'Forms' },
  { id: 'optimistic', label: 'useOptimistic', shortLabel: 'Optimistic' },
  { id: 'use-hook', label: 'use Hook', shortLabel: 'use Hook' },
  { id: 'hydration', label: 'Enhanced Hydration', shortLabel: 'Hydration' },
]
