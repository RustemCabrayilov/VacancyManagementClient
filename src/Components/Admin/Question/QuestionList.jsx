import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import EditModal from "./Edit/EditModal";
import { useNavigate } from "react-router-dom";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wantEdit,setWantEdit]=useState(false);
  const [wantDelete,setWantDelete]=useState(false);
  const fetchQuestions = async () => {
    try {
      const response = await axios.get("https://localhost:44391/api/Question/get-all-questions");
      console.log(response);
      console.log(response.data["getAllQuestionDtos"]);
      setQuestions(response.data["getAllQuestionDtos"] || []); 
    } catch (err) {
      setError(err.message); 
    } finally {
      setLoading(false); 
    }
  };
  const DeleteQuestion=()=>{
    setWantDelete(true);
  
  }
  const EditQuestion=()=>{
  setWantEdit(true);
  }
  useEffect(() => {
    fetchQuestions(); 
  }, []);
  const navigate=useNavigate()
  const  handleAdd=()=>{
    navigate('/adminpanel/questions/add')
    }
  return (
    <>
      <div className="container-fluid">
        <div className="container min-h-screen">
        <button className="d-flex justify-content-end mb-3 px-5 w-2 bg-cyan-300"
        onClick={handleAdd}>Add</button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Description</th>
                <th>Vacancy Id</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question, index) => (
                <tr key={index}>
                  <td>{question.id}</td>
                  <td>{question.description}</td>
                  <td>{question.vacancyId}</td>
                  <th className="border-r border-r-black">Edit</th>
      <th className="border-r border-r-black">Delete</th>
      <td className="border-r border-r-black px-2">
        <button
          onClick={()=>EditQuestion(question.id)}
          className="bg-red-500 text-white rounded-lg w-full py-2"
        >
          Edit
        </button>
      </td>
      <td className="border-r border-r-black px-2">
        <button
          onClick={() => DeleteQuestion(question.id)}
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
        <EditModal
          editProductId={editProductId}
          setWantEdit={setWantEdit}
          selectedProduct={products.find((p) => p.id === editProductId)}
        />
      )} */}
        </div>
      </div>
    </>
  );
};

export default QuestionList;
