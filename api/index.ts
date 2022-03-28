import type { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'
export default async(req: VercelRequest, res: VercelResponse) => {
  axios.get('https://store.steampowered.com/feeds/weeklytopsellers.xml').then((response) => {
    console.log(response)
    const data = {
      msg: 'hello world!',
      data: response.data,
    }
    res.status(200).json(data)
  })
}
