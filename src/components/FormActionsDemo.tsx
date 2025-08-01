import { useState, useActionState } from 'react'

// Simulate server action
async function submitForm(_prevState: any, formData: FormData) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000))

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string

  // Simulate validation
  if (!name || name.length < 2) {
    return {
      success: false,
      error: 'Name must be at least 2 characters long',
      data: { name, email, message },
    }
  }

  if (!email || !email.includes('@')) {
    return {
      success: false,
      error: 'Please enter a valid email address',
      data: { name, email, message },
    }
  }

  if (!message || message.length < 10) {
    return {
      success: false,
      error: 'Message must be at least 10 characters long',
      data: { name, email, message },
    }
  }

  // Success
  return {
    success: true,
    message: 'Form submitted successfully!',
    data: { name, email, message },
  }
}

function ModernFormWithActions() {
  const [state, formAction, isPending] = useActionState(submitForm, null)

  return (
    <div className='bg-green-50 border border-green-200 rounded-lg p-6'>
      <h3 className='text-lg font-semibold text-green-800 mb-4'>
        ✅ React 19 Form Actions
      </h3>

      <form action={formAction} className='space-y-4'>
        <div>
          <label
            htmlFor='modern-name'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Name
          </label>
          <input
            id='modern-name'
            name='name'
            type='text'
            defaultValue={state?.data?.name || ''}
            disabled={isPending}
            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50'
            placeholder='Enter your name'
          />
        </div>

        <div>
          <label
            htmlFor='modern-email'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Email
          </label>
          <input
            id='modern-email'
            name='email'
            type='email'
            defaultValue={state?.data?.email || ''}
            disabled={isPending}
            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50'
            placeholder='Enter your email'
          />
        </div>

        <div>
          <label
            htmlFor='modern-message'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Message
          </label>
          <textarea
            id='modern-message'
            name='message'
            rows={4}
            defaultValue={state?.data?.message || ''}
            disabled={isPending}
            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50'
            placeholder='Enter your message'
          />
        </div>

        <button
          type='submit'
          disabled={isPending}
          className='w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
        >
          {isPending ? (
            <>
              <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
              Submitting...
            </>
          ) : (
            'Submit with Actions'
          )}
        </button>

        {/* Status Messages */}
        {state?.success && (
          <div className='p-3 bg-green-100 border border-green-300 rounded-lg text-green-800'>
            ✅ {state.message}
          </div>
        )}

        {state?.error && (
          <div className='p-3 bg-red-100 border border-red-300 rounded-lg text-red-800'>
            ❌ {state.error}
          </div>
        )}
      </form>

      <div className='mt-4 text-xs text-gray-500 space-y-1'>
        <div>• No manual loading state management</div>
        <div>• Automatic form data handling</div>
        <div>• Built-in pending state</div>
        <div>• Server-side validation support</div>
      </div>
    </div>
  )
}

function TraditionalForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const formDataObj = new FormData()
      formDataObj.append('name', formData.name)
      formDataObj.append('email', formData.email)
      formDataObj.append('message', formData.message)

      const result = await submitForm(null, formDataObj)

      if (result.success) {
        setSuccess(result.message!)
        setFormData({ name: '', email: '', message: '' })
      } else {
        setError(result.error!)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-6'>
      <h3 className='text-lg font-semibold text-yellow-800 mb-4'>
        ⚠️ Traditional Form Handling
      </h3>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label
            htmlFor='traditional-name'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Name
          </label>
          <input
            id='traditional-name'
            type='text'
            value={formData.name}
            onChange={e =>
              setFormData(prev => ({ ...prev, name: e.target.value }))
            }
            disabled={isSubmitting}
            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 disabled:opacity-50'
            placeholder='Enter your name'
          />
        </div>

        <div>
          <label
            htmlFor='traditional-email'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Email
          </label>
          <input
            id='traditional-email'
            type='email'
            value={formData.email}
            onChange={e =>
              setFormData(prev => ({ ...prev, email: e.target.value }))
            }
            disabled={isSubmitting}
            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 disabled:opacity-50'
            placeholder='Enter your email'
          />
        </div>

        <div>
          <label
            htmlFor='traditional-message'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Message
          </label>
          <textarea
            id='traditional-message'
            rows={4}
            value={formData.message}
            onChange={e =>
              setFormData(prev => ({ ...prev, message: e.target.value }))
            }
            disabled={isSubmitting}
            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 disabled:opacity-50'
            placeholder='Enter your message'
          />
        </div>

        <button
          type='submit'
          disabled={isSubmitting}
          className='w-full bg-yellow-500 text-white py-3 px-4 rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
        >
          {isSubmitting ? (
            <>
              <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
              Submitting...
            </>
          ) : (
            'Submit Traditional'
          )}
        </button>

        {/* Status Messages */}
        {success && (
          <div className='p-3 bg-green-100 border border-green-300 rounded-lg text-green-800'>
            ✅ {success}
          </div>
        )}

        {error && (
          <div className='p-3 bg-red-100 border border-red-300 rounded-lg text-red-800'>
            ❌ {error}
          </div>
        )}
      </form>

      <div className='mt-4 text-xs text-gray-500 space-y-1'>
        <div>• Manual state management required</div>
        <div>• Custom loading state handling</div>
        <div>• Manual form data collection</div>
        <div>• More boilerplate code</div>
      </div>
    </div>
  )
}

