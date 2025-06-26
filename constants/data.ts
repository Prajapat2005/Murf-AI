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

  { id: "es-ES-elvira", name: "Elvira", gender: "female", accent: "Spanish" },
  { id: "es-ES-javier", name: "Javier", gender: "male", accent: "Spanish" },

  { id: "en-US-carter", name: "Carter", gender: "male", accent: "French" },
  { id: "fr-FR-justine", name: "Justine", gender: "female", accent: "French" },

  { id: "en-UK-ruby", name: "Ruby", gender: "female", accent: "German" },
  { id: "de-DE-matthias", name: "Matthias", gender: "male", accent: "German" },

  { id: "it-IT-lorenzo", name: "Lorenzo", gender: "male", accent: "Italian" },
  { id: "it-IT-greta", name: "Greta", gender: "female", accent: "Italian" },

  { id: "pt-BR-heitor", name: "Heitor", gender: "male", accent: "Portuguese" },
  { id: "pt-BR-eloa", name: "Eloa", gender: "female", accent: "Portuguese" },

  { id: "ja-JP-denki", name: "Denki", gender: "male", accent: "Japanese" },
  { id: "ja-JP-kimi", name: "Kimi", gender: "female", accent: "Japanese" },

  { id: "ko-KR-gyeong", name: "Gyeong", gender: "female", accent: "Korean" },
  { id: "ko-KR-hwan", name: "Hwan", gender: "male", accent: "Korean" },

  { id: "zh-CN-tao", name: "Tao", gender: "male", accent: "Chinese" },
  { id: "zh-CN-jiao", name: "Jiao", gender: "female", accent: "Chinese" },

  { id: "hi-IN-amit", name: "Amit", gender: "male", accent: "Indian" },
  { id: "hi-IN-ayushi", name: "Ayushi", gender: "female", accent: "Indian" },
]

