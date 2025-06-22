"use client"

import { Volume2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { voices } from "@/constants/data"

interface VoiceSelectionProps {
  selectedVoice: string
  onVoiceChange: (voice: string) => void,
}

export default function VoiceSelection({ selectedVoice, onVoiceChange }: VoiceSelectionProps) {

  const getVoiceIcon = (gender: string) => {
    return gender === "male" ? "👨" : gender === "female" ? "👩" : "🎤"
  }

  const selectedVoiceData = voices.find((v) => v.id === selectedVoice)

  return (
    <Card
      className="shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 translate-y-0 opacity-100
        bg-white/80 backdrop-blur-sm border-0"
    >
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-center gap-2 text-xl md:text-2xl">
          <Volume2 className="h-6 w-6 text-purple-600 animate-pulse" />
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Voice Selection for Translation Playback
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Choose Voice for Translation Playback</label>
            <Select value={selectedVoice} onValueChange={onVoiceChange}>
              <SelectTrigger className="w-full h-12 border-2 border-gray-200 hover:border-purple-400 transition-colors duration-200 focus:ring-2 focus:ring-purple-500">
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {voices.map((voice) => (
                  <SelectItem
                    key={voice.id}
                    value={voice.id}
                    className="hover:bg-purple-50 transition-colors duration-150"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{getVoiceIcon(voice.gender)}</span>
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
        </div>

        <div className="text-center text-sm text-gray-600 mt-6 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <p className="animate-fade-in">💡 Select a voice that will be used to play back your translations</p>
        </div>
      </CardContent>
    </Card>
  )
}
