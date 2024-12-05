import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  if (req.method === 'PUT') {
    const { name, chef, prepTime, cookTime, servings, difficulty, temperature, category, ingredients, image } = req.body
    const dataDir = path.join(process.cwd(), 'public/data')
    const filePath = path.join(dataDir, `${name}.json`)

    if (fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify({ name, chef, prepTime, cookTime, servings, difficulty, temperature, category, ingredients, image }, null, 2))
      res.status(200).json({ message: 'Recete güncellendi' })
    } else {
      res.status(404).json({ message: 'Recete bulunamadı' })
    }
  } else {
    res.status(405).json({ message: 'Yalnızca PUT istekleri desteklenir' })
  }
}