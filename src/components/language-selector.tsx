"use client"

import { Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import LanguageButtonGrid from "@/components/language-button-grid"
import type { Language } from "@/types"

type LanguageSelectorProps = {
  languages: Language[]
  onSelectLanguage: (langCode: string) => void
}

export default function LanguageSelector({ languages, onSelectLanguage }: LanguageSelectorProps) {
  const { t } = useLanguage()

  return (
    <div className="flex h-screen bg-white">
      {/* Left Sidebar - Keep consistent with main UI */}
      <div className="hidden md:flex md:w-[200px] border-r border-gray-200 flex-col">
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          <h1 className="font-medium">{t("chats")}</h1>
          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="p-2">
          <button
            disabled
            className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-gray-100 cursor-not-allowed opacity-70"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>{t("newChat")}</span>
          </button>
        </div>

        <div className="px-4 py-2">
          <div className="font-medium text-sm">{t("selectLanguage")}</div>
          <p className="text-xs text-gray-500 mt-1">{t("languageDescription")}</p>
        </div>

        {/* <div className="mt-auto p-4 border-t border-gray-200">
          <div className="bg-blue-50 p-3 rounded-md mb-2">
            <div className="flex items-center gap-2">
              <div className="bg-blue-500 text-white rounded-md p-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-sm font-medium">{t("enhanceExperience")}</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">{t("getFullPotential")}</p>
          </div>
          <button
            disabled
            className="w-full py-2 border border-gray-300 rounded-md text-sm font-medium opacity-70 cursor-not-allowed"
          >
            {t("upgradeNow")}
          </button>
        </div> */}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        {/* <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="relative inline-block">
              <button
                disabled
                className="flex items-center gap-1 px-3 py-1 text-sm border border-gray-200 rounded-md opacity-70 cursor-not-allowed"
              >
                <span>Aria</span>
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled
              className="flex items-center gap-1 px-3 py-1 text-sm border border-gray-200 rounded-md opacity-70 cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              <span>{t("share")}</span>
            </button>
            <button
              disabled
              className="flex items-center gap-1 px-3 py-1 text-sm border border-red-200 text-red-500 rounded-md opacity-70 cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <span>{t("delete")}</span>
            </button>
          </div>
        </div> */}

        {/* Language Selection Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6 flex flex-col items-center justify-center">
          <LanguageButtonGrid languages={languages} onSelectLanguage={onSelectLanguage} />
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4">
          <div className="relative opacity-70">
            <input
              type="text"
              disabled
              placeholder={t("askMeAnything")}
              className="w-full pl-10 pr-24 py-3 border border-gray-300 rounded-md focus:outline-none cursor-not-allowed"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Globe className="w-4 h-4 text-gray-400" />
            </div>
            <button
              disabled
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1.5 rounded-md bg-gray-400 text-white flex items-center gap-1 cursor-not-allowed"
            >
              <span>{t("continueButton")}</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
          <div className="text-center text-xs text-gray-500 mt-2">
            {t("disclaimer")}
            <a href="#" className="text-blue-500 ml-1">
              {t("verifyDetails")}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}



