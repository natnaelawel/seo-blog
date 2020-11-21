import axios from 'axios'

const url = process.env.NEXT_PUBLIC_BACKEND_URI
export default axios.create({baseURL: url})

