import axios from 'axios';

const API_KEY = '27630565-ae829fe43486fa4669a79051b';
const BASE_URL = 'https://pixabay.com/api/';

export default class SearchApiService {
  async fetchItems(page, searchQuery) {
    const option = new URLSearchParams({
      key: API_KEY,
      q: `${searchQuery}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: '12',
      page: `${page}`,
    });

    return await axios.get(`${BASE_URL}?${option}`);
  }
}
