import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/reviews/product';

const reviewService = {
    getAllReviews: async () =>{
        const res = await axios.get(API_BASE);
        return res.data;
    },
    getReviewById: async(id) =>{
        const res = await axios.get(`${API_BASE}/${id}`);
        return res.data;
    },
    addReview: async (review) => {
    const res = await axios.post(API_BASE, review);
    return res.data;
  },

  updateReview: async (id, review) => {
    const res = await axios.put(`${API_BASE}/${id}`, review);
    return res.data;
  },

  deleteReview: async (id) => {
    const res = await axios.delete(`${API_BASE}/${id}`);
    return res.data;
  }

};
export default reviewService;