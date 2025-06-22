import type { Language, Voice } from "@/types"

export const languages: Language[] = [
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

export const voices: Voice[] = [
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
