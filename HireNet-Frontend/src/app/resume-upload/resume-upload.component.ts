import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-resume-upload',
  imports: [CommonModule],
  templateUrl: './resume-upload.component.html',
  styleUrl: './resume-upload.component.css'
})
export class ResumeUploadComponent {
  selectedFile : File | null = null;
  uploadMessage : string = ' ';

  constructor(private http :HttpClient){};

  onFileselected(event: any){
    this.selectedFile = event.target.files[0];
  }

  uploadResume(){
    if(!this.selectedFile) return;

    const formData = new FormData();
    formData.append('resume',this.selectedFile);
    formData.append('userId','USER_ID_HERE')

    this.http.post('http://localhost:5000/resume/upload',formData).subscribe({
      next: (res : any ) => this.uploadMessage = 'Resume uploaded successfully!',
      error:(err) => this.uploadMessage = 'upload failed!'
    });
  }

}
