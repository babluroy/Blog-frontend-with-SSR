import ApiService from '../api/index';

const api = new ApiService();

export const getHighlightedBlogs = async () => {
    const highlightedBlogs = await api.GET_HIGHLIGHTED_BLOGS().then((res) => {
        return res.data;
      }).catch((err) => {
        return err;
      })
    return highlightedBlogs;
}

export const getFeaturedBlogs = async () => {
  const featuredBlogs = await api.GET_FEATURED_BLOGS().then((res) => {
    return res.data;
  }).catch((err) => {
    return err;
  })
  return featuredBlogs;
}

export const getAllBlogs = async (limit, pageNumber) => {
  const allBlogs = await api.GET_ALL_BLOGS(limit, pageNumber).then((res) => {
    return res.data;
  }).catch((err) => {
    return err;
  })
  return allBlogs;
}

export const getBlogById = async (id) => {
  const blog = await api.GET_BLOG(id).then((res) => {
    return res.data;
  }).catch((err) => {
    return err;
  })
  return blog;
}

export const getCategories = async () => {
  const categories = await api.GET_ALL_CATEGORIES().then((res) => {
          return res.data;
       }).catch((err) => {
          return err;
   })
   return categories;
}

export const getBlogsByCategories = async (id, limit, pageNumber) => {
  const blogs = await api.GET_BLOGS_BY_CATEGORIES(id, limit, pageNumber).then((res) => {
    return res.data;
  }).catch((err) => {
    return err;
  })
  return blogs;
}
