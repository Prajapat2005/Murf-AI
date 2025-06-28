import axios from "axios"

export const getVoice = async (id: string) => {

    try {

        const data = {
            id,
        }
        const response = await axios.post('/api/getVoice', data);

        console.log(response.data.data);

        if (!response) {
            return {
                message: "No url",
                success: false
            }
        }

        return {
            message: response.data.data,
            success: true
        }

    } catch (error: any) {
        return {
            message: error.message,
            success: false,
        }
    }
}