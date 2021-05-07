import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { CreateUserComponent } from './createuser/createuser.component';
import { EmailValidator } from '@angular/forms';

import { User } from './user-interface';
import { ManagementService } from './management.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
})
export class ManagementComponent implements OnInit {
  isLoading = false;

  usersList: User[] = [];
  constructor(public modalController: ModalController, private managementService: ManagementService) {
    this.createUserList();
  }

  ngOnInit() {}

  createUserList() {
    this.managementService.getUsers().subscribe((usersData) => {
      this.usersList = usersData;
    });
  }

  refreshUserList(event: any) {
    setTimeout(() => {
      this.managementService.getUsers().subscribe((usersData) => {
        this.usersList = usersData;
      });
      event.target.complete();
    }, 2000);
  }

  deleteUser(user: User) {
    this.usersList = this.usersList.filter((obj) => obj !== user);
    this.managementService.deleteUser(user).subscribe(() => {
      console.log('User deleted');
    });
  }

  addUser(user: User) {
    this.usersList.push({
      email: user.email,
      name: user.name,
      surname: user.surname,
      dni: user.dni,
      phone: user.phone,
      image: user.image,
      born: user.born,
    });
  }

  //Modal to create user
  async openCreateUserModal(user: User) {
    const modal = await this.modalController.create({
      component: CreateUserComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        user: user,
        addUser: this,
        deleteUser: this,
      },
    });
    return await modal.present();
  }
}
