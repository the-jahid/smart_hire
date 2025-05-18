"use client"

import { useState } from "react"
import { Search, Plus, ChevronDown, ChevronUp,  X,  HistoryIcon } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import ConversationItem from "@/components/conversation-item"
import type { Conversation } from "@/types"



type SidebarProps = {
  conversations: Conversation[]
  pinnedConversations: string[]
  activeConversationId: string | null
  onNewChat: () => void
  onSelectConversation: (id: string) => void
  onDeleteConversation: (id: string) => void
  onRenameConversation: (id: string, newTitle: string) => void
  onTogglePinConversation: (id: string) => void
}

export default function Sidebar({
  conversations,
  pinnedConversations,
  activeConversationId,
  onNewChat,
  onSelectConversation,
  onDeleteConversation,
  onRenameConversation,
  onTogglePinConversation,
}: SidebarProps) {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [showAllConversations, setShowAllConversations] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Sort conversations by updatedAt (most recent first)
  const sortedConversations = [...conversations].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  )

  // Filter conversations based on search query
  const filteredConversations = searchQuery
    ? sortedConversations.filter((conv) => {
        // Search in conversation title
        if (conv.title.toLowerCase().includes(searchQuery.toLowerCase())) {
          return true
        }
        // Search in conversation messages
        return conv.messages.some((msg) => msg.content.toLowerCase().includes(searchQuery.toLowerCase()))
      })
    : sortedConversations

  // Separate pinned conversations
  const pinnedConvs = filteredConversations.filter((conv) => pinnedConversations.includes(conv.id))
  const unpinnedConvs = filteredConversations.filter((conv) => !pinnedConversations.includes(conv.id))

  // Limit to 5 recent unpinned conversations unless showAllConversations is true
  const displayedUnpinnedConversations = showAllConversations ? unpinnedConvs : unpinnedConvs.slice(0, 5)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="bg-white"  >
      {/* Mobile toggle button */}
      <button
        className="md:hidden absolute  top-3 right-16 z-30 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
        onClick={toggleSidebar}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <X className="w-5 h-5" /> : <HistoryIcon className="w-5 h-5   " />}
      </button>

      {/* Sidebar overlay for mobile */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-[260px] bg-white border-r border-gray-200 z-20 transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } flex flex-col`}
      >
        <div className="p-4 border-b border-gray-200">
          <h1 className="font-medium mb-3">{t("chats")}</h1>
          <div className="relative">
            <input
              type="text"
              placeholder={t("search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-8 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 transform -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="p-2">
          <button
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-100 border"
            onClick={() => {
              onNewChat()
              setIsOpen(false)
            }}
          >
            <Plus className="w-4 h-4" />
            <span>{t("newChat")}</span>
          </button>
        </div>

        {/* Conversation Lists */}
        <div className="flex-1 overflow-y-auto">
          {/* Pinned Conversations */}
          {pinnedConvs.length > 0 && (
            <div className="px-2 py-1">
              <div className="flex items-center justify-between px-2 py-1">
                <div className="text-xs font-medium text-gray-500">{t("pinned")}</div>
              </div>

              {pinnedConvs.map((conversation) => (
                <ConversationItem
                  key={`pinned-${conversation.id}`}
                  conversation={conversation}
                  isActive={conversation.id === activeConversationId}
                  isPinned={true}
                  searchQuery={searchQuery}
                  onClick={() => {
                    onSelectConversation(conversation.id)
                    setIsOpen(false)
                  }}
                  onDelete={() => onDeleteConversation(conversation.id)}
                  onRename={(newTitle) => onRenameConversation(conversation.id, newTitle)}
                  onTogglePin={() => onTogglePinConversation(conversation.id)}
                />
              ))}
            </div>
          )}

          {/* Regular Conversations */}
          {unpinnedConvs.length > 0 && (
            <div className="px-2 py-1">
              <div className="flex items-center justify-between px-2 py-1">
                <div className="text-xs font-medium text-gray-500">
                  
                  {searchQuery ? t("searchResults") : t("All Conversation")}
                </div>
                {!searchQuery && unpinnedConvs.length > 5 && (
                  <button
                    className="text-xs text-blue-500 flex items-center"
                    onClick={() => setShowAllConversations(!showAllConversations)}
                  >
                    {showAllConversations ? (
                      <>
                        <span>{t("showLess")}</span>
                        <ChevronUp className="w-3 h-3 ml-1" />
                      </>
                    ) : (
                      <>
                        <span>{t("showAll")}</span>
                        <ChevronDown className="w-3 h-3 ml-1" />
                      </>
                    )}
                  </button>
                )}
              </div>

              {displayedUnpinnedConversations.length > 0 ? (
                displayedUnpinnedConversations.map((conversation) => (
                  <ConversationItem
                    key={`unpinned-${conversation.id}`}
                    conversation={conversation}
                    isActive={conversation.id === activeConversationId}
                    isPinned={false}
                    searchQuery={searchQuery}
                    onClick={() => {
                      onSelectConversation(conversation.id)
                      setIsOpen(false)
                    }}
                    onDelete={() => onDeleteConversation(conversation.id)}
                    onRename={(newTitle) => onRenameConversation(conversation.id, newTitle)}
                    onTogglePin={() => onTogglePinConversation(conversation.id)}
                  />
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-gray-500">{t("noSearchResults")}</div>
              )}
            </div>
          )}

          {filteredConversations.length === 0 && (
            <div className="px-3 py-2 text-sm text-gray-500">{t("noSearchResults")}</div>
          )}
        </div>

        
      </div>
    </div>
  )
}




