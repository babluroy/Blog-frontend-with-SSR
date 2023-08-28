import { NextResponse } from "next/server";

export default function middleware(req){
    let isLoggedIn = req.cookies.get("loggedin");
    let role = req.cookies.get("role");
    let url = req.url;
    const next_url = req.nextUrl.clone()
    const local_url = "http://localhost:3000/"
    const production_url = "https://blog-frontend-with-ssr.vercel.app/"

    const isOnPublicRoutes = () => {
        if(url.includes("/login") || url.includes("/signup")) return true;
        return false;
    }
    
    if(!isLoggedIn && (url.includes("/app") || url.includes("/admin"))){
        next_url.pathname = "/public/login"
        return NextResponse.redirect(next_url)
    }

    if(isLoggedIn && isOnPublicRoutes()){
        next_url.pathname = "/app/home"
        return NextResponse.redirect(next_url)
    }

    if(url == production_url || url == local_url){
        next_url.pathname = "/app/home"
        return NextResponse.redirect(next_url)
    }

    if(role == 0 && url.includes("/admin")){
        next_url.pathname = "/app/home"
        return NextResponse.redirect(next_url)
    }
}