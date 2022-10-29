import ApiService from '../api/index';

export const getHighlightedBlogs = async () => {
    const api = new ApiService();
    const highlightedBlogs = await api.GET_HIGHLIGHTED_BLOGS().then((res) => {
        return res.data;
      }).catch((err) => {
        return err;
      })
    return highlightedBlogs;
}

export const getFeaturedBlogs = async () => {
  const api = new ApiService();
  const featuredBlogs = await api.GET_FEATURED_BLOGS().then((res) => {
    return res.data;
  }).catch((err) => {
    return err;
  })
  return featuredBlogs;
}

export const getAllBlogs = async (limit, pageNumber) => {
  const api = new ApiService();
  const allBlogs = await api.GET_ALL_BLOGS(limit, pageNumber).then((res) => {
    return res.data;
  }).catch((err) => {
    return err;
  })
  return allBlogs;
}

export const getBlogById = async (id) => {
  const api = new ApiService();
  const blog = await api.GET_BLOG(id).then((res) => {
    return res.data;
  }).catch((err) => {
    return err;
  })
  return blog;
}

export const getCategories = async () => {
  const api = new ApiService();
  const categories = await api.GET_ALL_CATEGORIES().then((res) => {
          return res.data;
       }).catch((err) => {
          return err;
   })
   return categories;
}

export const getBlogsByCategories = async (id, limit, pageNumber) => {
  const api = new ApiService();
  const blogs = await api.GET_BLOGS_BY_CATEGORIES(id, limit, pageNumber).then((res) => {
    return res.data;
  }).catch((err) => {
    return err;
  })
  return blogs;
}
