import axios from "axios";

interface TRANSLATE {
    text: string,
    toLanguage: string,
}

export const translate = async ({ text, toLanguage }: TRANSLATE) => {

    return await axios.post(
        "https://api.murf.ai/v1/text/translate",
        {
            targetLanguage: toLanguage,
            texts: [text],
        },
        {
            headers: {
                "api-key": process.env.NEXT_PUBLIC_MAPBOX_API_KEY,
                "Content-Type": "application/json",
            },
        },
    );

}