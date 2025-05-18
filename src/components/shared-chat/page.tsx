"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MessageSquare, ArrowLeft } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface SharedChat {
  name: string
  messages: Message[]
}

export default function SharedChatPage() {
  const [sharedChat, setSharedChat] = useState<SharedChat | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    try {
      // Get the shared data from URL
      const urlParams = new URLSearchParams(window.location.search)
      const sharedData = urlParams.get("data")

      if (!sharedData) {
        setError("No shared conversation found")
        setLoading(false)
        return
      }

      // Decode the shared conversation
      const decodedData = decodeURIComponent(atob(sharedData))
      const parsedData = JSON.parse(decodedData)

      setSharedChat(parsedData)
    } catch (err) {
      console.error("Error parsing shared data:", err)
      setError("Invalid shared conversation data")
    } finally {
      setLoading(false)
    }
  }, [])

  const goBack = () => {
    router.push("/")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading shared conversation...</p>
        </div>
      </div>
    )
  }

  if (error || !sharedChat) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-red-500"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h1 className="text-xl font-bold mb-2">Error Loading Conversation</h1>
        <p className="text-gray-600 mb-6">{error || "Something went wrong"}</p>
        <button
          onClick={goBack}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          <span>Go Back</span>
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-200">
        <button onClick={goBack} className="p-2 mr-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="font-medium">{sharedChat.name}</h1>
          <p className="text-xs text-gray-500">Shared Conversation</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {sharedChat.messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] sm:max-w-[70%] p-3 rounded-lg ${
                message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <MessageSquare size={16} />
          <span>This is a read-only shared conversation</span>
        </div>
      </div>
    </div>
  )
}
