import axios from 'axios';

// Define the base URL
const BASE_URL = process.env.REACT_APP_API_CONN_URI // Replace this with your actual base URL

// apiService function
const apiService = async ({ url, method = 'GET', body = null, headers = {} }) => {
    try {
        const response = await axios({
            method: method,
            url: `${BASE_URL}${url}`,
            data: body,
            headers: headers
        });

        return response.data;
    } catch (error) {
        // Handle error, you can add more error handling logic here
        console.error('API call failed:', error);
        return false;
    }
};

export default apiService;
