import { Component } from '@angular/core';
import { provideBeastCtx } from 'src/beast-rx/providers';

@Component({
  selector: '[app]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: provideBeastCtx(console.debug),
})
export class AppComponent {}
