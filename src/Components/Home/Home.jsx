import Header from "../Header/Header";
import VacancyList from "../VacancyList/VacancyList";

const Home = ({vacancies}) => {
  return <>
<div className="container-fluid">
  <div className="container ">
 <div className="row gap-3 p-3 min-h-screen">
 <VacancyList vacancies={vacancies}/>
 </div>
  </div>
</div>
  </>;
};
export default Home;
