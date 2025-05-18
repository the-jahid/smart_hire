import type { Conversation } from "@/types"

// Local storage keys
const CONVERSATIONS_KEY = "aria-conversations"
const ACTIVE_CONVERSATION_KEY = "aria-active-conversation"
const PINNED_CONVERSATIONS_KEY = "aria-pinned-conversations"

// Save conversations to localStorage
export const saveConversations = (conversations: Conversation[]): void => {
  try {
    // Convert Date objects to strings for storage
    const serializedConversations = conversations.map((conversation) => ({
      ...conversation,
      messages: conversation.messages.map((message) => ({
        ...message,
        timestamp: message.timestamp.toISOString(),
      })),
      createdAt: conversation.createdAt.toISOString(),
      updatedAt: conversation.updatedAt.toISOString(),
    }))

    localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(serializedConversations))
  } catch (error) {
    console.error("Error saving conversations to localStorage:", error)
  }
}

// Load conversations from localStorage
export const loadConversations = (): Conversation[] => {
  try {
    const storedConversations = localStorage.getItem(CONVERSATIONS_KEY)

    if (!storedConversations) {
      return []
    }

    // Convert string dates back to Date objects
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return JSON.parse(storedConversations).map((conversation: any) => ({
      ...conversation,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      messages: conversation.messages.map((message: any) => ({
        ...message,
        timestamp: new Date(message.timestamp),
      })),
      createdAt: new Date(conversation.createdAt),
      updatedAt: new Date(conversation.updatedAt),
    }))
  } catch (error) {
    console.error("Error loading conversations from localStorage:", error)
    return []
  }
}

// Save active conversation ID
export const saveActiveConversation = (conversationId: string | null): void => {
  try {
    if (conversationId) {
      localStorage.setItem(ACTIVE_CONVERSATION_KEY, conversationId)
    } else {
      localStorage.removeItem(ACTIVE_CONVERSATION_KEY)
    }
  } catch (error) {
    console.error("Error saving active conversation to localStorage:", error)
  }
}

// Load active conversation ID
export const loadActiveConversation = (): string | null => {
  try {
    return localStorage.getItem(ACTIVE_CONVERSATION_KEY)
  } catch (error) {
    console.error("Error loading active conversation from localStorage:", error)
    return null
  }
}

// Save pinned conversations
export const savePinnedConversations = (pinnedConversations: string[]): void => {
  try {
    localStorage.setItem(PINNED_CONVERSATIONS_KEY, JSON.stringify(pinnedConversations))
  } catch (error) {
    console.error("Error saving pinned conversations to localStorage:", error)
  }
}

// Load pinned conversations
export const loadPinnedConversations = (): string[] => {
  try {
    const storedPinnedConversations = localStorage.getItem(PINNED_CONVERSATIONS_KEY)
    return storedPinnedConversations ? JSON.parse(storedPinnedConversations) : []
  } catch (error) {
    console.error("Error loading pinned conversations from localStorage:", error)
    return []
  }
}
