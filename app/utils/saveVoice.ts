import axios from "axios"

export const saveVoice = async (id: string, url: string) => {

    try {
        const data = {
            id,
            url,
        }
        await axios.post(`${process.env.HOST}/api/postVoice`, data);

        return {
            message: "Saved",
            success: true
        }

    } catch (error: any) {
        return {
            message: error.message,
            success: false,
        }
    }
}