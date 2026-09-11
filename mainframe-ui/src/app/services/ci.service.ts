import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface JobRequest {
  scriptName: string;
  codeSnippet: string;
}

export interface JobResponse {
  jobId: string;
  status: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class CiService {
  private apiUrl = 'http://localhost:8080/api/ci/analyze';

  constructor(private http: HttpClient) {}

  analyzeScript(request: JobRequest): Observable<JobResponse> {
    return this.http.post<JobResponse>(this.apiUrl, request);
  }
}