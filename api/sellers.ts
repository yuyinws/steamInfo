import type { VercelRequest, VercelResponse } from '@vercel/node'
import xml2js from 'xml2js'
import request from './utils/request'

export default async(req: VercelRequest, res: VercelResponse) => {
  try {
    const data = await request({
      url: 'https://store.steampowered.com/feeds/weeklytopsellers.xml',

    })
    const parseString = await xml2js.parseStringPromise(data)
    let sellers = parseString['rdf:RDF'].item
    let pubDate = parseString['rdf:RDF'].channel[0].pubDate[0]
    sellers = sellers.map((item: any) => {
      return {
        name: item.title[0],
        appId: item?.link[0].match(/\/app\/(\d+)/)?.[1] || null,
        subId: item?.link[0].match(/\/sub\/(\d+)/)?.[1] || null,
        content: item['content:encoded'][0].includes('jpg'),
      }
    })
    const response = {
      pubDate,
      data: sellers,
    }
    res.status(200).json(response)
  }
  catch (error) {
    // console.log(error)
    throw new Error(error as string)
  }
}
