import axios from "axios";

export const getTableList = params => {
    return axios.get("/api/findAll", { params: params})
}

export const edit = data => {
    return axios.post("/api/edit", data);
}