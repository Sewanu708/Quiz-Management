import {act, useEffect,useReducer,useState } from 'react'
import './App.css';
import Result from './components/quizResult';
import Questions from './components/questions';
import { Skeleton,Box } from '@mui/material';
export const ACTIONS = {NEXT:'next',PREV:'prev',UPDATE:'update'}
function App() {
  const [data,setData] = useState([]);

  const [openDialog,setOpenDialog] = useState(false);
  const [activities,dispatch] = useReducer(reducer,{attempt:0,score:0,prev:0,next:10})
  function reducer(activities,action){
      switch(action.type){
        case ACTIONS.NEXT:
          if (activities.next===data.length) return activities
          return {...activities,next:activities.next+10,prev:activities.prev+10}

        case ACTIONS.PREV:
          console.log(activities);
          
          if ((activities.prev===0)) return activities
          return {...activities,next:activities.prev,prev:activities.prev-10}

        case ACTIONS.UPDATE:
          console.log(activities);
          
            if (action.payload.correct) return {...activities,score:activities.score+1,attempt:activities.attempt+1}
            return {...activities,attempt:activities.attempt+1}
            
         default:
            return {attempt:0,score:0,prev:0,next:10}
      }
  }
  async function fetchQuiz(){
    try {
        const quiz = await fetch('https://opentdb.com/api.php?amount=50&category=17');
        const result = await quiz.json();
        const quizQuestions = result?.results.map((question,index)=>{return {...question,index:index+1,allOptions:shuffle([...question.incorrect_answers, question.correct_answer])}})
        // console.log(quizQuestions);
        setData(quizQuestions)
          
      }catch (error) {
        console.log(error); 
    }
  }


  
  useEffect(()=>{
    fetchQuiz();
    
  },[]);
  
  
  if (data.length===0) return (
    <Box sx={{ width: 300 }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  );
  return (
    <div>
      <h2>Questions</h2>

      <form>
        {
            data.length>0?
              data.slice(activities.prev,activities.next).map((question)=>{
                  
                  return <Questions  key={question.index}  question={question} dispatch={dispatch}/>
              }):
            'Loading...'
          }
        <button onClick={(e)=>{
          e.preventDefault()
          dispatch({type:ACTIONS.PREV})
        }}>PREVIOUS</button>

        <button onClick={(e)=>{
          e.preventDefault();
          setOpenDialog(true) 
        }} >SUBMIT</button>

        <button onClick={(e)=>{
          e.preventDefault();
          dispatch({type:ACTIONS.NEXT})
          if (activities.next===data.length) e.setAttribute('disabled','');
        }}>NEXT</button>

      </form>
      <Result openDialog={openDialog} activities={activities} setOpenDialog={setOpenDialog}/>
    </div>
  )
}


function shuffle(arr){
  for(let i = arr.length-1; i>0;i--){
      const j = Math.floor((Math.random()*(i+1)));
      [arr[i],arr[j]]=[arr[j],arr[i]]
  }

  return arr
}
export default App
