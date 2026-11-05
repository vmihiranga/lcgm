import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function Tabs({ tabs, children }) {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const [prevHash, setPrevHash] = useState(location.hash)

  if (location.hash !== prevHash) {
    setPrevHash(location.hash)
    const hash = location.hash?.replace('#', '')
    if (hash && tabs.find((t) => t.id === hash)) {
      setActiveTab(hash)
    }
  }

  return (
    <>
      <div className="page-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn${activeTab === tab.id ? ' active' : ''}`}
            data-tab={tab.id}
            id={`tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {children(activeTab)}
    </>
  )
}
