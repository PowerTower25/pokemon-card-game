import axios from "axios"

export const apiClient = axios.create({
  baseURL: "https://api.tcgdex.net/v2/en",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
})