'use client'

interface TagFilterProps {
  allTags: string[]
  selectedTags: string[]
  onTagToggle: (tag: string) => void
}

export default function TagFilter({ allTags, selectedTags, onTagToggle }: TagFilterProps) {
  if (allTags.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-xs text-zinc-500 mr-1">Filter:</span>
      {allTags.map((tag) => {
        const active = selectedTags.includes(tag)
        return (
          <button
            key={tag}
            onClick={() => onTagToggle(tag)}
            className={`text-xs px-3 py-1 rounded-full border transition-colors ${
              active
                ? 'bg-zinc-200 text-zinc-900 border-zinc-200'
                : 'bg-transparent text-zinc-400 border-zinc-700 hover:border-zinc-500 hover:text-zinc-300'
            }`}
          >
            {tag}
          </button>
        )
      })}
      {selectedTags.length > 0 && (
        <button
          onClick={() => selectedTags.forEach(onTagToggle)}
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors ml-1"
        >
          Clear
        </button>
      )}
    </div>
  )
}
