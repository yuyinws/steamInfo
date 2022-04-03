import type { VercelRequest, VercelResponse } from '@vercel/node'
import request from './utils/request'

export default async(req: VercelRequest, res: VercelResponse) => {
  try {
    const url: any = req.query.url
    const raw = await request({
      method: 'GET',
      url,
      responseType: 'arraybuffer',
    })
    const _base64 = Buffer.from(raw).toString('base64')
    const response = {
      _base64: `data:image/jpeg;base64,${_base64}`,
    }
    res.status(200).json(response)
  }
  catch (error) {
    // console.log(error)
    throw new Error(error as string)
  }
}
