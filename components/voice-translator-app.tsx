"use client"

import { useEffect, useState } from "react"
import AppHeader from "./app-header"
import LanguageSelector from "./language-selector"
import VoiceSelection from "./voice-selection"
import VoiceRecording from "./voice-recording"
import TextDisplay from "./text-display"
import InstructionsCard from "./instructions-card"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from "axios"

export default function VoiceTranslatorApp() {
  const [isRecording, setIsRecording] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)
  const [translatedText, setTranslatedText] = useState("")
  const [fromLanguage, setFromLanguage] = useState("en-US")
  const [toLanguage, setToLanguage] = useState("hi-IN")
  const [selectedVoice, setSelectedVoice] = useState("default")
  const [speak, setSpeak] = useState(false)


  const swapLanguages = () => {
    const temp = fromLanguage
    setFromLanguage(toLanguage)
    setToLanguage(temp)
    setTranslatedText("")
    resetTranscript()
  }

  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
  const stopListening = () => SpeechRecognition.stopListening();

  const handelTranslate = async () => {

    setIsTranslating(true);

    try {
      const response = await axios.post(
        "https://api.murf.ai/v1/text/translate",
        {
          targetLanguage: toLanguage,
          texts: [transcript],
        },
        {
          headers: {
            'api-key': process.env.NEXT_PUBLIC_MAPBOX_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      setTranslatedText(response.data.translations[0].translated_text);

      console.log(translatedText);

    } catch (error: any) {
      console.error("Request Error:", error.response?.data || error.message);
    }

    setIsTranslating(false);
  };


  const playAudioWithExactTimeout = (audioFile: string) => {

    const audio = new Audio(audioFile);
    return audio.play();

  };

  const handelSpeak = async () => {
    setSpeak(true);

    try {

      let data = JSON.stringify({
        "text": translatedText,
        "voiceId": "hi-IN-amit",
      });

      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'api-key': process.env.NEXT_PUBLIC_MAPBOX_API_KEY
      }

      const res = await axios.post("https://api.murf.ai/v1/speech/generate", data, { headers });
      console.log(JSON.stringify(res.data));

      await playAudioWithExactTimeout(res.data.audioFile);

    } catch (error: any) {
      console.log(error.message);
    }
    setSpeak(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <AppHeader />

        <LanguageSelector
          fromLanguage={fromLanguage}
          toLanguage={toLanguage}
          onFromLanguageChange={setFromLanguage}
          onToLanguageChange={setToLanguage}
          onSwapLanguages={swapLanguages}
        />

        <VoiceSelection
          selectedVoice={selectedVoice}
          onVoiceChange={setSelectedVoice}
        />

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
        />

        <InstructionsCard />
      </div>
    </div>
  )
}
