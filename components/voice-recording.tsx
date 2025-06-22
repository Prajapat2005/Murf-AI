"use client"

import { Mic, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface LISTEN {
  transcript: string,
  startListening: () => void,
  stopListening: () => void,
  browserSupportsSpeechRecognition: any,
  isRecording: boolean
  setIsRecording: (x: boolean) => void,
}


export default function VoiceRecording({ transcript, startListening, stopListening, browserSupportsSpeechRecognition, isRecording, setIsRecording }: LISTEN) {


  const handelOnStart = () => {
    setIsRecording(true);
    startListening();
  }

  const handelOnStop = () => {
    setIsRecording(false);
    stopListening();
  }

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <Card
      className={`shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 translate-y-0 opacity-100  bg-white/80 backdrop-blur-sm border-0 ${isRecording ? "ring-4 ring-red-200 ring-opacity-75" : ""}`}
    >
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-center gap-2 text-xl md:text-2xl">
          <Mic className={`h-6 w-6 text-red-600 ${isRecording ? "animate-pulse" : ""}`} />
          <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Voice Recording
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            {!isRecording ? (
              <Button
                onClick={handelOnStart}
                size="lg"
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full w-20 h-20 md:w-24 md:h-24 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95"
              >
                <Mic className="h-8 w-8 md:h-10 md:w-10" />
              </Button>
            ) : (
              <Button
                onClick={handelOnStop}
                size="lg"
                variant="destructive"
                className="rounded-full w-20 h-20 md:w-24 md:h-24 animate-pulse shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 bg-gradient-to-r from-red-600 to-red-700"
              >
                <MicOff className="h-8 w-8 md:h-10 md:w-10" />
              </Button>
            )}
          </div>

          <div className="text-center space-y-2">
            {isRecording ? (
              <div className="space-y-3 animate-fade-in">
                <Badge variant="destructive" className="animate-pulse px-4 py-2 text-sm">
                  🔴 Recording... Speak now
                </Badge>
                <p className="text-sm text-gray-600 animate-bounce">Click the microphone to stop recording</p>
                <div className="flex justify-center space-x-1">
                  <div className="w-2 h-8 bg-red-500 rounded animate-pulse"></div>
                  <div className="w-2 h-6 bg-red-400 rounded animate-pulse delay-75"></div>
                  <div className="w-2 h-10 bg-red-500 rounded animate-pulse delay-150"></div>
                  <div className="w-2 h-4 bg-red-400 rounded animate-pulse delay-225"></div>
                  <div className="w-2 h-8 bg-red-500 rounded animate-pulse delay-300"></div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 animate-fade-in">
                <Badge variant="outline" className="px-4 py-2 text-sm border-green-300 text-green-700 bg-green-50">
                  ✅ Ready to record
                </Badge>
                <p className="text-sm text-gray-600">Click the microphone to start recording</p>
              </div>
            )}
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 border-t pt-6 space-y-2">
          <p className="font-semibold text-gray-700">
            🎙️{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Recording Tips:
            </span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
            <p className="p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
              • Speak clearly and at a normal pace
            </p>
            <p className="p-2 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">
              • Ensure you're in a quiet environment
            </p>
            <p className="p-2 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors duration-200">
              • Hold the device close to your mouth
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
