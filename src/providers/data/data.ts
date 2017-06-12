import { Injectable, NgZone } from '@angular/core';
import PouchDB from 'pouchdb';
import { Apikey } from '../../../private/apikey';

@Injectable()
export class DataProvider {
  apikey: Apikey;
  fbid: number;
  username: string;
  picture: string;
  db: any;
  data: any;
  cloudantUsername: string;
  cloudantPassword: string;
  remote: string;

  constructor(public zone: NgZone){
    this.apikey = new Apikey();
    this.db = new PouchDB(this.apikey.databaseName);
    this.cloudantUsername = this.apikey.cloudantUsername; //YourAPIUsernameHere;
    this.cloudantPassword = this.apikey.cloudantPassword;//YourAPIPasswordHere;
    this.remote = this.apikey.remote; //`https://YOUR-URL-HERE-bluemix.cloudant.com/letschat';

    //Set up PouchDB
    let options = {
      live: true,
      retry: true,
      continuous: true,
      auth: {
        username: this.cloudantUsername,
        password: this.cloudantPassword
      }
    };

    this.db.sync(this.remote, options);

  }

  addDocument(message) {
    this.db.put(message);
  }

  getDocuments(){

    return new Promise(resolve => {

      this.db.allDocs({

        include_docs: true,
        limit: 30,
        descending: true

      }).then((result) => {

        this.data = [];

        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
        });

        this.data.reverse();

        resolve(this.data);

        this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          this.handleChange(change);
        });

      }).catch((error) => {

        console.log(error);

      });

    });

  }

  handleChange(change) {

    this.zone.run(() => {

      let changedDoc = null;
      let changedIndex = null;

      this.data.forEach((doc, index) => {

        if(doc._id === change.id){
          changedDoc = doc;
          changedIndex = index;
        }

      });

      //A document was deleted
      if(change.deleted){
        this.data.splice(changedIndex, 1);
      }
      else {

        //A document was updated
        if(changedDoc){
          this.data[changedIndex] = change.doc;
        }

        //A document was added
        else {
          this.data.push(change.doc);
        }

      }

    });

  }

}
