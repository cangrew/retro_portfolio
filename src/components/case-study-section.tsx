interface CaseStudySectionProps {
  problem?: string
  approach?: string
  results?: string
}

export default function CaseStudySection({ problem, approach, results }: CaseStudySectionProps) {
  if (!problem && !approach && !results) return null

  return (
    <div className="max-w-2xl mx-auto grid gap-4 sm:grid-cols-3 my-6">
      {problem && (
        <div className="border border-zinc-800 rounded-lg p-4 space-y-1">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Problem</h4>
          <p className="text-sm text-zinc-300 leading-relaxed">{problem}</p>
        </div>
      )}
      {approach && (
        <div className="border border-zinc-800 rounded-lg p-4 space-y-1">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Approach</h4>
          <p className="text-sm text-zinc-300 leading-relaxed">{approach}</p>
        </div>
      )}
      {results && (
        <div className="border border-zinc-800 rounded-lg p-4 space-y-1">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Results</h4>
          <p className="text-sm text-zinc-300 leading-relaxed">{results}</p>
        </div>
      )}
    </div>
  )
}
