import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

/* export async function POST(request: NextRequest) {
  try {
    const { text, from, to } = await request.json()

    // Mock translation - in reality, you'd call a translation service
    const translatedText = `[${from}→${to}] ${text}`

    return NextResponse.json({
      translatedText,
      originalText: text,
      fromLanguage: from,
      toLanguage: to,
    })
  } catch (error) {
    console.error("Translation error:", error)
    return NextResponse.json({ error: "Translation failed" }, { status: 500 })
  }
} */

/*  

let config = {
method: 'post',
url: 'https://api.murf.ai/v1/speech/generate',
,
data : data
};

axios(config)
.then((response) => {
console.log(JSON.stringify(response.data));
})
.catch((error) => {
console.log(error);
}); */
