import type { Language, Voice } from "@/types"

export const languages: Language[] = [
  { code: "en-US", name: "English", flag: "🇺🇸" },
  { code: "es-MX", name: "Spanish", flag: "🇪🇸" },
  { code: "fr-FR", name: "French", flag: "🇫🇷" },
  { code: "de-DE", name: "German", flag: "🇩🇪" },
  { code: "it-IT", name: "Italian", flag: "🇮🇹" },
  { code: "pt-BR", name: "Portuguese", flag: "🇵🇹" },
  { code: "ja-JP", name: "Japanese", flag: "🇯🇵" },
  { code: "ko-KR", name: "Korean", flag: "🇰🇷" },
  { code: "zh-CN", name: "Chinese", flag: "🇨🇳" },
  { code: "hi-IN", name: "Hindi", flag: "🇮🇳" },
]

export const voices: Voice[] = [
  { id: "en-US-natalie", name: "Natalie", gender: "female", accent: "American" },
  { id: "en-US-ken", name: "Ken", gender: "male", accent: "American" },


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
