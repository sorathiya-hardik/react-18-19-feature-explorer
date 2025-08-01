import { useId, useState } from 'react'

// 🚨 BAD: Manual ID creation (problems with SSR and multiple instances)
function BadFormExample() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })

  return (
    <div className='bg-red-50 border border-red-200 rounded-lg p-6'>
      <h3 className='text-lg font-semibold text-red-800 mb-4 flex items-center gap-2'>
        ❌ BAD: Manual IDs (Problems)
      </h3>

      <div className='bg-white rounded-lg p-4 mb-4'>
        <h4 className='font-semibold text-red-700 mb-2'>
          Problems with manual IDs:
        </h4>
        <ul className='text-sm text-red-600 space-y-2'>
          <li>
            • <strong>SSR mismatch:</strong> Server generates different IDs than
            client
          </li>
          <li>
            • <strong>Duplicate IDs:</strong> Multiple component instances
            create conflicts
          </li>
          <li>
            • <strong>Hard to maintain:</strong> Manual ID management gets
            complex
          </li>
        </ul>
      </div>

      <form className='space-y-4'>
        <div>
          <label
            htmlFor='name-input'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Name
          </label>
          <input
            id='name-input'
            type='text'
            value={formData.name}
            onChange={e =>
              setFormData(prev => ({ ...prev, name: e.target.value }))
            }
            className='w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-red-500'
            placeholder='Enter your name'
          />
          <div className='text-xs text-red-600 mt-1'>
            ⚠️ ID: "name-input" (hardcoded - causes conflicts!)
          </div>
        </div>

        <div>
          <label
            htmlFor='email-input'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Email
          </label>
          <input
            id='email-input'
            type='email'
            value={formData.email}
            onChange={e =>
              setFormData(prev => ({ ...prev, email: e.target.value }))
            }
            className='w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-red-500'
            placeholder='Enter your email'
          />
          <div className='text-xs text-red-600 mt-1'>
            ⚠️ ID: "email-input" (hardcoded - causes conflicts!)
          </div>
        </div>
      </form>
    </div>
  )
}

// ✅ GOOD: Using useId hook (solves all problems)
function GoodFormExample() {
  const nameId = useId()
  const emailId = useId()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })

  return (
    <div className='bg-green-50 border border-green-200 rounded-lg p-6'>
      <h3 className='text-lg font-semibold text-green-800 mb-4 flex items-center gap-2'>
        ✅ GOOD: useId Hook (Solves Problems)
      </h3>

      <div className='bg-white rounded-lg p-4 mb-4'>
        <h4 className='font-semibold text-green-700 mb-2'>
          Benefits of useId:
        </h4>
        <ul className='text-sm text-green-600 space-y-2'>
          <li>
            • <strong>SSR safe:</strong> Same IDs on server and client
          </li>
          <li>
            • <strong>Unique IDs:</strong> No conflicts between component
            instances
          </li>
          <li>
            • <strong>Automatic:</strong> React manages ID generation for you
          </li>
        </ul>
      </div>

      <form className='space-y-4'>
        <div>
          <label
            htmlFor={nameId}
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Name
          </label>
          <input
            id={nameId}
            type='text'
            value={formData.name}
            onChange={e =>
              setFormData(prev => ({ ...prev, name: e.target.value }))
            }
            className='w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500'
            placeholder='Enter your name'
          />
          <div className='text-xs text-green-600 mt-1'>
            ✅ ID: {nameId} (unique & safe!)
          </div>
        </div>

        <div>
          <label
            htmlFor={emailId}
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Email
          </label>
          <input
            id={emailId}
            type='email'
            value={formData.email}
            onChange={e =>
              setFormData(prev => ({ ...prev, email: e.target.value }))
            }
            className='w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500'
            placeholder='Enter your email'
          />
          <div className='text-xs text-green-600 mt-1'>
            ✅ ID: {emailId} (unique & safe!)
          </div>
        </div>
      </form>
    </div>
  )
}

