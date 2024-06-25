import { NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'

export async function GET() {
  const jsonDirectory = path.join(process.cwd(), 'public')
  const fileContents = await fs.readFile(jsonDirectory + '/data/data.json', 'utf8')
  const data = JSON.parse(fileContents)

  return NextResponse.json(data)
}
