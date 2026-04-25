interface Stat {
  value: string;
  label: string;
}

interface Props {
  stats?: Stat[];
}

const DEFAULT_STATS: Stat[] = [
  { value: '100k+', label: 'Aussie Creators' },
  { value: 'Daily', label: 'Updated' },
  { value: '100%', label: 'Australian' },
  { value: 'Free', label: 'To Browse' },
];

export default function StatsBar({ stats = DEFAULT_STATS }: Props) {
  return (
    <div className="stats-bar">
      {stats.map((s) => (
        <div key={s.label} className="stat-item">
          <span className="stat-value">{s.value}</span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
