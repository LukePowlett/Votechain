import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { BallotComponent } from './Ballot/Ballot.component';


  import { VoterComponent } from './Voter/Voter.component';
  import { CandidateComponent } from './Candidate/Candidate.component';


  import { VoteComponent } from './Vote/Vote.component';  
const routes: Routes = [
     //{ path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'Ballot', component: BallotComponent},
    
    
      { path: 'Voter', component: VoterComponent},
      
      { path: 'Candidate', component: CandidateComponent},
      
      
        { path: 'Vote', component: VoteComponent},
        
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
