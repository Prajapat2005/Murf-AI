export interface Language {
  code: string
  name: string
  flag: string
}

export interface Voice {
  id: string
  name: string
  gender: "male" | "female"
  accent: string
}

