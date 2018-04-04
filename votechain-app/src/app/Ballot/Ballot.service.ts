import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Ballot } from '../powlett.luke.votechain';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class BallotService {

	
		private NAMESPACE: string = 'Ballot';
	



    constructor(private dataService: DataService<Ballot>) {
    };

    public getAll(): Observable<Ballot[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Ballot> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Ballot> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Ballot> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Ballot> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
