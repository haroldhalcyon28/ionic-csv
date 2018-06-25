import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as papa from 'papaparse';
import { File, IWriteOptions } from '@ionic-native/file';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  registrationData = [
    {
      name: "Samuel",
      lastname: "Pedro",
      item: "Track 1"
    },
    {
      name: "JOhn",
      lastname: "Doe",
      item: "Track 2"
    }
  ]

  constructor(public navCtrl: NavController, private file: File) {

  }

  downloadData() {
    let csv = papa.unparse(this.registrationData);

    let fileName: any = "team.csv";
    // let option : IWriteOptions = {  }
    this.file.writeFile(this.file.externalRootDirectory, fileName, csv)
      .then(
        _ => {
          alert('Success first')
        }
      )
      .catch(
        err => {

          this.file.writeExistingFile(this.file.externalRootDirectory, fileName, csv)
            .then(
              _ => {
                alert('Success ;-)')
              }
            )
            .catch(
              err => {
                alert('Failure')
              }
            )
        }
      )

  }


}
