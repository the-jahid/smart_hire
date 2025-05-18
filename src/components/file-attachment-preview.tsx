/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
"use client"

import { FileText, ImageIcon , File, X, Download } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import type { FileAttachment } from "@/types"

type FileAttachmentPreviewProps = {
  fileAttachment: FileAttachment
  onRemove?: () => void
  showRemoveButton?: boolean
}

export default function FileAttachmentPreview({
  fileAttachment,
  onRemove,
  showRemoveButton = true,
}: FileAttachmentPreviewProps) {
  const { t } = useLanguage()

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const getFileIcon = () => {
    if (fileAttachment.fileType.startsWith("image/")) {
      return <ImageIcon className="w-5 h-5 text-blue-500"  />
    } else if (fileAttachment.fileType.includes("pdf")) {
      return <FileText className="w-5 h-5 text-red-500" />
    } else {
      return <File className="w-5 h-5 text-gray-500" />
    }
  }

  const isImage = fileAttachment.fileType.startsWith("image/")

  return (
    <div className="flex flex-col border border-gray-200 rounded-md overflow-hidden bg-white">
      {isImage && (
        <div className="relative w-full h-32 bg-gray-100">
          // eslint-disable-next-line @next/next/no-img-element, @next/next/no-img-element
          <img
            src={fileAttachment.fileUrl || "/placeholder.svg"}
            alt={fileAttachment.fileName}
            className="w-full h-full object-contain"
          />
        </div>
      )}

      <div className="p-2 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden">
          {!isImage && getFileIcon()}
          <div className="overflow-hidden">
            <p className="text-sm font-medium truncate">{fileAttachment.fileName}</p>
            <p className="text-xs text-gray-500">{formatFileSize(fileAttachment.fileSize)}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <a
            href={fileAttachment.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 text-gray-500 hover:text-gray-700"
            title={t("download")}
          >
            <Download className="w-4 h-4" />
          </a>

          {showRemoveButton && onRemove && (
            <button onClick={onRemove} className="p-1 text-gray-500 hover:text-red-500" title={t("remove")}>
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
