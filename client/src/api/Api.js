import axios from "axios";

// main fetch function
export const fetchData = async (commands, query, data) => {

    const command = commands.split(/(?=[A-Z])/)

    let urlString = command[1]?.toLowerCase() // table name

    if (query) // paramater for query
        urlString += (String(query).length > 5) ? `?${query}` : `/${query}`

    // create fetch url
    const url = `http://localhost:3001/api/${urlString}`

    // convert form data(for image files)
    if (commands == "putActor" || commands == "putMovie" || commands == "postActor" || commands == "postMovie") {
        const formData = new FormData()
        for (const key in data) {
                if(key === "categories" || key === "actors") {
                    for (const value of data[key]) {
                        formData.append(`${key}[]`, JSON.stringify(value))
                    }
                }
                else
                    formData.append(key, data[key])
        }
        data = formData
    }

    // authorization add to headers
    const token = localStorage.getItem("authToken")
    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${localStorage.getItem("authToken")}` : '';
    
    // fetch and return datas
    switch (command[0]) {
        case "get":
            return axios.get(url).then(response => response.data)
        case "delete":
            return axios.delete(url)
        case "put":
            return axios.put(url, data)
        case "post":
            return axios.post(url, data)
    }    
}

// login function
export const login = async (data) => {
    return axios.post("http://localhost:3001/api/admin/login", data).then(response => response.data)  
}