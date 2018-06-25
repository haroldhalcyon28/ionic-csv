import { Platform } from 'ionic-angular';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// Native
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class SqliteProvider {
  public db: any;
  _dbready = new BehaviorSubject<boolean>(false);

  constructor( private  sqlite : SQLite, public platform: Platform) {
    this.platform.ready().then(() => {
      this.initializeStorage();
    });
  }

  initializeStorage(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.db = db;
        this._dbready.next(true);

        db.executeSql('create table if not exists log(id INTEGER PRIMARY KEY AUTOINCREMENT, logId varchar(255), userId INTEGER, timeIn INTEGER, month INTEGER, lat double, long double, formattedAddress varchar(255), batteryStatus INTEGER, isSeen INTEGER, pic INTEGER, scanResult varchar(255), FOREIGN KEY(userId) REFERENCES user(id))', {}).then(() => {
          console.log('Created log table')
        }).catch(e => {
          console.log(e);
        });

          resolve({ success: true });
        }).catch(e => {
          console.log(e);
          reject(e);
        });
    });
  }


}
