import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home/Home';
import { useState, useEffect } from 'react';
function App() {
  // State for storing vacancies, loading, and error status
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch vacancies on component mount
  useEffect(() => {
    fetchVacancies();
  }, []);

  const fetchVacancies = async () => {
    try {
      const response = await axios.get('https://api.example.com/vacancies');
      setVacancies(response.data);  // Update state with fetched vacancies
    } catch (err) {
      setError(err.message);  // Update state with any error message
    } finally {
      setLoading(false);  // Set loading to false once fetch is complete
    }
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <Home vacancies={vacancies} />  // Pass vacancies to Home component
      )}
    </>
  );
}

export default App;
