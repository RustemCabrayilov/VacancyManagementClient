import Header from "../Header/Header";
import VacancyList from "../VacancyList/VacancyList";

const Home = ({vacancies}) => {
  return <>
  <Header/>
  <VacancyList vacancies={vacancies}></VacancyList>
  </>;
};
export default Home;
