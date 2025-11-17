type BaseMeta = {
  slug: string
  title: string
  date?: string
  summary?: string
  tags?: string[]
  cover?: string
  order?: number
}

export type PostMeta = BaseMeta
export type ProjectMeta = BaseMeta & { tech?: string[]; link?: string; status?: string }
export type Doc = BaseMeta & { raw?: string; html?: string }

// Build-time transformed Markdown modules export: { attributes, content, html }
const allMd = import.meta.glob('/content/**/**/*.md', { eager: true }) as Record<string, any>

function pickByLocaleAndType(locale: string, type: 'blog' | 'projects' | 'about') {
  return Object.entries(allMd).filter(([path]) => path.includes(`/content/${locale}/${type}/`))
}

export async function loadList<T extends BaseMeta>(locale: string, type: 'blog' | 'projects'): Promise<T[]> {
  const entries = pickByLocaleAndType(locale, type)
  const list: T[] = []
  for (const [path, mod] of entries) {
    const data = mod.attributes || {}
    const slug = path.split('/').pop()!.replace('.md', '')
    list.push({
      slug,
      title: data.title,
      date: data.date,
      summary: data.summary,
      tags: data.tags || [],
      cover: data.cover,
      order: typeof data.order === 'number' ? data.order : undefined,
    } as T)
  }
  const hasOrder = list.some(it => typeof it.order === 'number')
  if (hasOrder) {
    return list.sort((a, b) => {
      const ao = a.order ?? Number.MAX_SAFE_INTEGER
      const bo = b.order ?? Number.MAX_SAFE_INTEGER
      return ao - bo
    })
  }
  return list.sort((a, b) => (+new Date(b.date || 0)) - (+new Date(a.date || 0)))
}

export async function loadBySlug(locale: string, type: 'blog' | 'projects' | 'about', slug?: string): Promise<Doc | null> {
  const entries = pickByLocaleAndType(locale, type)
  const found = slug ? entries.find(([p]) => p.endsWith(`${slug}.md`)) : entries[0]
  if (!found) return null
  const [path, mod] = found
  const data = mod.attributes || {}
  return {
    slug: slug || path.split('/').pop()!.replace('.md', ''),
    title: data.title,
    date: data.date,
    summary: data.summary,
    tags: data.tags || [],
    cover: data.cover,
    raw: mod.content,
    html: mod.html,
  }
}