import type { VercelRequest, VercelResponse } from '@vercel/node'
import xml2js from 'xml2js'
import request from './utils/request'

export default async(req: VercelRequest, res: VercelResponse) => {
  try {
    const data = await request({
      url: 'https://store.steampowered.com/feeds/weeklytopsellers.xml',

    })
    const parseString = await xml2js.parseStringPromise(data)
    const response = {
      data: parseString['rdf:RDF'].item,
    }
    res.status(200).json(response)
  }
  catch (error) {
    // console.log(error)
    throw new Error(error as string)
  }
}
