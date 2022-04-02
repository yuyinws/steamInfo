import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import NProgress from 'nprogress'

const instance = axios.create()

instance.interceptors.request.use((config) => {
  NProgress.start()
  return config
})

instance.interceptors.response.use((response) => {
  NProgress.done()
  return response
})

export const request = async(config: AxiosRequestConfig): Promise<any> => {
  try {
    const { data } = await instance.request<any>(config)
    return data
  }
  catch (error) {
    // console.log(error)
    throw new Error(error as string)
  }
}
