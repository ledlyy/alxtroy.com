type Feature = { title: string; description: string }

export function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <section className="container mx-auto px-4">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="rounded-lg border p-6">
            <h3 className="text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 opacity-80">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

