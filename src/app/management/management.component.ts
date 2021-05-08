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

  //Create user list
  createUserList() {
    this.managementService.getUsers().subscribe((usersData) => {
      this.usersList = usersData;
    });
  }

  //Refresh the users
  refreshUserList(event: any) {
    setTimeout(() => {
      this.managementService.getUsers().subscribe((usersData) => {
        this.usersList = usersData;
      });
      event.target.complete();
    }, 2000);
  }

  //Delte user from list
  deleteUser(user: User) {
    this.usersList = this.usersList.filter((obj) => obj !== user);
    this.managementService.deleteUser(user).subscribe(() => {
      console.log('User deleted');
    });
  }

  //Add user from list
  addUser(user: User) {
    this.usersList.push({
      email: user.email,
      data: {
        name: user.data.name,
        surname: user.data.surname,
        dni: user.data.dni,
        phone: user.data.phone,
        image: user.data.image,
        born: user.data.born,
      },
    });
    console.log(this.usersList);
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
