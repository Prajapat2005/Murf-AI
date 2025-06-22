export interface Language {
  code: string
  name: string
  flag: string
}

export interface Voice {
  id: string
  name: string
  gender: string
  accent: string
}

export interface VoiceTranslatorState {
  isRecording: boolean
  isTranslating: boolean
  originalText: string
  translatedText: string
  fromLanguage: string
  toLanguage: string
  isPlaying: boolean
  selectedVoice: string
}
