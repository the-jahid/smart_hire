"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Paperclip, X, Loader2, Check, FileIcon } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { uploadcareClient } from "@/lib/uploadcare"
import type { FileAttachment } from "@/types"

type FileUploadButtonProps = {
  onFileUpload: (fileAttachment: FileAttachment) => void
  disabled?: boolean
}

export default function FileUploadButton({ onFileUpload, disabled = false }: FileUploadButtonProps) {
  const { t } = useLanguage()
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Upload file to Uploadcare
  const uploadFile = async (file: File): Promise<FileAttachment> => {
    setIsUploading(true)
    try {
      const result = await uploadcareClient.uploadFile(file)

      console.log("File uploaded successfully:", result)

      // Create file attachment object with properly formatted URL
      const fileUrl = `https://ucarecdn.com/${result.uuid}/${encodeURIComponent(file.name)}`
      console.log("File URL for Flowise:", fileUrl)

      const fileAttachment: FileAttachment = {
        fileId: result.uuid,
        fileUrl: fileUrl,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
      }

      return fileAttachment
    } catch (error) {
      console.error("Error uploading file:", error)
      throw error
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setSelectedFile(file)
    setShowConfirmation(true)
  }

  const handleConfirmUpload = async () => {
    if (!selectedFile) return

    try {
      const fileAttachment = await uploadFile(selectedFile)
      onFileUpload(fileAttachment)
      // Reset the file input and selected file after successful upload
      if (fileInputRef.current) fileInputRef.current.value = ""
      setSelectedFile(null)
      setShowConfirmation(false)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Handle error
      alert(t("fileUploadError"))
    }
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const cancelUpload = () => {
    setSelectedFile(null)
    setShowConfirmation(false)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  // Format file size for display
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="relative">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled || isUploading}
      />

      {showConfirmation && selectedFile ? (
        <div className="absolute bottom-full left-0 mb-2 p-2 bg-white border border-gray-200 rounded-md shadow-md w-64 z-10">
          <div className="flex items-center gap-2 mb-2">
            <FileIcon className="w-4 h-4 text-blue-500" />
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-medium truncate">{selectedFile.name}</p>
              <p className="text-xs text-gray-500">{formatFileSize(selectedFile.size)}</p>
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <button
              onClick={cancelUpload}
              className="flex-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              {t("cancel")}
            </button>
            <button
              onClick={handleConfirmUpload}
              className="flex-1 px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center justify-center gap-1"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>{t("uploading")}</span>
                </>
              ) : (
                <>
                  <Check className="w-3 h-3" />
                  <span>{t("upload")}</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : null}

      {selectedFile && isUploading ? (
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Loader2 className="w-3 h-3 animate-spin" />
          <span className="truncate max-w-[150px]">{selectedFile.name}</span>
          <button onClick={cancelUpload} className="text-gray-400 hover:text-gray-600">
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleButtonClick}
          disabled={disabled || isUploading}
          className={`text-gray-500 hover:text-gray-700 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          title={t("attachFile")}
        >
          <Paperclip className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
