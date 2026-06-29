function StatsCard({ title, value }) {
  return (
    <div className="card shadow p-3 text-center">
      <h6>{title}</h6>
      <h4>{value}</h4>
    </div>
  );
}

export default StatsCard;