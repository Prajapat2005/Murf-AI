import { connectDB } from "@/app/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server";
import testVoice from "@/app/models/testVoice"

export const POST = async (request: NextRequest) => {

    try {

        await connectDB();

        const reqBody = await request.json();
        const { id, url } = reqBody;

        const data = new testVoice({
            id,
            url,
        })

        const savedData = data.save();

        return NextResponse.json({
            message: "User Saved",
            success: true,
            savedData,
        })

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}