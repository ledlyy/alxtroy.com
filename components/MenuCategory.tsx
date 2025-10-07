import Link from 'next/link'

type MenuItem = { name: string; description?: string; price?: number; tags?: string[] }
type MenuCategory = { title: string; items: MenuItem[] }

export function MenuCategory({ category }: { category: MenuCategory }) {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold" id={category.title.replace(/\s+/g, '-').toLowerCase()}>
        <Link
          href={`/catalog?cat=${encodeURIComponent(category.title)}`}
          className="focus:ring-ring rounded hover:underline focus:outline-none focus:ring-2"
        >
          {category.title}
        </Link>
      </h2>
      <ul className="space-y-4">
        {category.items.map((item) => (
          <li key={item.name} className="flex items-start justify-between gap-6">
            <div>
              <div className="font-medium">{item.name}</div>
              {item.description && <div className="opacity-80">{item.description}</div>}
              {item.tags && item.tags.length > 0 && (
                <div className="mt-1 text-xs opacity-70">{item.tags.join(', ')}</div>
              )}
            </div>
            {typeof item.price === 'number' && <div className="shrink-0">${item.price.toFixed(2)}</div>}
          </li>
        ))}
      </ul>
    </section>
  )
}
