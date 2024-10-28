import Vacancy from "../Vacancy/Vacancy";

const VacancyList = ({vacancies}) => {
  return <>
{vacancies.map((v)=>(<Vacancy
 Id={v.Id}
  Title={v.Title}
  Description={v.Description}
  StartDate={v.StartDate}
  EndDate={v.EndDate}
   />))}
  </>;
};
export default VacancyList;
