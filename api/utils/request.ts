import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import * as tunnel from 'tunnel'

const agent = tunnel.httpsOverHttp({
  proxy: {
    host: process.env.PROXY_HOST as string,
    port: Number(process.env.PROXY_PORT),
  },
})
const instance = axios.create({
  httpsAgent: process.env.MODE === 'development' ? agent : false,
})

const request = async(config: AxiosRequestConfig): Promise<any> => {
  try {
    const { data } = await instance.request<any>(config)
    return data
  }
  catch (error) {
    // console.log(error)
    throw new Error(error as string)
  }
}

export default request
