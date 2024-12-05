import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, chef, prepTime, cookTime, servings, difficulty, temperature, category, ingredients } = req.body
    const dataDir = path.join(process.cwd(), 'public/data')
    const filePath = path.join(dataDir, `${name}.json`)

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    fs.writeFileSync(filePath, JSON.stringify({ name, chef, prepTime, cookTime, servings, difficulty, temperature, category, ingredients }, null, 2))
    res.status(201).json({ message: 'Recete oluşturuldu' })
  } else {
    res.status(405).json({ message: 'Yalnızca POST istekleri desteklenir' })
  }
}
