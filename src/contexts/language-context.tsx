"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, useCallback, useMemo } from "react"
import { getTranslation } from "@/lib/translations"

type LanguageContextType = {
  language: string
  setLanguage: (language: string) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
})

export const useLanguage = () => useContext(LanguageContext)

type LanguageProviderProps = {
  children: ReactNode
  initialLanguage?: string
}

export const LanguageProvider = ({ children, initialLanguage = "en" }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<string>(initialLanguage)

  // Load language preference from localStorage on initial render
  useEffect(() => {
    const storedLanguage = localStorage.getItem("aria-language")
    if (storedLanguage) {
      setLanguageState(storedLanguage)
    }
  }, [])

  // Save language preference to localStorage whenever it changes
  const setLanguage = useCallback((newLanguage: string) => {
    setLanguageState(newLanguage)
    localStorage.setItem("aria-language", newLanguage)
  }, [])

  // Translation function
  const t = useCallback((key: string) => getTranslation(key, language), [language])

  const contextValue = useMemo(
    () => ({
      language,
      setLanguage,
      t,
    }),
    [language, setLanguage, t],
  )

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>
}




