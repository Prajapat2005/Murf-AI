"use client"

import { Volume2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { voices } from "@/constants/data"
import { Button } from "@/components/ui/button"
import { Voice } from "@/types"

interface VoiceSelectionProps {
  selectedVoice: string
  onVoiceChange: (voice: string) => void,
  selectedVoiceData: Voice | undefined
  testVoice: (x: string) => void
}

export default function VoiceSelection({ selectedVoice, onVoiceChange, selectedVoiceData, testVoice }: VoiceSelectionProps,) {
  const getVoiceIcon = (gender: string | undefined) => {
    return gender === "male" ? "👨" : gender === "female" ? "👩" : "🎤"
  }

  return (
    <Card className="shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 translate-y-0 opacity-100 bg-gray-800/90 backdrop-blur-sm border border-gray-700">
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
            <label className="block text-sm font-medium text-gray-300">Choose Voice for Translation Playback</label>
            <Select value={selectedVoice} onValueChange={onVoiceChange}>
              <SelectTrigger className="w-full h-12 border-2 border-gray-600 hover:border-purple-400 transition-colors duration-200 focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white">
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent className="max-h-60 bg-gray-800 border-gray-600">
                {voices.map((voice) => (
                  <SelectItem
                    key={voice.id}
                    value={voice.id}
                    className="hover:bg-gray-700 transition-colors duration-150 text-white"
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

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">Selected Voice Preview</label>
            <div className="flex items-center gap-3 p-4 border-2 border-gray-600 rounded-lg bg-gray-700 hover:border-blue-400  transition-all duration-200 focus:ring-2 focus:ring-blue-500">
              <span className="text-3xl">{getVoiceIcon(selectedVoiceData?.gender)}</span>
              <div className="flex-1">
                <div className="font-medium text-gray-200">{selectedVoiceData?.name}</div>
                <div className="text-sm text-gray-400">{selectedVoiceData?.accent}</div>
              </div>
              <Button
                variant="outline"
                size="sm"
                // @ts-ignore
                onClick={() => testVoice(selectedVoiceData.id)}
                className="transition-all duration-300 transform hover:scale-105 border-gray-600 bg-gray-800 text-gray-200 hover:border-gray-500"
              >
                <Volume2 className="h-4 w-4 mr-2" />
                Test
              </Button>
            </div>
          </div>

        </div>

        <div className="text-center text-sm text-gray-300 mt-6 p-3 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg">
          <p className="animate-fade-in">💡 Select a voice that will be used to play back your translations</p>
        </div>
      </CardContent>
    </Card>
  )
}
