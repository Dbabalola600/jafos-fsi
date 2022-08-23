

import { NextResponse } from 'next/server'
import type { NextRequest, NextFetchEvent } from 'next/server'
//import { includes } from "lodash";
import JWT from "jsonwebtoken"


const isStudentRoute = (pathname: string) => {
    return pathname.startsWith("")
}

export function isAuth(request: NextRequest, event: NextFetchEvent,) {
    const { pathname } = request.nextUrl;

    const token = request.headers.get("Authorization") || ""
    const JWT_SECRET ="ro8BS6Hiivgzy8Xuu09JDjlNLnSLldY5"
    const tokenObj = JWT.verify(token, JWT_SECRET)

    if(tokenObj){

        
    }
   
    window.localStorage.getItem("token");

    if (isStudentRoute(pathname) && (["token"])   )




    return NextResponse.next();
}


export const config = {
    matcher: ['/api/student/:path*', '/api/Caterer/:path*']
};


