import fs from 'fs'
import path from 'path'
import { Publication } from './types'

const PUBLICATIONS_FILE = path.join(process.cwd(), 'content/research/publications.json')

export function getAllPublications(): Publication[] {
  if (!fs.existsSync(PUBLICATIONS_FILE)) return []
  const raw = fs.readFileSync(PUBLICATIONS_FILE, 'utf-8')
  const data = JSON.parse(raw) as Publication[]
  return data.sort((a, b) => b.year - a.year)
}
