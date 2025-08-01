import { useState, useOptimistic, useTransition } from 'react'
import { initialMessages, MessageData } from '../data'

// Simulate sending a message to server
async function sendMessage(text: string): Promise<MessageData> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000))

  // Simulate occasional failures
  if (Math.random() < 0.2) {
    throw new Error('Failed to send message')
  }

  return {
    id: Date.now().toString(),
    text,
    sender: 'You',
    timestamp: new Date(),
    status: 'sent',
  }
}

function ChatWithOptimistic() {
  const [messages, setMessages] = useState<MessageData[]>(initialMessages)

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage: string) => [
      ...state,
      {
        id: `temp-${Date.now()}`,
        text: newMessage,
        sender: 'You',
        timestamp: new Date(),
        status: 'sending' as const,
      },
    ]
  )

  const [inputValue, setInputValue] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const messageText = inputValue.trim()
    setInputValue('')

    startTransition(async () => {
      // Optimistically add the message inside transition
      addOptimisticMessage(messageText)

      try {
        const newMessage = await sendMessage(messageText)
        setMessages(prev => [...prev, newMessage])
      } catch (error) {
        // In a real app, you might want to show the failed message
        // and allow retry
        console.error('Failed to send message:', error)
        // For demo, we'll just show it failed
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            text: messageText,
            sender: 'You',
            timestamp: new Date(),
            status: 'failed',
          },
        ])
      }
    })
  }

  return (
    <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
      <h3 className='text-lg font-semibold text-green-800 mb-4'>
        ✅ With useOptimistic
      </h3>

      <div className='bg-white rounded-lg h-64 overflow-y-auto p-3 mb-4 space-y-2'>
        {optimisticMessages.map(message => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'You' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                message.sender === 'You'
                  ? message.status === 'sending'
                    ? 'bg-blue-200 text-blue-800 opacity-70'
                    : message.status === 'failed'
                      ? 'bg-red-200 text-red-800'
                      : 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              <div>{message.text}</div>
              <div
                className={`text-xs mt-1 ${
                  message.sender === 'You' && message.status === 'sending'
                    ? 'text-blue-600'
                    : message.sender === 'You' && message.status === 'failed'
                      ? 'text-red-600'
                      : 'text-gray-500'
                }`}
              >
                {message.status === 'sending' && '⏳ Sending...'}
                {message.status === 'failed' && '❌ Failed'}
                {message.status === 'sent' &&
                  message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className='flex gap-2'>
        <input
          type='text'
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder='Type a message...'
          className='flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500'
          disabled={isPending}
        />
        <button
          type='submit'
          disabled={isPending || !inputValue.trim()}
          className='bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50'
        >
          Send
        </button>
      </form>

      <div className='mt-2 text-xs text-gray-500'>
        Messages appear instantly with optimistic updates
      </div>
    </div>
  )
}

function ChatWithoutOptimistic() {
  const [messages, setMessages] = useState<MessageData[]>(initialMessages)

  const [inputValue, setInputValue] = useState('')
  const [isSending, setIsSending] = useState(false)

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isSending) return

    const messageText = inputValue.trim()
    setInputValue('')
    setIsSending(true)

    try {
      const newMessage = await sendMessage(messageText)
      setMessages(prev => [...prev, newMessage])
    } catch (error) {
      console.error('Failed to send message:', error)
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text: messageText,
          sender: 'You',
          timestamp: new Date(),
          status: 'failed',
        },
      ])
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
      <h3 className='text-lg font-semibold text-yellow-800 mb-4'>
        ⚠️ Without useOptimistic
      </h3>

      <div className='bg-white rounded-lg h-64 overflow-y-auto p-3 mb-4 space-y-2'>
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'You' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                message.sender === 'You'
                  ? message.status === 'failed'
                    ? 'bg-red-200 text-red-800'
                    : 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              <div>{message.text}</div>
              <div
                className={`text-xs mt-1 ${
                  message.sender === 'You' && message.status === 'failed'
                    ? 'text-red-600'
                    : 'text-gray-500'
                }`}
              >
                {message.status === 'failed' && '❌ Failed'}
                {message.status === 'sent' &&
                  message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className='flex gap-2'>
        <input
          type='text'
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder='Type a message...'
          className='flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500'
          disabled={isSending}
        />
        <button
          type='submit'
          disabled={isSending || !inputValue.trim()}
          className='bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 flex items-center gap-2'
        >
          {isSending && (
            <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
          )}
          Send
        </button>
      </form>

      <div className='mt-2 text-xs text-gray-500'>
        Messages only appear after server confirmation
      </div>
    </div>
  )
}

