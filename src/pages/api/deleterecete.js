
import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  if (req.method === 'DELETE') {
    const { name } = req.body
    const dataDir = path.join(process.cwd(), 'public/data')
    const filePath = path.join(dataDir, `${name}.json`)

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      res.status(200).json({ message: 'Recete silindi' })
    } else {
      res.status(404).json({ message: 'Recete bulunamadı' })
    }
  } else {
    res.status(405).json({ message: 'Yalnızca DELETE istekleri desteklenir' })
  }
}