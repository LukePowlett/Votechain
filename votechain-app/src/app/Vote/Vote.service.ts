import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Vote } from '../powlett.luke.votechain';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class VoteService {

	
		private NAMESPACE: string = 'Vote';
	



    constructor(private dataService: DataService<Vote>) {
    };

    public getAll(): Observable<Vote[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getTransaction(id: any): Observable<Vote> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addTransaction(itemToAdd: any): Observable<Vote> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateTransaction(id: any, itemToUpdate: any): Observable<Vote> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteTransaction(id: any): Observable<Vote> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}

