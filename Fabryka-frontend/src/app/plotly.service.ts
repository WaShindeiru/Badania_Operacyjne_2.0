import { Injectable } from '@angular/core';
declare let Plotly: any;

@Injectable({
  providedIn: 'root'
})
export class PlotlyService {

  constructor() { }

  plotLine(title: string, plotDiv: string, x:number[], y:number[]){           
    let trace = {
      x: x,    
      y: y,   
      type: 'scatter'   
    };
                  
    let layout = {
      title:title,

      xaxis: {
        title: {
          text: "Liczba Iteracji"
        }
      },

      yaxis: {
        title: {
          text: "Koszt"
        }
      }
    };
    
    Plotly.newPlot(plotDiv, [trace], layout);     
  }
}
