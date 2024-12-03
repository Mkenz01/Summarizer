import React, { useState } from 'react';
import './summary.css'
import './sidebar.css'

function Summary() {
    /*const _ud: any = localStorage.getItem('user_data');
    const ud = JSON.parse(_ud);
    /*const userId = ud.userId;*/
    const questionSeparator = ";;;";
    const answerSepartator =  ":::";
    const openAnswer = "{"
    const closeAnswer = "}";
    var quiz = "question 1 ::: {answer 1} ::: answer 2 ::: answer 3 ;;; question 2 ::: answer 1 ::: {answer 2} ::: answer 3 ;;;question 3 ::: answer 1 ::: answer 2 ::: {answer 3}";
    /*async function addCard(e: any): Promise<void> {
        e.preventDefault();
        let obj = { userId: userId};
        let js = JSON.stringify(obj);
        try {
            const response = await
                fetch('https://summarizer4331.jordanshouse.site/api/getQuiz',
                    {
                        method: 'Get', body: js, headers: {
                            'Content-Type':
                                'application/json'
                        }
                    });
            let txt = await response.text();
            let res = JSON.parse(txt);
            quiz = res.text;
        }
        catch (error: any) {
            console.log(error)
        }
    }*/



    return (
        <>
        <div className="right-container">
            <h1 className="container-heading">Summary Page</h1>
            <p className="container-information">Summary of filename.pdf</p>
            <p className="container-information">Created: 11/24/2024</p>
            <textarea id="summary-text-box" readOnly>
                Summary of filename.pdf will be placed here...
            </textarea>
        </div>
        <div className="past-files-side-bar">
            <div className="past-files-side-bar-header">Past Summaries:</div>
            <div className="past-summaries-text">filename.pdf</div>
            <div className="past-summaries-text">filename1.pdf</div>
            <div className="past-summaries-text">filename2.pdf</div>
        </div>
    </>
    );
}

export default Summary;