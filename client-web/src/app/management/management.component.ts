import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ModalController, ToastController } from '@ionic/angular';
import { CreateUserComponent } from './createuser/createuser.component';
import { EmailValidator } from '@angular/forms';
import { Auth } from 'aws-amplify';
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
  constructor(
    public modalController: ModalController,
    public toastController: ToastController,
    private managementService: ManagementService
  ) {
    this.isLoading = true;
    this.createUserList();
  }

  ngOnInit() {}

  //Create user list
  createUserList() {
    this.isLoading = true;
    this.managementService.getUsers().subscribe((usersData) => {
      this.usersList = usersData;
      this.isLoading = false;
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
    this.deleteUserFromList(user);
    this.managementService.deleteUser(user).subscribe(() => {
      this.deteleWorkerToast();
    });
  }

  deleteUserFromList(user: User) {
    this.usersList = this.usersList.filter((obj) => obj !== user);
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

  async deteleWorkerToast() {
    const toast = await this.toastController.create({
      message: 'Worker deleted',
      duration: 2000,
      color: 'primary',
    });
    toast.present();
  }
  async signOut() {
    try {
      sessionStorage.removeItem('authorization');
      await Auth.signOut({ global: true });
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
}
