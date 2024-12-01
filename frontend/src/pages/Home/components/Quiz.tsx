import React, { useState, useEffect } from "react";

const DynamicQuiz: React.FC = () => {
  const [questions, setQuestions] = useState<
    { text: string; options: string[] }[]
  >([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Simulate fetching questions (replace with real API call)
  useEffect(() => {
    const mockData = {
      questions: [
        { text: "Test Question?", options: ["A", "B", "C", "D"] },
        { text: "Test Question?", options: ["A", "B", "C", "D"] },
        { text: "Test Question?", options: ["A", "B", "C", "D"] },
        { text: "Test Question?", options: ["A", "B", "C", "D"] }
      ]
    };

    // Simulating API call
    setTimeout(() => {
      setQuestions(mockData.questions);
      setIsLoaded(true);
    }, 1000);
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert("Quiz submitted!");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Take the Quiz!</h1>
      <form onSubmit={handleSubmit}>
        {isLoaded ? (
          questions.map((question, index) => (
            <div key={index} style={styles.question}>
              <h2 style={styles.questionTitle}>
                {index + 1}. {question.text}
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
    margin: "30px auto",
    backgroundColor: "white",
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
    fontSize: "18px",
    color: "#444",
  },
  answers: {
    marginTop: "10px",
  },
  label: {
    display: "block",
    marginBottom: "10px",
    fontSize: "16px",
    cursor: "pointer",
  },
  input: {
    marginRight: "10px",
  },
  submitButton: {
    display: "block",
    width: "100%",
    padding: "10px",
    fontSize: "18px",
    color: "white",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default DynamicQuiz;
