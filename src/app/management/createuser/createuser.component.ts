import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, Platform } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { untilDestroyed } from '@core';
import { ManagementService } from '../management.service';

import { User } from '.././user-interface';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.scss'],
})
export class CreateUserComponent implements OnInit {
  @Input() user: any | null;

  createUserForm!: FormGroup;
  userImage = '';
  addUser = this.navParams.get('addUser');
  deleteUser = this.navParams.get('deleteUser');
  isLoading = false;
  error: string | undefined;

  constructor(
    public modalController: ModalController,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private platform: Platform,
    private loadingController: LoadingController,
    private managementService: ManagementService,
    private navParams: NavParams
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  //Close the modal
  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
  onFileSelected(event: any) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.createUserForm.value.image = reader.result;
      //console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  //Submit the form to create the user
  createUser() {
    console.log(this.createUserForm.value.image);
    this.isLoading = true;
    let user: User = {
      email: this.createUserForm.value.email,
      data: {
        dni: this.createUserForm.value.dni,
        name: this.createUserForm.value.name,
        surname: this.createUserForm.value.surname,
        phone: this.createUserForm.value.phone,
        born: this.createUserForm.value.born,
        image: this.createUserForm.value.image,
      },
    };

    this.managementService.createUser(user).subscribe(() => {
      console.log('user added');
      if (this.user != (null || undefined)) {
        this.deleteUser.deleteUser(this.user);
      }
      this.addUser.addUser(user);
      this.dismiss();
    });
  }

  //Create the initial form
  private createForm() {
    if (this.user == (null || undefined)) {
      this.createUserForm = this.formBuilder.group({
        email: ['', Validators.required],
        dni: ['', Validators.required],
        name: ['', Validators.required],
        surname: ['', Validators.required],
        phone: ['', Validators.required],
        born: ['', Validators.required],
        image: ['', Validators.required],
      });
    } else {
      this.userImage = this.user.data.image ? this.user.data.image : '.././assets/puerticas-logo-white.png';
      this.createUserForm = this.formBuilder.group({
        email: [this.user.email, Validators.required],
        dni: [this.user.data.dni, Validators.required],
        name: [this.user.data.name, Validators.required],
        surname: [this.user.data.surname, Validators.required],
        phone: [this.user.data.phone, Validators.required],
        born: [this.user.data.born, Validators.required],
        image: [this.user.data.image, Validators.required],
      });
    }
  }
}
