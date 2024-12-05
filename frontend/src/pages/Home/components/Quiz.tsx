import React, { useState, useEffect } from "react";
import {faAlignLeft, faXmark} from "@fortawesome/free-solid-svg-icons";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
const apiUrl = import.meta.env.VITE_API_URL;

interface question {
  question: string;
  options: string[];
  answer: string;
}


const DynamicQuiz: React.FC = () => {
  //const [questions, setQuestions] = useState<question[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const isLoaded = true;
  console.log(localStorage.getItem("quiz"));
  const questions: question[] = JSON.parse(localStorage.getItem("quiz") || '{"quizQuestions": []}').quizQuestions;

  let isSubmitted = false;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsDisabled(true);

    // Create a FormData object to extract values from the form
    const formData = new FormData(event.target as HTMLFormElement);

    // Create an object to store the answers
    const answers: Record<string, string> = {};

    const answeredCorrectly: boolean[] = new Array(questions.length).fill(false);

    let numCorrect = 0;

    // Iterate through questions and extract the selected answers
    questions.forEach((question, index) => {
      const questionKey = `q${index + 1}`; // corresponds to name attribute in input fields
      const answer = formData.get(questionKey) as string; // Get the selected answer
      answers[questionKey] = answer;
      if(answer.charAt(0) == question.answer.charAt(0)){
        answeredCorrectly[index] = true;
        numCorrect++;
      }

      const checkMark = document.getElementById("chk" + ((index * 4) + question.answer.charCodeAt(0) - 65)) || {style: {display: ""}};
      const xMark = document.getElementById("x" + ((index * 4) + answer.charCodeAt(0) - 65)) || {style: {display: ""}};

      checkMark.style.display = "inline";
      if (((index * 4) + question.answer.charCodeAt(0) - 65) != ((index * 4) + answer.charCodeAt(0) - 65))
        xMark.style.display = "inline";

    });
    window.scrollTo(0, 0)
    console.log(answeredCorrectly);

    document.getElementById("scorecard").style.display = "block";
    document.getElementById("score").textContent = (numCorrect / answeredCorrectly.length * 100) +"%";
    document.getElementById("#correct").textContent = numCorrect +"";
    document.getElementById("#incorrect").textContent = (answeredCorrectly.length - numCorrect) +""


    const data ={
      userId: JSON.parse(localStorage.getItem("user_data") || "{}").id,
      numCorrect: numCorrect,
      numQuestions: answeredCorrectly.length
    }
    console.log(data)

    fetch(apiUrl+"/api/save-quiz-results", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

        })
        .catch((error) => {
          console.log("error saving quiz results");
        });

  };

  return (
      <>
        <div id="scorecard" style={styles.scorecontainer}>
          <h2 style={{color: "black", textAlign: "center"}}>Quiz Graded</h2>
          <div style={styles.scoreGrid}>
            <div style={styles.item}>Score:</div>
            <div id="score" style={styles.item}></div>
            <div style={styles.item}>Correct Answers</div>
            <div id="#correct" style={styles.item}></div>
            <div style={styles.item}>Incorrect Answers</div>
            <div id="#incorrect" style={styles.item}></div>
          </div>
          <div onClick={()=>window.location.reload()} style={styles.submitButton}>retake quiz</div>
        </div>
        <div style={styles.container}>
          <h1 style={styles.heading}>Take the Quiz!</h1>
    <form id="quiz" onSubmit={handleSubmit}>
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
                            disabled={isDisabled}
                            type="radio"
                            name={`q${index + 1}`}
                            value={option}
                            required
                            style={styles.input}
                        />
                        {option}
                        <FontAwesomeIcon id={`chk${(index * 4) + optionIndex}`}
                                         style={{display: 'none', color: 'green'}} icon={faCheck} size="1x"/>
                        <FontAwesomeIcon id={`x${(index * 4) + optionIndex}`} style={{display: 'none', color: 'red'}}
                                         icon={faXmark} size="1x"/>
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
      </>
)
  ;
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
  scorecontainer: {
    maxWidth: "800px",
    margin: "30px auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
    background: "#f9f9f9",
    display: "none"


  },
  scoreGrid:{
    display: 'grid',
    gridTemplateColumns: "1fr 1fr",
  },
  item:{
    padding: '10px',
  },
  heading: {
    margin: "0",
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
    textAlign: "center"
  },
};

export default DynamicQuiz;
