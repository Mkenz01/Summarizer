import React, { useState, useEffect } from "react";

interface question {
  question: string;
  options: string[];
  answer: string;
}


const DynamicQuiz: React.FC = () => {
  //const [questions, setQuestions] = useState<question[]>([]);
  const isLoaded = true;
  const questions: question[] = JSON.parse(localStorage.getItem("quiz") || '{"quizQuestions": []}').quizQuestions;
  console.log(questions);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Create a FormData object to extract values from the form
    const formData = new FormData(event.target as HTMLFormElement);

    // Create an object to store the answers
    const answers: Record<string, string> = {};

    // Iterate through questions and extract the selected answers
    questions.forEach((question, index) => {
      const questionKey = `q${index + 1}`; // corresponds to name attribute in input fields
      const answer = formData.get(questionKey) as string; // Get the selected answer
      answers[questionKey] = answer;
    });

    console.log("Submitted Answers:", answers);

  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Take the Quiz!</h1>
      <form onSubmit={handleSubmit}>
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <div key={index} style={styles.question}>
              <h2 style={styles.questionTitle}>
                {index + 1}. {question.question}
              </h2>
              <div style={styles.answers}>
                {question.options.map((option, optionIndex) => (
                  <label key={optionIndex} style={styles.label}>
                    <input
                      type="radio"
                      name={`q${index + 1}`}
                      value={option}
                      required
                      style={styles.input}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>Loading questions...</p>
        )}
        {isLoaded && (
          <button type="submit" style={styles.submitButton}>
            Submit Quiz
          </button>
        )}
      </form>
    </div>
  );
};

// Inline styles

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: "800px",
    backgroundColor: "white",
    margin: "30px auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
    background: "#f9f9f9",
  },
  heading: {
    textAlign: "center",
    color: "#333",
  },
  question: {
    marginBottom: "25px",
  },
  questionTitle: {
    display: "block",
    fontSize: "1.2em",
    color: "#444",
  },
  answers: {
    marginTop: "10px",
  },
  label: {
    display: "block",
    marginBottom: "10px",
    fontSize: "1em",
    cursor: "pointer",
  },
  input: {
    marginRight: "10px",
  },
  submitButton: {
    width: "100%",
    padding: "10px",
    fontSize: "1.3em",
    color: "white",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default DynamicQuiz;
