import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace powlett.luke.votechain{
   export class Ballot extends Asset {
      ballotId: string;
      used: boolean;
      owner: User;
   }
   export abstract class User extends Participant {
      userId: string;
      firstName: string;
      lastName: string;
   }
   export class Voter extends User {
      address: string;
      hasVoted: boolean;
   }
   export class Candidate extends User {
      party: string;
   }
   export class Vote extends Transaction {
      voteId: string;
      ballot: Ballot;
      newOwner: Candidate;
   }
// }
