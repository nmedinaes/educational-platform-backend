import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OpenAIService } from 'src/services/open-ai.service';

@Component({
  selector: 'app-quiz-creation',
  templateUrl: './quiz-creation.component.html',
  styleUrls: ['./quiz-creation.component.css']
})
export class QuizCreationComponent implements OnInit {
  quizData: any;
  question: string = '';
  isLoading: boolean = false;

  constructor(private openAIService: OpenAIService) { }

  ngOnInit(){
    this.isLoading = false;
  }

  createQuiz() {
    this.isLoading = true;

    this.openAIService.getQuiz(this.question).subscribe({
      next: response => {
        console.log(response);
        this.quizData = response;
        this.isLoading = false;
      },
      error: error => {
        console.error(error);
        this.isLoading = false;
      }
    });
  }
}
