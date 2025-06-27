import axios from "axios"

export const getVoice = async (id: string) => {

    try {

        const data = {
            id,
        }
        const url = await axios.post("/api/getVoice", data);

        if (!url) {
            return {
                message: "No url",
                success: false
            }
        }

        return {
            message: url,
            success: true
        }

    } catch (error: any) {
        return {
            message: error.message,
            success: false,
        }
    }
}