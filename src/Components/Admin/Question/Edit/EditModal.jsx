import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import EditCss from "./Edit.module.css";
import axios from "axios";

const EditModal = ({ editProductId, setWantEdit, selectedProduct }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [vacancies, setVacancies] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    vacancyId: '' // Track selected vacancy
  });
  const [error, setError] = useState(null);

  const dontWantEdit = (event) => {
    event.preventDefault();
    setWantEdit(false);
  };

  const wantEdit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // Add your edit logic here
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const fetchVacancies = async () => {
    try {
      const response = await axios.get('https://localhost:44391/api/Vacancies');
      setVacancies(response.data["getAllVacancies"] || []);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://localhost:44391/api/Vacancies/${editProductId}`, formData);
      console.log('Data posted:', response.data);
      toast.success('Vacancy created successfully!');
      setWantEdit(false); // Close modal on success
    } catch (error) {
      setError(error.message);
      toast.error('Error posting data.');
    }
  };

  return (
    <div className="flex justify-center fixed inset-0 backdrop-blur-xl z-10 items-center bg-[rgba(29,29,29,0.3)]">
      <div className="mx-0 h-fit w-1/3 bg-white rounded-lg p-5">
        <div className="flex flex-col gap-5 items-center">
          <div className="flex flex-col gap-1">
            <div>{editProductId}</div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="vacancyId">Select Vacancy</label>
                <select
                  name="vacancyId"
                  id="vacancyId"
                  value={formData.vacancyId}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                >
                  <option value="">-- Select a Vacancy --</option>
                  {vacancies.map((vacancy) => (
                    <option key={vacancy.id} value={vacancy.id}>
                      {vacancy.title} - {vacancy.location}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-primary mt-3">
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </form>
            <div className="w-full justify-center flex gap-2 mt-3">
              <button
                onClick={dontWantEdit}
                className="w-auto px-4 py-2 font-medium rounded-md duration-200 hover:bg-neutral-200"
              >
                No, keep it
              </button>
              <button
                onClick={wantEdit}
                disabled={isLoading}
                className={`${
                  isLoading
                    ? "cursor-not-allowed opacity-60"
                    : "cursor-pointer opacity-100 hover:bg-transparent hover:bg-[#d54947] hover:text-[#d54947]"
                } w-auto px-4 py-2 font-medium rounded-md duration-200 bg-[#da4848e6] text-white`}
              >
                {isLoading ? "Editing..." : "Yes, edit it"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