// 🎯 PRACTICAL: Complex Accessibility Example
function AccessibilityExample() {
  const formId = useId()
  const errorId = useId()
  const helpId = useId()
  const groupId = useId()

  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<string[]>([])

  const validatePassword = (value: string) => {
    const newErrors = []
    if (value.length < 8)
      newErrors.push('Password must be at least 8 characters')
    if (!/[A-Z]/.test(value))
      newErrors.push('Must contain at least one uppercase letter')
    if (!/[0-9]/.test(value)) newErrors.push('Must contain at least one number')
    setErrors(newErrors)
  }

  return (
    <div className='bg-blue-50 border border-blue-200 rounded-lg p-6'>
      <h3 className='text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2'>
        ♿ Real Accessibility Example
      </h3>

      <div className='bg-white rounded-lg p-4 mb-4'>
        <h4 className='font-semibold text-blue-700 mb-2'>
          Screen Reader Experience:
        </h4>
        <p className='text-sm text-blue-600'>
          Screen readers can properly associate labels, error messages, and help
          text with form controls using the unique IDs from useId.
        </p>
      </div>

      <form className='space-y-4'>
        <fieldset className='border border-gray-200 rounded-lg p-4'>
          <legend className='px-2 font-semibold text-gray-900'>
            Password Requirements
          </legend>

          <div className='mt-4'>
            <label
              htmlFor={formId}
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Password
            </label>

            <input
              id={formId}
              type='password'
              value={password}
              onChange={e => {
                setPassword(e.target.value)
                validatePassword(e.target.value)
              }}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:outline-none ${
                errors.length > 0
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              placeholder='Enter your password'
              aria-describedby={`${helpId} ${errors.length > 0 ? errorId : ''}`}
              aria-invalid={errors.length > 0}
            />

            {/* Help text - linked via aria-describedby */}
            <div id={helpId} className='text-xs text-gray-600 mt-2'>
              🔗 Linked to input via: <code>aria-describedby="{helpId}"</code>
              <br />
              Password must be at least 8 characters with uppercase and number.
            </div>

            {/* Error messages - linked via aria-describedby */}
            {errors.length > 0 && (
              <div
                id={errorId}
                className='mt-2 p-2 bg-red-50 border border-red-200 rounded'
              >
                <div className='text-xs text-red-600 mb-1'>
                  🔗 Linked to input via:{' '}
                  <code>aria-describedby="{errorId}"</code>
                </div>
                <ul className='text-sm text-red-700 space-y-1'>
                  {errors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </fieldset>

        {/* Checkbox group with proper ARIA relationships */}
        <fieldset className='border border-gray-200 rounded-lg p-4'>
          <legend className='px-2 font-semibold text-gray-900'>
            Newsletter Preferences
          </legend>

          <div
            id={groupId}
            role='group'
            aria-labelledby={groupId}
            className='mt-4 space-y-2'
          >
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id={`${groupId}-weekly`}
                className='rounded'
              />
              <label htmlFor={`${groupId}-weekly`} className='text-sm'>
                Weekly newsletter
              </label>
            </div>

            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id={`${groupId}-monthly`}
                className='rounded'
              />
              <label htmlFor={`${groupId}-monthly`} className='text-sm'>
                Monthly digest
              </label>
            </div>

            <div className='text-xs text-gray-600 mt-2'>
              🔗 Each checkbox has unique ID: <code>{groupId}-weekly</code>,{' '}
              <code>{groupId}-monthly</code>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  )
}

// 🌟 DEMO: Multiple Instances Problem
function MultipleInstancesDemo() {
  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <h3 className='text-xl font-semibold text-gray-900 mb-2'>
          🔄 Multiple Component Instances
        </h3>
        <p className='text-gray-600'>
          See how useId prevents ID conflicts when the same component renders
          multiple times
        </p>
      </div>

      <div className='grid md:grid-cols-2 gap-6'>
        <div>
          <h4 className='font-semibold text-red-700 mb-3'>
            ❌ Bad: Same hardcoded IDs
          </h4>
          <div className='space-y-4'>
            <BadFormExample />
            <div className='text-xs text-red-600 p-2 bg-red-50 rounded'>
              ⚠️ If you render this component twice, both forms will have the
              same IDs! Try clicking labels - they might focus the wrong inputs.
            </div>
          </div>
        </div>

        <div>
          <h4 className='font-semibold text-green-700 mb-3'>
            ✅ Good: Unique useId
          </h4>
          <div className='space-y-4'>
            <GoodFormExample />
            <div className='text-xs text-green-600 p-2 bg-green-50 rounded'>
              ✅ Each instance gets unique IDs! Labels always focus the correct
              inputs.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function UseIdDemo() {
  return (
    <div className='space-y-8'>
      <div className='text-center'>
        <h2 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4'>
          useId Hook - Unique IDs for Accessibility
        </h2>
        <p className='text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed'>
          The <strong>useId</strong> hook generates unique, stable IDs that are
          consistent between server and client rendering. Essential for
          accessibility and preventing ID conflicts!
        </p>
      </div>

      {/* Problem & Solution Comparison */}
      <MultipleInstancesDemo />

      {/* Real-world Accessibility Example */}
      <AccessibilityExample />

      {/* Key Points */}
      <div className='bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200'>
        <h3 className='text-xl font-semibold mb-4 text-indigo-800 flex items-center gap-2'>
          🎯 Key Points about useId
        </h3>

        <div className='grid md:grid-cols-2 gap-6'>
          <div>
            <h4 className='font-semibold text-indigo-700 mb-3'>
              ✅ When to Use useId:
            </h4>
            <ul className='space-y-2 text-indigo-600'>
              <li>• Form labels and inputs</li>
              <li>• ARIA relationships (describedby, labelledby)</li>
              <li>• Any HTML elements that need unique IDs</li>
              <li>• Component libraries with reusable components</li>
            </ul>
          </div>

          <div>
            <h4 className='font-semibold text-indigo-700 mb-3'>
              ❌ Don't Use for:
            </h4>
            <ul className='space-y-2 text-indigo-600'>
              <li>• React keys (use stable identifiers instead)</li>
              <li>• CSS selectors (use classes)</li>
              <li>• Non-accessibility related IDs</li>
              <li>• Database or API identifiers</li>
            </ul>
          </div>
        </div>

        <div className='mt-6 p-4 bg-white rounded-lg border border-indigo-200'>
          <h4 className='font-semibold text-indigo-700 mb-2'>💡 Pro Tip:</h4>
          <p className='text-indigo-600 text-sm'>
            <code>useId()</code> returns a string like <code>":r1:"</code> or{' '}
            <code>":r2:"</code>. You can append suffixes like{' '}
            <code>{`\${id}-name`}</code> or <code>{`\${id}-email`}</code>
            to create multiple related IDs from a single useId call.
          </p>
        </div>
      </div>

      {/* Code Example */}
      <div className='bg-gray-900 rounded-2xl p-6 shadow-xl'>
        <h3 className='text-xl font-semibold mb-4 text-white flex items-center gap-2'>
          💻 Code Example
        </h3>
        <pre className='text-gray-100 text-sm overflow-x-auto leading-relaxed'>
          {`import { useId, useState } from 'react'

function AccessibleForm() {
  // Generate unique IDs for this component instance
  const nameId = useId()
  const emailId = useId()
  const errorId = useId()
  
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  
  return (
    <form>
      {/* Label properly connected to input */}
      <label htmlFor={nameId}>Name</label>
      <input id={nameId} type="text" />
      
      {/* Input with error message relationship */}
      <label htmlFor={emailId}>Email</label>
      <input 
        id={emailId}
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={!!error}
      />
      
      {/* Error message linked to input */}
      {error && (
        <div id={errorId} role="alert">
          {error}
        </div>
      )}
    </form>
  )
}

// ✅ Each instance gets unique IDs automatically!
// No conflicts, perfect accessibility, SSR-safe`}
        </pre>
      </div>
    </div>
  )
}
