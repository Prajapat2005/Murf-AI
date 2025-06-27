import axios from "axios";

interface AUDIO {
    text: string,
    selectedVoice: string,
}

export const generateAudio = async ({ text, selectedVoice }: AUDIO) => {
    const data = JSON.stringify({
        text: text,
        voiceId: selectedVoice,
    })

    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        "api-key": process.env.NEXT_PUBLIC_MAPBOX_API_KEY,
    }

    return await axios.post("https://api.murf.ai/v1/speech/generate", data, { headers });
}