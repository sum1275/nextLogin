import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();
export async function POST(request: NextRequest, res: NextResponse) {
//  let test=await request.json();
//   console.log('test',test );
  try {
    const reqBody = await request.json();
    console.log("reqBody: ",reqBody)
    const { email, password } = reqBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User Does Not Exist" },
        { status: 400 }
      );
    }
    //check password now
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Wrong Password" }, { status: 400 });
    }
    //create toke data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    //create token
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {
      expiresIn: "1d", // Corrected from expireIn to expiresIn
    });
    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
    });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    console.error(error); // Log the error for server-side debugging
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
