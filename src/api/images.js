import axios from 'axios';

axios.defaults.baseURL =
  'https://pixabay.com/api/?key=37184762-fd326293791c817732540ec51&orientation=horizontal&image_type=photo';
//

export const getImagesApi = async (q, page, per_page) => {
  const { data } = await axios.get(`&q=${q}&page=${page}&per_page=${per_page}`);
  return data;
};
