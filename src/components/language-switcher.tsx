"use client"

import { useState } from "react"
import { Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import type { Language } from "@/types"

type LanguageSwitcherProps = {
  languages: Language[]
}

export default function LanguageSwitcher({ languages }: LanguageSwitcherProps) {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 rounded-md hover:bg-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe className="w-3 h-3" />
        <span>{languages.find((l) => l.code === language)?.name || "English"}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-md z-10 w-48">
          <div className="p-2 border-b border-gray-200">
            <h3 className="text-sm font-medium">{t("changeLanguage")}</h3>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex justify-between items-center ${
                  lang.code === language ? "bg-blue-50 text-blue-600" : ""
                }`}
                onClick={() => handleLanguageChange(lang.code)}
              >
                <span>{lang.name}</span>
                <span className="text-xs text-gray-500">{lang.nativeName}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
