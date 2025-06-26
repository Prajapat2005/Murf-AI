"use client"

import { Play, Pause, Download, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface TextDisplayProps {
  transcript: string
  fromLanguage: string
  toLanguage: string
  isTranslating: boolean
  handelTranslate: () => void
  translatedText: string
  handelSpeak: () => void
  speak: boolean,
  handelDownload: () => void,
}

export default function TextDisplay({
  isTranslating,
  transcript,
  fromLanguage,
  toLanguage,
  handelTranslate,
  translatedText,
  handelSpeak,
  speak,
  handelDownload,
}: TextDisplayProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-700 transform translate-y-0 opacity-100">
      <Card className="shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 bg-gray-800/90 backdrop-blur-sm border border-gray-700">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-lg md:text-xl">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Original Text
            </span>
            <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50 animate-fade-in">
              {fromLanguage}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={transcript}
            /*
             onChange={(e) => onOriginalTextChange(e.target.value)} */
            placeholder="Your speech will appear here..."
            className="min-h-[120px] md:min-h-[140px] resize-none border-2 border-gray-600 focus:border-blue-400 transition-colors duration-200 text-base bg-gray-700 text-white placeholder-slate-300"
            readOnly
          />
          <Button
            onClick={handelTranslate}
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            disabled={isTranslating}
          >
            {isTranslating ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Translating...
              </div>
            ) : (
              "Translate"
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 bg-gray-800/90 backdrop-blur-sm border border-gray-700">
        <CardHeader className="pb-4">
          <CardTitle className="flex justify-between">
            <div className="flex items-center gap-3 text-lg md:text-xl">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Translated Text
              </span>
              <Badge variant="outline" className="border-purple-300 text-purple-700 bg-purple-50 animate-fade-in">
                {toLanguage}
              </Badge>
            </div>
            {translatedText &&
              (<div>
                <Button
                  onClick={() => navigator.clipboard.writeText(translatedText)}
                  className="flex-1 h-10 w-20 border-2 border-gray-600 bg-gray-700 text-white focus:border-purple-400 transition-colors duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
                  <Copy className="h-5 w-5" />
                  Copy
                </Button>
              </div>)
            }
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={translatedText}
            placeholder="Translation will appear here..."
            className="min-h-[120px] md:min-h-[140px] resize-none border-2 border-gray-600 focus:border-purple-400 transition-colors duration-200 text-base bg-gray-700 text-white placeholder-slate-300"
            readOnly
          />
          {translatedText && (
            <div className="flex gap-3">

              {!speak ? (
                <Button
                  onClick={handelSpeak}
                  className="flex-1 h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Play Translation
                </Button>
              ) : (
                <Button
                  className="flex-1 h-12 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl animate-pulse"
                >
                  <Pause className="h-5 w-5 mr-2" />
                  Playing!!
                </Button>
              )}

              <Button
                onClick={handelDownload}
                variant="destructive"
                className="flex-1 h-12 bg-blue-500 hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Translation
              </Button>

            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
