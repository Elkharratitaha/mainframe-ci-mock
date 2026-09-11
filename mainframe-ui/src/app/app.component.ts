import { Component } from '@angular/core';
import { CiService, JobResponse } from './services/ci.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mainframe CI Dashboard';
  
  scriptName: string = '';
  codeSnippet: string = '';
  
  result: JobResponse | null = null;
  isLoading: boolean = false;

  constructor(private ciService: CiService) {}

  onSubmit() {
    this.isLoading = true;
    this.result = null;

    const payload = {
      scriptName: this.scriptName,
      codeSnippet: this.codeSnippet
    };

    this.ciService.analyzeScript(payload).subscribe({
      next: (res) => {
        this.result = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors de l\'appel API', err);
        this.isLoading = false;
        alert('Erreur de connexion avec le backend Java.');
      }
    });
  }
}