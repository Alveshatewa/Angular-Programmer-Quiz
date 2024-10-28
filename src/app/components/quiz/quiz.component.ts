import { Component, OnInit } from '@angular/core';
import quiz_questions from '../../../assets/data/quizz_questions.json'
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit{

title:string = " "

question:any
selectedQuestion:any

answers:string[] = []
selectedAnswer:string = ""

questionMinIndex: number = 0
questionMaxIndex: number = 0

finishedGame: boolean = false


  constructor(){}

  
  ngOnInit(): void { 

    if(quiz_questions){
      
      this.finishedGame = false
      this.title = quiz_questions.title

      this.question = quiz_questions.questions
      //this.selectedQuestion = quiz_questions.questions[this.questionMinIndex]
      this.selectedQuestion = this.question[this.questionMinIndex]

      this.questionMinIndex = 0
      this.questionMaxIndex = this.question.length

      console.log(this.questionMinIndex)
      console.log(this.questionMaxIndex)
    }

   }

    async ButtonPressed(value:string){

    this.answers.push(value)
    

    this.nextQuestion()

   }

    async nextQuestion(){

    this.questionMinIndex +=1

    if(this.questionMaxIndex > this.questionMinIndex){

      this.selectedQuestion = this.question[this.questionMinIndex]

    } else{

      const finalGameAnswer: string = await this.result(this.answers)

      this.finishedGame = true
      this.selectedAnswer = quiz_questions.results[finalGameAnswer as keyof typeof quiz_questions.results]

      

    }
   }

   result(answers:string[]){

    const responses = answers.reduce((previous, current, i, arr) => {

      if(arr.filter(item => item === previous).length > arr.filter(item => item === current).length){

          return previous

      } else{

        return current

      }

    })

    return responses

   }

   back(){

    this.questionMinIndex = 0
    this.questionMaxIndex = 0

    this.ngOnInit()
   }
}
