import { NextResponse } from "next/server";

export default function middleware(req){
    let verify = req.cookies.get("loggedin");
    let url = req.url;

    const isOnPublicRoutes = () => {
        if(url === "http://localhost:3000/public/login" || url === "http://localhost:3000/public/signup") {
            return true;
        } else {
            return false;
        }
    }
    
    if(!verify && url.includes("/app")){
        return NextResponse.redirect("http://localhost:3000/public/login")
    }

    if(verify && isOnPublicRoutes()){
        return NextResponse.redirect("http://localhost:3000/app/home")
    }

    if(url === "http://localhost:3000/"){
        return NextResponse.redirect("http://localhost:3000/app/home")
    }
}