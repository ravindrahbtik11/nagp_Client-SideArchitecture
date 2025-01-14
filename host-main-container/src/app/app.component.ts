import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Home';
  value: any = '';
  ngOnInit() {
  }


  startWorker() {
    if (typeof Worker !== 'undefined') {
      const worker = new Worker(new URL('./main.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
        this.value = data;
        // console.log('Result from worker:', data);
      };
      worker.postMessage('Start');
    } else {
      console.log('Web workers are not supported in this environment.');
    }
  }

}
