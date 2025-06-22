"use client"
import { Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { languages } from "@/constants/data"
import { useEffect, useState } from "react"

interface LanguageSelectorProps {
  fromLanguage: string
  toLanguage: string
  onFromLanguageChange: (language: string) => void
  onToLanguageChange: (language: string) => void
  onSwapLanguages: () => void
}

export default function LanguageSelector({
  fromLanguage,
  toLanguage,
  onFromLanguageChange,
  onToLanguageChange,
  onSwapLanguages,
}: LanguageSelectorProps) {

  const [isSwapping, setIsSwapping] = useState(false)

  const handleSwap = () => {
    setIsSwapping(true)
    setTimeout(() => {
      onSwapLanguages()
      setIsSwapping(false)
    }, 300)
  }

  return (
    <Card
      className="shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 translate-y-0 opacity-100">

      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-center gap-2 text-xl md:text-2xl">
          <Volume2 className="h-6 w-6 text-blue-600 animate-pulse" />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Language Selection
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">

          <div className="flex-1 w-full space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">From (Source Language)</label>
            <Select value={fromLanguage} onValueChange={onFromLanguageChange}>
              <SelectTrigger className="w-full h-12 border-2 border-gray-200 hover:border-blue-400 transition-colors duration-200 focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Select source language" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {languages.map((lang) => (
                  <SelectItem
                    key={lang.code}
                    value={lang.code}
                    className="hover:bg-blue-50 transition-colors duration-150"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xl">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={handleSwap}
            className={`mt-6 md:mt-8 h-12 w-12 rounded-full border-2 border-blue-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 transform hover:scale-110 ${isSwapping ? "rotate-180" : ""
              }`}
            title="Swap languages"
          >
            <span className="text-xl font-bold text-blue-600">⇄</span>
          </Button>

          <div className="flex-1 w-full space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">To (Target Language)</label>
            <Select value={toLanguage} onValueChange={onToLanguageChange}>
              <SelectTrigger className="w-full h-12 border-2 border-gray-200 hover:border-purple-400 transition-colors duration-200 focus:ring-2 focus:ring-purple-500">
                <SelectValue placeholder="Select target language" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {languages.map((lang) => (
                  <SelectItem
                    key={lang.code}
                    value={lang.code}
                    className="hover:bg-purple-50 transition-colors duration-150"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xl">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

        </div>
      </CardContent>
    </Card>
  )
}
