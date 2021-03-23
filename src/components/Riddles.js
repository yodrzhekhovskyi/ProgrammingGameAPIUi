import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

export function RiddlesList() {
  const [riddles, setRiddles] = useState([]);
  // const [isLoading, setIsLoading] = useState();
  const history = useHistory();
  const populateWeatherData = async () => {
    const response = await fetch("https://localhost:5001/api/riddles");
    const data = await response.json();
    setRiddles(data);
  };

  useEffect(() => {
    populateWeatherData();
  }, [])

  const handleSolveClick = (id) => history.push('/riddles/' + id);

  return (
    <table className="table table-striped" aria-labelledby="tabelLabel">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {riddles.map((riddle) => (
          <tr key={riddle.id}>
            <td>{riddle.name}</td>
            <td>{riddle.description}</td>
            <td> 
                <Button size={'sm'} onClick={() => handleSolveClick(riddle.id)}>
                    Solve!
                </Button> 
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
