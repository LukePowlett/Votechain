import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Voter } from '../powlett.luke.votechain';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class VoterService {

	
		private NAMESPACE: string = 'Voter';
	



    constructor(private dataService: DataService<Voter>) {
    };

    public getAll(): Observable<Voter[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getparticipant(id: any): Observable<Voter> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addParticipant(itemToAdd: any): Observable<Voter> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateParticipant(id: any, itemToUpdate: any): Observable<Voter> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteParticipant(id: any): Observable<Voter> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
