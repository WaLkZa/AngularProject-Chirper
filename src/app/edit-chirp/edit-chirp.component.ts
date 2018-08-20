import { Component, OnInit } from '@angular/core';
import { ChirpService } from '../services/chirp.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EditChirpModel } from '../models/edit-chirp.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-chirp',
  templateUrl: './edit-chirp.component.html',
  styleUrls: ['./edit-chirp.component.css']
})
export class EditChirpComponent implements OnInit {
  bindingModel: EditChirpModel

  constructor(
    private chirpService: ChirpService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {
    this.bindingModel = new EditChirpModel('', '', '')
  }

  ngOnInit() {
    let chirpId = this.route.snapshot.params['id']

    this.chirpService.loadChirpById(chirpId)
      .subscribe(data => {
        this.bindingModel = data[0]
      })
  }

  editChirp() {
    this.chirpService.editChirp(this.bindingModel._id, this.bindingModel.author, this.bindingModel.text)
      .subscribe(() => {
        this.toastr.info("Chirp edited")
      })
  }
}
