import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import ResultModal from "./ResultModal/ResultModal";

export const UserList = () => {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wantEdit, setWantEdit] = useState(false);
  const [wantDelete, setWantDelete] = useState(false);
  const [editVacancyId, setEditVacancyId] = useState("");
  const [deleteVacancyId, setDeleteVacancyId] = useState("");

  const fetchVacancies = async () => {
    try {
      const response = await axios.get("https://localhost:44391/api/Users");
      setVacancies(response.data["getAllUsers"] || []);      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

  const handleEditVacancy = (id) => {
    setWantEdit(true);
    setEditVacancyId(id);
  };
    const handleDeleteVacancy = (id) => {
    setWantDelete(true);
    setDeleteVacancyId(id);
  };

  const handleCancel = () => {
    if(wantEdit){
      setWantEdit(false);
    }
    else if(wantDelete){
      setWantDelete(false);
    }
  };

  const handleSave= () => {
    if(wantEdit){
      setWantEdit(false);
    }
    else if(wantDelete){
      setWantDelete(false);
    }
    fetchVacancies(); // Refetch vacancies after edit
  };
  return (
    <div className="container-fluid">
      <div className="container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Email</th>
              <th>NameSurname</th>
              <th>UserName</th>
              <th>Results</th>
            </tr>
          </thead>
          <tbody>
            {vacancies.map((vacancy) => (
              <tr key={vacancy.id}>
                <td>{vacancy.id}</td>
                <td>{vacancy.email}</td>
                <td>{vacancy.nameSurname}</td>
                <td>{vacancy.userName}</td>
                <td className="d-flex justify-center items-center">
                  <button
                    onClick={() => handleEditVacancy(vacancy.id)}
                    className="bg-yellow-500 text-white rounded-lg w-full py-2"
                  >
                    Results
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {wantEdit && (
          <ResultModal
            editVacancyId={editVacancyId}
            onCancelEdit={handleCancel}
            onSaveEdit={handleSave}
            selectedVacancy={vacancies.find((p) => p.id === editVacancyId)}
          />
        )}
      </div>
    </div>
  );
};

export default UserList;