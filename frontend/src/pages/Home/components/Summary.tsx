import React, { useState } from 'react';


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
        <div>
            `${quiz}`
        </div>
    );
}

export default Summary;