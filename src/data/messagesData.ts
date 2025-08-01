export interface MessageData {
  id: string
  text: string
  sender: string
  timestamp: Date
  status: 'sent' | 'sending' | 'failed'
}

export const initialMessages: MessageData[] = [
  {
    id: '1',
    text: 'Hey! How are you doing?',
    sender: 'Friend',
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    status: 'sent',
  },
  {
    id: '2',
    text: "I'm doing great! Working on some React 19 features.",
    sender: 'You',
    timestamp: new Date(Date.now() - 240000), // 4 minutes ago
    status: 'sent',
  },
]
