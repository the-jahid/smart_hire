"use client"

import type React from "react"

import { useState } from "react"

import { MoreHorizontal, Trash2, Edit, Pin } from "lucide-react"
import type { Conversation } from "@/types"
import { useLanguage } from "@/contexts/language-context"

type ConversationItemProps = {
  conversation: Conversation
  isActive: boolean
  isPinned: boolean
  onClick: () => void
  onDelete: () => void
  onRename: (newTitle: string) => void
  onTogglePin: () => void
  searchQuery?: string
}

export default function ConversationItem({
  conversation,
  isActive,
  isPinned,
  onClick,
  onDelete,
  onRename,
  onTogglePin,
  searchQuery = "",
}: ConversationItemProps) {
  const { t } = useLanguage()
  const [showOptions, setShowOptions] = useState(false)
  const [isRenaming, setIsRenaming] = useState(false)
  const [newTitle, setNewTitle] = useState(conversation.title || "")

  // Get the first user message for the title if available
  const firstUserMessage = conversation.messages.find((msg) => msg.isUser)
  const title = conversation.title || (firstUserMessage ? firstUserMessage.content : "New Conversation")

  // Truncate title if it's too long
  const displayTitle = title.length > 30 ? title.substring(0, 30) + "..." : title

  // Format the date
  // const timeAgo = formatDistanceToNow(new Date(conversation.updatedAt), { addSuffix: true })

  // Find if this conversation has a message matching the search query
  const hasMatchingMessage =
    searchQuery && conversation.messages.some((msg) => msg.content.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleRenameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (newTitle.trim()) {
      onRename(newTitle)
      setIsRenaming(false)
    }
  }

  const startRenaming = (e: React.MouseEvent) => {
    e.stopPropagation()
    setNewTitle(conversation.title || "")
    setIsRenaming(true)
    setShowOptions(false)
  }

  return (
    <div
      className={`relative group px-2 py-2 rounded-md cursor-pointer ${isActive ? "bg-gray-100" : "hover:bg-gray-50"}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0 flex items-start gap-2">
          {isPinned && <Pin className="w-3 h-3 text-gray-500 mt-1 flex-shrink-0 rotate-45" />}
          <div className="min-w-0">
            {isRenaming ? (
              <form onSubmit={handleRenameSubmit} onClick={(e) => e.stopPropagation()} className="pr-6">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  autoFocus
                  className="w-full text-sm p-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  onBlur={handleRenameSubmit}
                />
              </form>
            ) : (
              <>
                <p className="text-sm font-medium truncate">{displayTitle}</p>
                <p className="text-xs text-gray-500 truncate">
                  {hasMatchingMessage && searchQuery && <span className="text-blue-500 mr-1">•</span>}
                  {/* {timeAgo} */}
                </p>
              </>
            )}
          </div>
        </div>

        <button
          className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation()
            setShowOptions(!showOptions)
          }}
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {showOptions && (
        <div
          className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-md z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
            onClick={startRenaming}
          >
            <Edit className="w-4 h-4" />
            <span>{t("rename")}</span>
          </button>
          <button
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
            onClick={(e) => {
              e.stopPropagation()
              onTogglePin()
              setShowOptions(false)
            }}
          >
            <Pin className="w-4 h-4" />
            <span>{isPinned ? t("unpin") : t("pin")}</span>
          </button>
          <button
            className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-gray-50 w-full text-left"
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
              setShowOptions(false)
            }}
          >
            <Trash2 className="w-4 h-4" />
            <span>{t("delete")}</span>
          </button>
        </div>
      )}
    </div>
  )
}
