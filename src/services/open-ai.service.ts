import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenAIService {
  private readonly OPEN_AI_URL = 'https://api.openai.com/v1/chat/completions';
  private readonly API_KEY =
    'API';

  constructor(private http: HttpClient) {}

  getQuiz(question: string) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.API_KEY}`);

    const body = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.',
        },
        {
          role: 'user',
          content: '3 preguntas de ' + question + ' con opciones abc y dime la correcta',
        },
      ],
    };

    return this.http.post(this.OPEN_AI_URL, body, { headers }).pipe(
      map((response: any) => {
        return response.choices[0].message.content;
      })
    );
  }
}
