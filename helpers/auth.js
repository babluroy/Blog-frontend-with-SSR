import Cookies from 'js-cookie'
import Router from 'next/router';

export const authenticate = (data) => {
    if(typeof window !== "undefined") {
        Cookies.set('loggedin', true);
        return localStorage.setItem("jwt", JSON.stringify(data));
    }
}

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt"));
    } else {
      return false;
    }
};


export const signout = () => {
    if(typeof window !== "undefined") {
       Cookies.remove('loggedin')
       Router.push("/")
       localStorage.removeItem("jwt");
       return;
    }
}