import { useState, useEffect } from 'react';

export function LadderList() {
  const [stats, setStats] = useState([]);

  const fetchStatsData = async () => {
    const response = await fetch("https://localhost:5001/api/stats/ladder");
    const data = await response.json();
    setStats(data);
  };

  useEffect(() => {
    fetchStatsData();
  }, [])

  return (
    <table className="table table-striped" aria-labelledby="tabelLabel">
      <thead>
        <tr>
          <th>Username</th>
          <th>Riddles solved</th>
          <th>Total attempts</th>
          <th>Total correct code compilations (Riddles + playground)</th>
        </tr>
      </thead>
      <tbody>
        {stats.map((stat) => (
          <tr key={stat.userId}>
            <td>{stat.userName}</td>
            <td>{stat.riddlesSolved}</td>
            <td>{stat.totalSnippetsForRiddlesSent}</td>
            <td>{stat.totalCorrectCompilations}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
