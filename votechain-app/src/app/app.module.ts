import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Configuration }     from './configuration';
import { DataService }     from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
// import { TransactionComponent } from './Transaction/Transaction.component'

import { BallotComponent } from './Ballot/Ballot.component';


  import { VoterComponent } from './Voter/Voter.component';
  import { CandidateComponent } from './Candidate/Candidate.component';


  import { VoteComponent } from './Vote/Vote.component';  
@NgModule({
  declarations: [
    AppComponent,
		HomeComponent,
    // TransactionComponent,
    
    BallotComponent
    ,
    
    VoterComponent,
      
      CandidateComponent
      ,

    
        VoteComponent
          
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    Configuration,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
