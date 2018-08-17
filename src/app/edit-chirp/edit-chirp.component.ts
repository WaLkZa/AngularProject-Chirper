import { Component, OnInit } from '@angular/core';
import { ChirpService } from '../services/chirp.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EditChirpModel } from '../models/edit-chirp.model';

@Component({
  selector: 'app-edit-chirp',
  templateUrl: './edit-chirp.component.html',
  styleUrls: ['./edit-chirp.component.css']
})
export class EditChirpComponent implements OnInit {
  bindigModel: EditChirpModel
  // id: string
  // author: string
  // text: string

  constructor(
    private chirpService: ChirpService,
    private route: ActivatedRoute,
    private router: Router) {
    this.bindigModel = new EditChirpModel('', '', '')
  }

  ngOnInit() {
    let chirpId = this.route.snapshot.params['id']

    this.chirpService.loadChirpById(chirpId)
      .subscribe(data => {
        // this.id = chirpId
        // this.author = data[0].author
        // this.text = data[0].text
        //this.bindigModel = data[0]
        //console.log(this.bindigModel)
      })
  }

  editChirp() {
    // this.chirpService.editChirp(this.id, this.author, this.model.text)
    //   .subscribe(() => {
    //     //this.toastr.info("Chirp edited")
    //   })
    //console.log(this.model.text)
  }

}
