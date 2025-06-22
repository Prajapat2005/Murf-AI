/* "use client"

import { useState, useRef, useEffect } from "react"
import { Mic, MicOff, Play, Square, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
]

const voices = [
  { id: "default", name: "Default Voice", gender: "neutral", accent: "Standard" },
  { id: "male-1", name: "David", gender: "male", accent: "American" },
  { id: "female-1", name: "Sarah", gender: "female", accent: "American" },
  { id: "male-2", name: "James", gender: "male", accent: "British" },
  { id: "female-2", name: "Emma", gender: "female", accent: "British" },
  { id: "male-3", name: "Pierre", gender: "male", accent: "French" },
  { id: "female-3", name: "Marie", gender: "female", accent: "French" },
  { id: "male-4", name: "Hans", gender: "male", accent: "German" },
  { id: "female-4", name: "Greta", gender: "female", accent: "German" },
  { id: "male-5", name: "Carlos", gender: "male", accent: "Spanish" },
  { id: "female-5", name: "Sofia", gender: "female", accent: "Spanish" },
]

export default function VoiceTranslator() {
  const [isRecording, setIsRecording] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)
  const [originalText, setOriginalText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [fromLanguage, setFromLanguage] = useState("en")
  const [toLanguage, setToLanguage] = useState("es")
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedVoice, setSelectedVoice] = useState("default")

  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis
    }
  }, [])

  const startRecording = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser")
      return
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    recognitionRef.current = new SpeechRecognition()

    recognitionRef.current.continuous = true
    recognitionRef.current.interimResults = true
    recognitionRef.current.lang = fromLanguage

    recognitionRef.current.onstart = () => {
      setIsRecording(true)
      setOriginalText("")
      setTranslatedText("")
    }

    recognitionRef.current.onresult = (event: any) => {
      let finalTranscript = ""

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript
        }
      }

      if (finalTranscript) {
        setOriginalText(finalTranscript)
        translateText(finalTranscript)
      }
    }

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error)
      setIsRecording(false)
    }

    recognitionRef.current.onend = () => {
      setIsRecording(false)
    }

    recognitionRef.current.start()
  }

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsRecording(false)
  }

  const translateText = async (text: string) => {
    if (!text.trim()) return

    setIsTranslating(true)

    try {
      // Simulate translation API call
      // In a real app, you would use a translation service like Google Translate API
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          from: fromLanguage,
          to: toLanguage,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setTranslatedText(data.translatedText)
      } else {
        // Fallback for demo purposes
        setTranslatedText(`[Translated from ${fromLanguage} to ${toLanguage}]: ${text}`)
      }
    } catch (error) {
      console.error("Translation error:", error)
      // Fallback for demo purposes
      setTranslatedText(`[Translated from ${fromLanguage} to ${toLanguage}]: ${text}`)
    } finally {
      setIsTranslating(false)
    }
  }

  const playTranslation = () => {
    if (!synthRef.current || !translatedText) return

    setIsPlaying(true)
    const utterance = new SpeechSynthesisUtterance(translatedText)
    utterance.lang = toLanguage
    utterance.rate = 0.8

    // Set voice based on selection
    if (selectedVoice !== "default" && synthRef.current.getVoices().length > 0) {
      const availableVoices = synthRef.current.getVoices()
      const selectedVoiceData = voices.find((v) => v.id === selectedVoice)

      if (selectedVoiceData) {
        // Try to find a matching voice based on gender and accent
        const matchingVoice = availableVoices.find(
          (voice) =>
            voice.lang.startsWith(toLanguage) &&
            (selectedVoiceData.gender === "male"
              ? voice.name.toLowerCase().includes("male") ||
                voice.name.toLowerCase().includes("david") ||
                voice.name.toLowerCase().includes("james")
              : selectedVoiceData.gender === "female"
                ? voice.name.toLowerCase().includes("female") ||
                  voice.name.toLowerCase().includes("sarah") ||
                  voice.name.toLowerCase().includes("emma")
                : true),
        )

        if (matchingVoice) {
          utterance.voice = matchingVoice
        }
      }
    }

    utterance.onend = () => {
      setIsPlaying(false)
    }

    utterance.onerror = () => {
      setIsPlaying(false)
    }

    synthRef.current.speak(utterance)
  }

  const stopPlaying = () => {
    if (synthRef.current) {
      synthRef.current.cancel()
      setIsPlaying(false)
    }
  }

  const swapLanguages = () => {
    const temp = fromLanguage
    setFromLanguage(toLanguage)
    setToLanguage(temp)
    setOriginalText("")
    setTranslatedText("")
  }

  const getLanguageDisplay = (code: string) => {
    const lang = languages.find((l) => l.code === code)
    return lang ? `${lang.flag} ${lang.name}` : code
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Voice Translator</h1>
          <p className="text-gray-600">Speak in one language, hear it in another</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Volume2 className="h-5 w-5" />
              Language Selection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">From (Source Language)</label>
                <Select value={fromLanguage} onValueChange={setFromLanguage}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select source language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button variant="outline" size="icon" onClick={swapLanguages} className="mt-6" title="Swap languages">
                ⇄
              </Button>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">To (Target Language)</label>
                <Select value={toLanguage} onValueChange={setToLanguage}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select target language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Volume2 className="h-5 w-5" />
              Voice Selection for Translation Playback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Choose Voice for Translation Playback</label>
                <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {voices.map((voice) => (
                      <SelectItem key={voice.id} value={voice.id}>
                        <div className="flex items-center gap-2">
                          <span>{voice.gender === "male" ? "👨" : voice.gender === "female" ? "👩" : "🎤"}</span>
                          <div className="flex flex-col">
                            <span className="font-medium">{voice.name}</span>
                            <span className="text-xs text-gray-500">{voice.accent}</span>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Selected Voice Preview</label>
                <div className="flex items-center gap-2 p-3 border rounded-md bg-gray-50">
                  <span className="text-2xl">
                    {(() => {
                      const selectedVoiceData = voices.find((v) => v.id === selectedVoice)
                      return selectedVoiceData?.gender === "male"
                        ? "👨"
                        : selectedVoiceData?.gender === "female"
                          ? "👩"
                          : "🎤"
                    })()}
                  </span>
                  <div className="flex-1">
                    <div className="font-medium">
                      {voices.find((v) => v.id === selectedVoice)?.name || "Default Voice"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {voices.find((v) => v.id === selectedVoice)?.accent || "Standard"}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (synthRef.current) {
                        const utterance = new SpeechSynthesisUtterance("Hello, this is a voice preview.")
                        utterance.lang = toLanguage
                        utterance.rate = 0.8
                        synthRef.current.speak(utterance)
                      }
                    }}
                  >
                    <Volume2 className="h-4 w-4 mr-1" />
                    Test
                  </Button>
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-gray-600 mt-4">
              <p>💡 Select a voice that will be used to play back your translations</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Voice Recording</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              {!isRecording ? (
                <Button
                  onClick={startRecording}
                  size="lg"
                  className="bg-red-500 hover:bg-red-600 text-white rounded-full w-16 h-16"
                >
                  <Mic className="h-6 w-6" />
                </Button>
              ) : (
                <Button
                  onClick={stopRecording}
                  size="lg"
                  variant="destructive"
                  className="rounded-full w-16 h-16 animate-pulse"
                >
                  <MicOff className="h-6 w-6" />
                </Button>
              )}
            </div>

            {isRecording && (
              <div className="text-center">
                <Badge variant="destructive" className="animate-pulse">
                  Recording... Speak now
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Original Text</span>
                <Badge variant="outline">{getLanguageDisplay(fromLanguage)}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)}
                placeholder="Your speech will appear here..."
                className="min-h-[120px] resize-none"
                readOnly={isRecording}
              />
              {originalText && !isRecording && (
                <Button onClick={() => translateText(originalText)} className="mt-2 w-full" disabled={isTranslating}>
                  {isTranslating ? "Translating..." : "Translate"}
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Translated Text</span>
                <Badge variant="outline">{getLanguageDisplay(toLanguage)}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={translatedText}
                placeholder="Translation will appear here..."
                className="min-h-[120px] resize-none"
                readOnly
              />
              {translatedText && (
                <div className="flex gap-2 mt-2">
                  {!isPlaying ? (
                    <Button onClick={playTranslation} className="flex-1">
                      <Play className="h-4 w-4 mr-2" />
                      Play Translation
                    </Button>
                  ) : (
                    <Button onClick={stopPlaying} variant="destructive" className="flex-1">
                      <Square className="h-4 w-4 mr-2" />
                      Stop Playing
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <div className="text-center text-sm text-gray-600">
              <p>
                💡 <strong>How to use:</strong>
              </p>
              <p>1. Select your source and target languages</p>
              <p>2. Choose your preferred voice for translation playback</p>
              <p>3. Click the microphone button and start speaking</p>
              <p>4. Your speech will be automatically translated</p>
              <p>5. Click "Play Translation" to hear the result in your selected voice</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
 */