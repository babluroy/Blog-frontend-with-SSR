import axios, {AxiosResponse} from "axios";
import { api_constants } from "../utils/api_constants";

const API_CONSTANTS = api_constants;
const BLOG_URL = process.env.NEXT_PUBLIC_BLOG_API_URL;

if (typeof window !== 'undefined') {
    var token = JSON.parse(localStorage.getItem('jwt')).token;
}

const blogApi = axios.create({
    baseURL: BLOG_URL,
    timeout: 20000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
    },
});

const blogApiCreateBlog = axios.create({
    baseURL: BLOG_URL,
    timeout: 20000,
    headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: token,
    },
});

blogApi.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if(error.response?.status === 401) {
            localStorage.clear();
            window.location.href = "/login"
        }
        return Promise.reject(error);
    }
);

class ApiService {
    
    Signup(credentials){
        return blogApi.post(API_CONSTANTS.SIGNUP, credentials)
    }

    Login(credentials){
        return blogApi.post(API_CONSTANTS.LOGIN, credentials)
    }

    GET_HIGHLIGHTED_BLOGS(){
        return blogApi.get(API_CONSTANTS.HIGHLIGHTED_BLOGS)
    }

    GET_FEATURED_BLOGS(){
        return blogApi.get(API_CONSTANTS.FEATURED_BLOGS)
    }

    GET_ALL_BLOGS(limit,pageNumber){
        return blogApi.get(API_CONSTANTS.ALL_BLOGS + `?limit=${limit}` + `&pageNumber=${pageNumber}`)
    }

    GET_BLOG(id){
        return blogApi.get(API_CONSTANTS.BLOG + id)
    }

    GET_ALL_CATEGORIES(){
        return blogApi.get(API_CONSTANTS.CATEGORIES)
    }

    CREATE_BLOG(id, blog){
        return blogApiCreateBlog.post(API_CONSTANTS.CREATE_BLOG + `/${id}`, blog)
    }

}

export default ApiService;