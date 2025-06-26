
export const download = async (audioFile: string) => {

    const url = audioFile;

    if (!url) {
        return {
            success: false,
            message: "No Audio File Please click on Play",
        };
    }

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch audio file");
        }

        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = "murf-voice.wav";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);

        return {
            success: true,
            message: 'Downloading...'
        };

    } catch (error: any) {
        console.error("Downloading failed:", error.message);

        return {
            success: false,
            message: "Downloading failed",
        };

    }
};