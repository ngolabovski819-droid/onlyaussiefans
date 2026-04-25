export default function CreatorGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="creator-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="creator-card creator-card--skeleton">
          <div className="creator-card-img-wrap skeleton-shimmer" />
          <div className="creator-card-body">
            <div className="skeleton-line skeleton-line--name" />
            <div className="skeleton-line skeleton-line--username" />
            <div className="skeleton-line skeleton-line--price" />
            <div className="skeleton-line skeleton-line--btn" />
          </div>
        </div>
      ))}
    </div>
  );
}
