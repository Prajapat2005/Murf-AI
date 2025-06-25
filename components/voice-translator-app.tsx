"use client"

import { useState } from "react"
import AppHeader from "./app-header"
import LanguageSelector from "./language-selector"
import VoiceSelection from "./voice-selection"
import VoiceRecording from "./voice-recording"
import TextDisplay from "./text-display"
import InstructionsCard from "./instructions-card"
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
import axios from "axios"

export default function VoiceTranslatorApp() {
  const [isRecording, setIsRecording] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)
  const [translatedText, setTranslatedText] = useState("")
  const [fromLanguage, setFromLanguage] = useState("en-US")
  const [toLanguage, setToLanguage] = useState("hi-IN")
  const [selectedVoice, setSelectedVoice] = useState("hi-IN-amit")
  const [speak, setSpeak] = useState(false);
  const [audioFile, setAudioFile] = useState("");

  const swapLanguages = () => {
    const temp = fromLanguage
    setFromLanguage(toLanguage)
    setToLanguage(temp)
    setTranslatedText("")
    resetTranscript()
  }

  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: "en-IN" })
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition()
  const stopListening = () => SpeechRecognition.stopListening()


  const handelTranslate = async () => {
    setIsTranslating(true)
    try {
      const response = await axios.post(
        "https://api.murf.ai/v1/text/translate",
        {
          targetLanguage: toLanguage,
          texts: [transcript],
        },
        {
          headers: {
            "api-key": process.env.NEXT_PUBLIC_MAPBOX_API_KEY,
            "Content-Type": "application/json",
          },
        },
      )

      setTranslatedText(response.data.translations[0].translated_text);

    } catch (error: any) {
      console.error("Request Error:", error.response?.data || error.message)
    }

    setIsTranslating(false)
  }

  const playAudioWithExactTimeout = () => {
    const audio = new Audio(audioFile)
    return audio.play()
  }

  const handelSpeak = async () => {
    setSpeak(true)

    try {
      const data = JSON.stringify({
        text: translatedText,
        voiceId: selectedVoice,
      })

      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        "api-key": process.env.NEXT_PUBLIC_MAPBOX_API_KEY,
      }

      const res = await axios.post("https://api.murf.ai/v1/speech/generate", data, { headers });

      console.log(JSON.stringify(res.data.audioFile));

      setAudioFile(res.data.audioFile);

      await playAudioWithExactTimeout();

    } catch (error: any) {
      console.log(error.message)
    }
    setSpeak(false)
  }

  const onDownload = async () => {

    const url = audioFile;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch audio file");
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "murf-voice.wav"; // file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);

    } catch (error) {
      console.error("Download failed:", error);
    }
  };


  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,_#0d1039_0%,_#121e2b_4%,_#111111_10%)] lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <AppHeader />

        <LanguageSelector
          fromLanguage={fromLanguage}
          toLanguage={toLanguage}
          onFromLanguageChange={setFromLanguage}
          onToLanguageChange={setToLanguage}
          onSwapLanguages={swapLanguages}
        />

        <VoiceSelection selectedVoice={selectedVoice} onVoiceChange={setSelectedVoice} />

        <VoiceRecording
          transcript={transcript}
          startListening={startListening}
          stopListening={stopListening}
          browserSupportsSpeechRecognition={browserSupportsSpeechRecognition}
          isRecording={isRecording}
          setIsRecording={setIsRecording}
        />

        <TextDisplay
          translatedText={translatedText}
          transcript={transcript}
          fromLanguage={fromLanguage}
          toLanguage={toLanguage}
          isTranslating={isTranslating}
          handelTranslate={handelTranslate}
          handelSpeak={handelSpeak}
          speak={speak}
          onDownload={onDownload}
        />

        <InstructionsCard />
      </div>
    </div>
  )
}
