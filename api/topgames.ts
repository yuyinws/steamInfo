import type { VercelRequest, VercelResponse } from '@vercel/node'
import cheerio from 'cheerio'
import request from './utils/request'
export default async(req: VercelRequest, res: VercelResponse) => {
  try {
    const data = await request({
      url: 'https://store.steampowered.com/stats/',
    })
    const $ = cheerio.load(data)
    const games: any[] = []
    $('#detailStats .player_count_row').each((i, el) => {
      games.push({
        current: $(el).find('.currentServers').first().text(),
        peak: $(el).find('.currentServers').last().text(),
        name: $(el).find('.gameLink').text(),
      })
    })
    const response = {
      data: games,
    }
    res.status(200).json(response)
  }
  catch (error) {
    // console.log(error)
    throw new Error(error as string)
  }
}
