import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Candidate } from '../powlett.luke.votechain';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class CandidateService {

	
		private NAMESPACE: string = 'Candidate';
	



    constructor(private dataService: DataService<Candidate>) {
    };

    public getAll(): Observable<Candidate[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getparticipant(id: any): Observable<Candidate> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addParticipant(itemToAdd: any): Observable<Candidate> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateParticipant(id: any, itemToUpdate: any): Observable<Candidate> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteParticipant(id: any): Observable<Candidate> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