export function UseOptimisticDemo() {
  return (
    <div className='space-y-8'>
      <div className='bg-white rounded-lg p-6 shadow-sm border'>
        <h2 className='text-2xl font-bold text-gray-900 mb-4'>
          useOptimistic Hook - React 19
        </h2>
        <p className='text-gray-600 mb-6'>
          The useOptimistic hook allows you to show optimistic updates
          immediately while the actual update is being processed. This creates a
          more responsive user experience by showing expected results before
          server confirmation.
        </p>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <ChatWithoutOptimistic />
          <ChatWithOptimistic />
        </div>

        {/* Demo Instructions */}
        <div className='mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
          <h4 className='font-semibold text-blue-800 mb-2'>
            🧪 Try This Experiment:
          </h4>
          <ol className='text-blue-700 text-sm space-y-1 list-decimal list-inside'>
            <li>Send messages in both chat interfaces</li>
            <li>
              Notice how the optimistic version shows messages immediately
            </li>
            <li>
              The traditional version waits for server confirmation (2 second
              delay)
            </li>
            <li>
              Both have a 20% chance of simulated failure - watch how they
              handle errors
            </li>
            <li>
              The optimistic approach provides much better perceived performance
            </li>
          </ol>
        </div>

        {/* Benefits */}
        <div className='mt-4 p-4 bg-green-50 border border-green-200 rounded-lg'>
          <h4 className='font-semibold text-green-800 mb-2'>
            ✅ Benefits of Optimistic Updates:
          </h4>
          <ul className='text-green-700 text-sm space-y-1 list-disc list-inside'>
            <li>
              <strong>Better UX:</strong> Immediate feedback makes apps feel
              faster
            </li>
            <li>
              <strong>Reduced perceived latency:</strong> Users don't wait for
              network requests
            </li>
            <li>
              <strong>Graceful error handling:</strong> Can revert or retry
              failed optimistic updates
            </li>
            <li>
              <strong>Works with concurrent features:</strong> Integrates with
              Suspense and transitions
            </li>
            <li>
              <strong>Perfect for social apps:</strong> Chat, comments, likes,
              etc.
            </li>
          </ul>
        </div>

        {/* Use Cases */}
        <div className='mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg'>
          <h4 className='font-semibold text-purple-800 mb-2'>
            💡 Perfect Use Cases:
          </h4>
          <ul className='text-purple-700 text-sm space-y-1 list-disc list-inside'>
            <li>Chat applications and messaging</li>
            <li>Social media interactions (likes, comments, shares)</li>
            <li>Todo list applications</li>
            <li>Real-time collaborative editing</li>
            <li>Shopping cart updates</li>
            <li>Any operation where immediate feedback improves UX</li>
          </ul>
        </div>
      </div>

      {/* Code Example */}
      <div className='bg-gray-900 text-gray-100 p-6 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>💻 Code Example</h3>
        <pre className='text-sm overflow-x-auto'>
          <code>{`import { useOptimistic, useTransition } from 'react'

function MessageList({ messages, onSendMessage }) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [...state, {
      id: 'temp-' + Date.now(),
      text: newMessage,
      status: 'sending'
    }]
  )
  
  const [isPending, startTransition] = useTransition()
  
  const handleSend = (messageText) => {
    // Show optimistic update immediately
    addOptimisticMessage(messageText)
    
    // Actually send the message
    startTransition(async () => {
      try {
        await onSendMessage(messageText)
      } catch (error) {
        // Handle error - could revert optimistic update
        console.error('Failed to send:', error)
      }
    })
  }
  
  return (
    <div>
      {optimisticMessages.map(message => (
        <div key={message.id} className={
          message.status === 'sending' ? 'opacity-70' : ''
        }>
          {message.text}
          {message.status === 'sending' && ' (sending...)'}
        </div>
      ))}
    </div>
  )
}`}</code>
        </pre>
      </div>
    </div>
  )
}
