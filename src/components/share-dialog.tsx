"use client"

import { useState, useEffect } from "react"
import { Copy, X, Check } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import type { Conversation } from "@/types"

type ShareDialogProps = {
  conversation: Conversation
  onClose: () => void
}

export default function ShareDialog({ conversation, onClose }: ShareDialogProps) {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)
  const [shareUrl, setShareUrl] = useState("")

  useEffect(() => {
    // Generate a share URL based on the conversation ID
    const baseUrl = window.location.origin
    setShareUrl(`${baseUrl}/shared/${conversation.id}`)
  }, [conversation.id])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium">{t("shareConversation")}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <p className="text-sm text-gray-600 mb-4">{t("publicAccess")}</p>

          <div className="flex items-center">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={handleCopyLink}
              className={`px-3 py-2 rounded-r-md ${
                copied ? "bg-green-500" : "bg-blue-500"
              } text-white flex items-center gap-1`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{t("linkCopied")}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{t("copyLink")}</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
