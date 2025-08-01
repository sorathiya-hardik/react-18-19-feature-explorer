import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false })
  }

  override render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return (
        <FallbackComponent
          error={this.state.error!}
          resetError={this.resetError}
        />
      )
    }

    return this.props.children
  }
}

function DefaultErrorFallback({
  error,
  resetError,
}: {
  error: Error
  resetError: () => void
}) {
  return (
    <div className='bg-red-50 border border-red-200 rounded-lg p-6 text-center'>
      <h2 className='text-lg font-semibold text-red-800 mb-2'>
        Something went wrong
      </h2>
      <p className='text-red-600 mb-4'>{error.message}</p>
      <button
        onClick={resetError}
        className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors'
      >
        Try again
      </button>
    </div>
  )
}