export function FormActionsDemo() {
  return (
    <div className='space-y-8'>
      <div className='bg-white rounded-lg p-6 shadow-sm border'>
        <h2 className='text-2xl font-bold text-gray-900 mb-4'>
          React 19 Form Actions
        </h2>
        <p className='text-gray-600 mb-6'>
          React 19 introduces Form Actions - a revolutionary way to handle forms
          with built-in loading states, error handling, and server integration.
          Compare the traditional approach with the new Form Actions API.
        </p>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <TraditionalForm />
          <ModernFormWithActions />
        </div>

        {/* Benefits */}
        <div className='mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
          <h4 className='font-semibold text-blue-800 mb-2'>
            🚀 Benefits of Form Actions:
          </h4>
          <ul className='text-blue-700 text-sm space-y-1 list-disc list-inside'>
            <li>
              <strong>Less boilerplate:</strong> No manual loading state or form
              data management
            </li>
            <li>
              <strong>Built-in pending state:</strong> Automatic loading
              indicators
            </li>
            <li>
              <strong>Progressive enhancement:</strong> Works without JavaScript
            </li>
            <li>
              <strong>Server integration:</strong> Perfect for server actions
              and API routes
            </li>
            <li>
              <strong>Error handling:</strong> Built-in error state management
            </li>
            <li>
              <strong>Accessibility:</strong> Better form validation and screen
              reader support
            </li>
          </ul>
        </div>

        {/* Demo Instructions */}
        <div className='mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg'>
          <h4 className='font-semibold text-yellow-800 mb-2'>🧪 Try This:</h4>
          <ol className='text-yellow-700 text-sm space-y-1 list-decimal list-inside'>
            <li>
              Try submitting both forms with invalid data to see error handling
            </li>
            <li>
              Notice how the React 19 version has cleaner code and automatic
              states
            </li>
            <li>Both forms simulate a 2-second server delay</li>
            <li>
              The traditional form requires much more manual state management
            </li>
          </ol>
        </div>
      </div>

      {/* Code Example */}
      <div className='bg-gray-900 text-gray-100 p-6 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>💻 Code Example</h3>
        <pre className='text-sm overflow-x-auto'>
          <code>{`import { useActionState } from 'react'

// Server action
async function submitForm(prevState, formData) {
  const name = formData.get('name')
  const email = formData.get('email')
  
  // Server-side validation
  if (!name) {
    return { error: 'Name is required' }
  }
  
  // Process form...
  return { success: true, message: 'Form submitted!' }
}

function MyForm() {
  const [state, formAction, isPending] = useActionState(submitForm, null)
  
  return (
    <form action={formAction}>
      <input name="name" disabled={isPending} />
      <input name="email" disabled={isPending} />
      
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
      
      {state?.error && <div>{state.error}</div>}
      {state?.success && <div>{state.message}</div>}
    </form>
  )
}`}</code>
        </pre>
      </div>
    </div>
  )
}
