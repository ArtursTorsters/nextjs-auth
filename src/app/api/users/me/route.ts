import { getTokenData } from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/userModel'
import { connect } from "@/dbConfig/dbConfig"

connect()

export async function GET(request: NextRequest) {
    try {
        // Extract and verify JWT token from the request
        const userToken = await getTokenData(request)
        console.log('usertoken',userToken )
        // Query the database to find the user based on the token
        const user = await User.findOne({_id: userToken}).select('-password')
        console.log('user',user )

        // Return JSON response with user data if found
        return NextResponse.json({
            message: 'Found user',
            data: user
        })
    } catch (error: any) {
        console.error('Error processing request:', error)
        return NextResponse.error()
}
}