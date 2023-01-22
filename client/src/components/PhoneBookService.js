import axios from "axios";

const url = '/api/persons'

const getAll = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const create = newContact => {
    const request = axios.post(url, newContact)
    return request.then(response => response.data)
}

const update = (id, newContact) => {
    const request = axios.put(`${url}/${id}`, newContact)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${url}/${id}`)
    return request.then(response => response.data)
}

export default { getAll, create, update, remove }