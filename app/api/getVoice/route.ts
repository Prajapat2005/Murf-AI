import { connectDB } from "@/app/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server";
import testVoice from "@/app/models/testVoice"


export const POST = async (request: NextRequest) => {

    try {

        await connectDB();

        const reqBody = await request.json();
        const { id } = reqBody;

        console.log(id);

        const { url } = await testVoice.findOne({ id: id }, '-id');

        if (!url) {
            return NextResponse.json(
                { error: "No URL" },
                { status: 401 }
            )
        }

        return NextResponse.json({
            data: url,
            success: true
        });

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}