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
  createUserForm!: FormGroup;
  passwordTypeInput = 'password';
  addUser = this.navParams.get('addUser');
  deleteUser = this.navParams.get('deleteUser');
  isLoading = false;
  error: string | undefined;
  @Input() user: any | null;

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
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  createUser() {
    this.isLoading = true;
    let user: User = {
      email: this.createUserForm.value.email,
      dni: this.createUserForm.value.dni,
      name: this.createUserForm.value.name,
      surname: this.createUserForm.value.surname,
      phone: this.createUserForm.value.phone,
      born: this.createUserForm.value.born,
      image: this.createUserForm.value.image,
    };

    this.managementService.createUser(user).subscribe(() => {
      console.log('user added');
      //LLAMADA AL SERVICIO PARA CREAR UN USUARIO
      this.deleteUser.deleteUser(this.user);
      this.addUser.addUser(user);
      this.dismiss();
    });
  }

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
      this.createUserForm = this.formBuilder.group({
        email: [this.user.email, Validators.required],
        dni: [this.user.dni, Validators.required],
        name: [this.user.name, Validators.required],
        surname: [this.user.surname, Validators.required],
        phone: [this.user.phone, Validators.required],
        born: [this.user.born, Validators.required],
        image: [this.user.image, Validators.required],
      });
    }
  }
}
