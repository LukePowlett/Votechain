# Votechain

**Proof-of-Concept E-Voting System Built On Hyperledger Fabric**

Votechain is a small-scale e-voting system developed in support of my dissertation project for module CSC3095 at Newcastle University titled:

> "Investigating Hyperledger Fabric
> as a platform for Blockchain based
> E-Voting"

### Business Network

The Blockchain implementation of Votechain utilises Hyperledger Fabrics [Hyperledger Composer] tool to develop a Business Network Archive (BNA), deployable on the latest HLFv11.

The bna is made up of 3 core components:

  - **Model File:**         /models/powlett.luke.votechain.cto  Outlining the assets, participants and transactions for the Network
  - **Transaction File**    /lib/logic.js   The main transaction logic (chaincode) for the network
  - **Permission File**     /permissions.acl    Participant permission levels for assets/transactions

This bna is deployed onto and instance of HLFv11 and a REST API can be generated to interface with the votechain network.

For more information on Hyperledger Composer, see the Hyperledger Composer [tutorial pages].

### Votechain Dashboards

There are 3 dashboards for the Votechain proof-of-concept:

  - **Admin:**      Administration of election (i.e. creating candidates, voters, ballots)
  - **Voter:**      Main voter dashboard which could be displayed on dedicated machines at local polling stations
  - **Bulletin:**   Public bulletin board of all vote transactions written to the fabric

The web root for these dashboards is at /votechain-web/

**SEE Full-Installation-Instructions.txt FOR GUIDANCE ON INSTALLING/RUNNING HLF AND VOTECHAIN LOCALLY **

*Note that the focus of my project is on the backend implementation of a secure E-Voting system on Hyperledger Fabric; the purpose of the dashboards is to demonstrate the blockchain backend and so any security flaws in the front end are outside the main scope of my project*

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [Hyperledger Composer]: <https://hyperledger.github.io/composer/latest/>
   [tutorial pages]: <https://hyperledger.github.io/composer/latest/introduction/introduction>
