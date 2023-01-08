import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  of,
  fromEvent,
  AsyncSubject,
  BehaviorSubject,
  interval,
  ReplaySubject,
  Subject,
  Observable,
  map,
  catchError,
  throwError,
  take,
  retry,
  delay,
  tap,
  retryWhen,
  combineLatest,
  concat,
  forkJoin,
  merge,
  skip,
  skipUntil,skipWhile
} from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit,AfterViewInit {
  name = 'Angular';
  numbers:any=[]
/*skip skips first n count elements from observable,raises error if skip count is more than emmitted values*/
ngOnInit(){
let obs1=of(1,2,3,4,5,6,7,8,9,0);
obs1.pipe(take(5),skip(3)).subscribe(
  (data)=>{console.log(data);},
  (error)=>{console.log(error);}
)
/*skipLast skips last n count values, if observable contionously emmits if you skipLast(2), on a source and source emmits third value, the first value of source is finially emmitted out on subscribe */
let obs2= interval(1000);
let k=obs2.pipe(skip(5)).subscribe(
  (data)=>{console.log(data);
  if (data>8){k.unsubscribe();}
  }/*if value crosses 10,11.. then 1,2 .. will be emmited */
)
/*SkipWhile* skips all the emmited elements from observable as long as condition hold true, if observable emmits 1,2,3,4,5 and condtion is x<4 then 1,2,3 are skipped */
let obs5= of(1,2,3,4);
obs5.pipe(skipWhile((x=>x<4))).subscribe(
  (data)=>{console.log(data+" "+"obs5");}
)
  
}

ngAfterViewInit(){
/*skipUniti* involves two observable first observable has say emmiting values a,b,c,d,f and when at time first obervable emmited d the intermidate observable emmited somevalue then at that point all the values of first observable before d are skipped. first observable values are skipped since from intermidiate observable emmits value */
let obs4=interval(2000);
obs4.pipe(skipUntil(fromEvent(document.getElementById('intermidiate')!,'click'))).subscribe(
  (data:number)=>{this.numbers.push(data);}
)
}
}

