import axios from 'axios';
import { API_BASE_URL } from '@env';

// main fetch function
export const fetchData = async (commands, query) => {

    const command = commands.split(/(?=[A-Z])/);

    let urlString = command[1]?.toLowerCase(); // table name

    if (query) // paramater for query
        urlString += (String(query).length > 5) ? `?${query}` : `/${query}`;

    // create fetch url
    const url = `${API_BASE_URL}/${urlString}`;

    // fetch and return datas 
    return axios.get(url).then(response => response.data);
}