import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../Interview/Interview.css'
export default function QuizQuestion() {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const { questionId } = useParams(); // Extract questionId from the route
  const navigate = useNavigate(); // For navigation between questions
  const { vacancyId } = useParams();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchQuestion = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://localhost:44391/api/Question?vacancyId=${vacancyId}&page=${page}`);
        setQuestion(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestion();
  }, [questionId, page]);

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value); // Set selected answer to answerText
  };

  const handleSubmit = () => {
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (page <= 15) {
      setPage(page + 1);
    } else {
      navigate('/interview/result');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!question) return <p>No question found.</p>;

  return (
   
    <div className="container-fluid">
    <div className="container ">
   <div className="row gap-3 min-h-screen">
   <div className={styles.quizContainer}>
      <h1 className={styles.h1}>Question</h1>
      <div className={styles.question}>
        <h3>{question.description}</h3>
        {question.answers.map((answer, i) => (
          <div key={i}>
            <input
              type="radio"
              id={`answer${i}`}
              name="answer"
              value={answer.answerText}  // Store the answerText
              checked={selectedAnswer === answer.answerText}  // Check if the selected answer matches the answerText
              onChange={handleAnswerChange}
              disabled={isAnswered}
            />
            <label htmlFor={`answer${i}`}>{answer.answerText}</label>  {/* Show answerText */}
          </div>
        ))}
      </div>

      <button className={styles.button} onClick={handleSubmit} disabled={isAnswered}>
        {isAnswered ? 'Answered' : 'Submit Answer'}
      </button>

      {isAnswered && (
        <div className={styles.result}>
          <p>{selectedAnswer === question.answers.find(a => a.answerText === selectedAnswer)?.answerText && question.answers.find(a => a.answerText === selectedAnswer)?.isCorrect ? 'Correct!' : 'Incorrect!'}</p>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
    </div>
   </div>
    </div>
  </div>
  );
}
