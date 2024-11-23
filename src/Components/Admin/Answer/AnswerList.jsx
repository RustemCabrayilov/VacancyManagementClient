import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AnswerList = () => {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wantEdit, setWantEdit] = useState(false);
  const [wantDelete, setWantDelete] = useState(false);
  const [editAnswerId, setEditAnswerId] = useState("");
  const [deleteAnswerId, setDeleteAnswerId] = useState("");
  const fetchAnswers = async () => {
    try {
      const response = await axios.get("https://localhost:44391/api/Answers");
      console.log(response);
      console.log(response.data[""]);
      setAnswers(response.data[""] || []); 
    } catch (err) {
      setError(err.message); 
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchAnswers(); 
  }, []);
  const navigate=useNavigate()
const handleAdd=()=>{
  navigate('/adminpanel/answers/add')
}
const handleEdit=(id)=>{
  setWantEdit(true)
  setEditAnswerId(id);
  }
  const handleDelete=(id)=>{
    setWantDelete(true)
    setDeleteAnswerId(id);
    }
  return (
    <>
     <div className="container-fluid">
      <div className="container">
      <button className="d-flex justify-content-end mb-3 px-5 w-2 bg-cyan-300"
        onClick={handleAdd}>Add</button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Correct</th>
            </tr>
          </thead>
          <tbody>
            {answers.map((answer) => (
              <tr key={answer.id}>
                <td>{answer.name}</td>
                <td>{answer.isCorrect}</td>
                <td>
                  <button
                    onClick={() => handleEdit(answer.id)}
                    className="bg-red-500 text-white rounded-lg w-full py-2"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(answer.id)}
                    className="bg-black text-white rounded-lg w-full py-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* {wantEdit && (
          <EditVacancy
            editVacancyId={editVacancyId}
            onCancelEdit={handleCancel}
            onSaveEdit={handleSave}
            selectedVacancy={vacancies.find((p) => p.id === editVacancyId)}
          />
        )}
        {wantDelete && (
          <DeleteVacancy
            deleteVacancyId={deleteVacancyId}
            onCancelEdit={handleCancel}
            onSaveEdit={handleSave}
          />
        )} */}
      </div>
    </div>
    </>
  );
};

export default AnswerList;
