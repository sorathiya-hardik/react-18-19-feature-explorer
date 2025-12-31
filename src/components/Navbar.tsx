import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import { tabsData } from '../data'

interface NavbarProps {
  activeTab: string
  onTabChange: (tabId: string) => void
}

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleTabClick = (tabId: string) => {
    onTabChange(tabId)
    setIsMobileMenuOpen(false)
  }

  return (
    <header className='bg-white/90 backdrop-blur-2xl border-b border-gray-200/60 sticky top-0 z-50 shadow-sm'>
      <div className='container mx-auto px-4 sm:px-6 py-4'>
        <div className='flex items-center justify-between gap-4'>
          {/* Logo/Title */}
          <div className='flex items-center gap-3 flex-shrink-0'>
            <div className='relative'>
              <div className='absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20'></div>
              <button
                onClick={() => handleTabClick('overview')}
                className='relative flex items-center gap-2 bg-white rounded-2xl px-3 py-2 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group'
              >
                <img
                  src={reactLogo}
                  className='h-5 w-5 animate-spin group-hover:scale-110 transition-transform'
                  style={{ animationDuration: '20s' }}
                  alt='React logo'
                />
                <span className='text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:inline'>
                  React 18 & 19
                </span>
              </button>
            </div>
          </div>

          {/* Desktop Tab Navigation */}
          <nav className='hidden lg:flex flex-1 items-center justify-center'>
            <div className='flex items-center bg-gray-50/80 rounded-lg overflow-x-auto gap-1 px-2 py-1'>
              {tabsData.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`relative px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-600 shadow-md shadow-blue-500/10'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                  title={tab.label}
                >
                  <span className='relative z-10'>{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg'></div>
                  )}
                </button>
              ))}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='lg:hidden relative p-2 rounded-lg border border-gray-200 bg-gray-50/50 hover:bg-gray-100 transition-colors'
            aria-label='Toggle menu'
          >
            <div className='flex flex-col gap-1.5'>
              <span
                className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className='lg:hidden mt-4 pb-4 animate-in fade-in slide-in-from-top-2 duration-200'>
            <div className='flex flex-col gap-2 bg-gray-50/80 rounded-lg p-3 max-h-[70vh] overflow-y-auto'>
              {tabsData.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`relative w-full text-left px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-600 shadow-md shadow-blue-500/10'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
