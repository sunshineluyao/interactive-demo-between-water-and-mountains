type Status = 'observed' | 'derived' | 'interpretive' | 'missing'

const labels: Record<Status, string> = {
  observed: 'Observed source',
  derived: 'Derived view',
  interpretive: 'Interpretive lens',
  missing: 'Evidence missing',
}

export function StatusTag({ status, children }: { status: Status; children?: React.ReactNode }) {
  return (
    <span className={`status-tag status-${status}`}>
      <i aria-hidden="true" />
      {children ?? labels[status]}
    </span>
  )
}
