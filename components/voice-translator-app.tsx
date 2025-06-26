"use client"

import { use, useEffect, useState } from "react"
import AppHeader from "./app-header"
import LanguageSelector from "./language-selector"
import VoiceSelection from "./voice-selection"
import VoiceRecording from "./voice-recording"
import TextDisplay from "./text-display"
import InstructionsCard from "./instructions-card"
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
import { toast } from "react-toastify";
import { Voice } from "@/types"
import { voices } from "@/constants/data"
import { translate } from "@/utils/translate"
import { download } from "@/utils/download"
import { generateAudio } from "@/utils/voice"
import "react-toastify/dist/ReactToastify.css";

export default function VoiceTranslatorApp() {
  const [isRecording, setIsRecording] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)
  const [translatedText, setTranslatedText] = useState("")
  const [fromLanguage, setFromLanguage] = useState("en-US")
  const [toLanguage, setToLanguage] = useState("hi-IN")
  const [selectedVoice, setSelectedVoice] = useState("hi-IN-amit")
  const [speak, setSpeak] = useState(false);
  const [audioFile, setAudioFile] = useState("");
  const [selectedVoiceData, setSelectedVoiceData] = useState<Voice | undefined>();

  useEffect(() => {
    setSelectedVoiceData(voices.find((voice: Voice) => voice.id === selectedVoice));
  }, [selectedVoice,])

  useEffect(() => {
    setAudioFile("");
    resetTranscript();
    setTranslatedText("");
  }, [fromLanguage, toLanguage]);

  useEffect(() => {
    setAudioFile("");
  }, [selectedVoice]);

  const swapLanguages = () => {
    const temp = fromLanguage
    setFromLanguage(toLanguage)
    setToLanguage(temp);
  }


  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: toLanguage })
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition()
  const stopListening = () => SpeechRecognition.stopListening()


  const handelTranslate = async () => {

    setIsTranslating(true);

    try {

      const data = {
        text: transcript,
        toLanguage: toLanguage
      }

      const response = await translate(data);

      setTranslatedText(response.data.translations[0].translated_text);

    } catch (error: any) {
      console.error("Request Error:", error.response?.data || error.message)
    }

    setIsTranslating(false);
  }

  const handelSpeak = async () => {

    setSpeak(true);

    if (audioFile !== "") {
      await playAudio(audioFile);
      return;
    }

    try {

      const data = {
        text: transcript,
        selectedVoice: selectedVoice
      }
      const response = await generateAudio(data);

      console.log(response.data.audioFile);

      setAudioFile(response.data.audioFile);

      await playAudio(response.data.audioFile);

    } catch (error: any) {

      console.error("Request Error:", error.response?.data || error.message);

    }
  }

  const handelDownload = async () => {

    const response = await download(audioFile);

    if (!response.success) {
      toast.error(response.message, {
        // Set to 15sec
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    toast.success(response.message, {
      autoClose: 3000,
      theme: "colored",
    });

  };

  const playAudio = async (audioFile: string) => {
    const audio = new Audio(audioFile);
    await audio.play();
    setSpeak(false);
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

        <VoiceSelection
          selectedVoice={selectedVoice}
          onVoiceChange={setSelectedVoice}
          playAudio={playAudio}
          selectedVoiceData={selectedVoiceData}
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
          handelDownload={handelDownload}
        />

        <InstructionsCard />
      </div>
    </div>
  )
}
