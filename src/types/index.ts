// Define types for the application
export type Message = {
    id: string
    content: string
    isUser: boolean
    timestamp: Date
    fileAttachment?: FileAttachment
  }
  
  export type Language = {
    code: string
    name: string
    nativeName: string
  }
  
  export type Conversation = {
    id: string
    title: string
    messages: Message[]
    language: string
    createdAt: Date
    updatedAt: Date
  }
  
  export type FileAttachment = {
    fileId: string
    fileUrl: string
    fileName: string
    fileType: string
    fileSize: number
  }
  