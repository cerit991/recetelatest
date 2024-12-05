import fs from 'fs'
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next'

// Increase the body size limit
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Set desired limit here
    },
  },
}

export default function handler(req, res) {
  if (req.method === 'PUT') {
    const { name, chef, prepTime, cookTime, servings, difficulty, temperature, category, ingredients, image } = req.body
    const dataDir = path.join(process.cwd(), 'public/data')
    const uploadsDir = path.join(dataDir, 'uploads')
    const filePath = path.join(dataDir, `${name}.json`)

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true })
    }

    let imagePath = ''
    if (image) {
      const base64Data = image.replace(/^data:image\/\w+;base64,/, '')
      const imageBuffer = Buffer.from(base64Data, 'base64')
      imagePath = path.join(uploadsDir, `${name}.png`)
      fs.writeFileSync(imagePath, imageBuffer)
    }

    if (fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify({ name, chef, prepTime, cookTime, servings, difficulty, temperature, category, ingredients, image: imagePath }, null, 2))
      res.status(200).json({ message: 'Recete güncellendi' })
    } else {
      res.status(404).json({ message: 'Recete bulunamadı' })
    }
  } else {
    res.status(405).json({ message: 'Yalnızca PUT istekleri desteklenir' })
  }
}