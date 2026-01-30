const BASE_URL = "http://localhost:3000";

//& Creating an API Custom Client for all CRUD Operations
export const request = async (endpoint, options = {}) => {
    
    //? http://localhost:3000 + Endpoint
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        ...options //& spreading options from params
    })
    if (!response.ok)
        //? status = number
        throw new Error(`API Error: ${response.status}`)
    if (response.status === 204) return null;

    return response.json(); //& Parsing and return immediately

};