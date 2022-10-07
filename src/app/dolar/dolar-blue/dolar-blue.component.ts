import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { interval, timer } from 'rxjs';
import { DolarService } from '../dolar.service';
import { Dolar, Dolar_Hoy } from '../interface/dolar.interface';

@Component({
  selector: 'app-dolar-blue',
  templateUrl: './dolar-blue.component.html',
  styles: [
  ],
  providers: [DatePipe]
})
export class DolarBlueComponent implements OnInit {

  time: number = 900000;

  dolar: Dolar = {
    blue: {
      value_avg: 0,
      value_sell: 0,
      value_buy: 0
    },
    last_update: ''
  }

  dolar_anterior: Dolar = {
    blue: {
      value_avg: 0,
      value_sell: 0,
      value_buy: 0
    },
    last_update: ''
  }

  dolar_hoy: Dolar_Hoy = {
    date: '',
    source: '',
    value_sell: 0,
    value_buy: 0
  };

  color: string = ''

  myDate = new Date();
  dateString: string | null = '';
  successAudio = new Audio('assets/sounds/success.mp3');
  errorAudio = new Audio('assets/sounds/error.mp3');

  constructor(private dolarService: DolarService, public datePipe: DatePipe) {
    this.myDate.setDate(this.myDate.getDate() - 1);
    this.dateString = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }

  ngOnInit() {

    this.updateDolar()
    this.updateDolarDia()
    timer(1000).subscribe(() => { this.chooseColor()});

    interval(this.time).subscribe(n => {
      console.log("UPDATE")
      this.updateDolar()
      this.chooseColor()
    })
  }

  updateDolar() {
    this.dolarService.getDolar()
    .subscribe(dolar => {

      if(this.dolar.blue != dolar.blue) {
        this.dolar_anterior.blue = this.dolar.blue
        this.dolar_anterior.last_update = this.dolar.last_update

        this.dolar.blue = dolar.blue
      }
      this.dolar.last_update = dolar.last_update
    })
  }

  chooseColor() {
    const primero = this.dolar.blue.value_buy;
    const segundo = this.dolar_anterior.blue.value_buy;
    if (primero < segundo && segundo !=0 ) {
      this.errorAudio.load()
      this.errorAudio.play()
      this.color = 'text-danger';
    } else if (primero > segundo && segundo !=0) {
     this.successAudio.load()
     this.successAudio.play()
     this.color = 'text-success';
    } else {
      this.color =  '';
    }
  }

  updateDolarDia() {
  this.dolarService.getDolarYesterday()
    .subscribe(data => {
      data.forEach((dolar) => {
        if (dolar.date == this.dateString && dolar.source == 'Blue') {
          this.dolar_hoy = dolar;
        }
      })
    })
  }

}
