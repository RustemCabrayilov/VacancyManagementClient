import  Card  from 'react-bootstrap/Card';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
const Vacancy = ({Id,Title,Description,StartDate,EndDate}) => {
  console.log(Title);
  console.log(Description);
  const formatDate = (date) => {
    if (!date) return 'Not specified';
    return format(new Date(date), 'MMMM dd, yyyy'); 
  };
  return (
    <Card style={{ width: '18rem', height:'300px' }}>
    <Card.Body>
      <Card.Title>{Title}</Card.Title>
      <Card.Text>
       {Description}
      </Card.Text>
      <Card.Text>
       {formatDate(StartDate)}
      </Card.Text>
      <Card.Text>
       {formatDate(EndDate)}
      </Card.Text>      
      <Link to={`/interview/${Id}`} style={{ textDecoration: 'none' }}>
  <button className='p-2 rounded bg-cyan-400 text-white'>Apply</button>
</Link>
    </Card.Body>
  </Card>
  );
};
export default Vacancy