import { ACTIONS } from "../App";
function Questions({question,dispatch}){

    
    return (
            <div style={{paddingBottom:'2rem'}}>
                
            <p style={{marginBottom:'1.2rem',textAlign:'start'}}>{question.index}{')'}   Question: {decodeHTML(question.question)}</p>

            <ul onChange={(e)=>{
                const input = e.target.closest('input:checked');
                console.log(input);
                input.setAttribute('checked','')
                const selectedAnswer = input.value;
                const answerIndex = question.allOptions.findIndex((option)=>{
                    return option===question.correct_answer
                })
                console.log(answerIndex);
                const correct = (answerIndex==selectedAnswer)? true:false
                console.log(correct);
                
                dispatch({type:ACTIONS.UPDATE,payload:{correct}})      
            }}>
                {question.allOptions.map((option,index)=>{
                    return (<li style={{display:"flex",rowGap:'16px',listStyle:'none'}} key={index+1}>
                        <input type="radio" name={`options-${question.index}`} value={index} id={`${question.question}-${index}`} />
                        <label htmlFor={`${question.question}-${index}`}>{decodeHTML(option)}</label>
                    
                    </li>)
                })}
            </ul>
        </div>
    )
}
function decodeHTML(text){
    const textArea = document.createElement('textarea');
    textArea.innerHTML=text;
    return textArea.value
}


export default Questions