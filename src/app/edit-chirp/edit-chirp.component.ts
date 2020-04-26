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
  authorName: string

  constructor(
    private chirpService: ChirpService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {
    this.bindingModel = new EditChirpModel('', '')
  }

  ngOnInit() {
    let chirpId = this.route.snapshot.params['id']

    this.chirpService.loadChirpById(chirpId)
      .subscribe(result => {
        this.bindingModel = result.chirp;
        this.authorName = result.chirp.user.name
      })
  }

  editChirp() {
    this.chirpService.editChirp(this.bindingModel.id, this.bindingModel.content)
      .subscribe(() => {
        this.toastr.info("Chirp edited")
      })
  }
}
