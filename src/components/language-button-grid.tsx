"use client"

import { useLanguage } from "@/contexts/language-context"
import type { Language } from "@/types"

type LanguageButtonGridProps = {
  languages: Language[]
  onSelectLanguage: (langCode: string) => void
}

export default function LanguageButtonGrid({ languages, onSelectLanguage }: LanguageButtonGridProps) {
  const { t } = useLanguage()

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
              fill="black"
            />
            <path
              d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
              fill="black"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-center">{t("WelcomeTo Smart Hire")}</h2>
        <p className="text-center text-gray-500 mt-2 max-w-md">{t("welcomeDescription")}</p>
        <p className="text-center text-gray-500 mt-2 font-medium">{t("selectLanguage")}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => onSelectLanguage(language.code)}
            className="flex flex-col items-center justify-center p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm transition-all"
            aria-label={`Select ${language.name} language`}
          >
            <span className="text-sm font-medium">{language.name}</span>
            <span className="text-xs text-gray-500">{language.nativeName}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
