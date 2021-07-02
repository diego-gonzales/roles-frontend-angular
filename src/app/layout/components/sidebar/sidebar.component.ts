import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../pages/authentication/services/authentication.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/pages/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    // { path: '/pages/user-profile', title: 'User Profile',  icon:'person', class: '' },
    // { path: '/pages/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    // { path: '/pages/typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: '/pages/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/pages/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/pages/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    { path: '/pages/products', title: 'Products',  icon:'liquor', class: '' },
    { path: '/pages/customers', title: 'Customers',  icon:'settings_accessibility', class: '' },
    { path: '/pages/sales', title: 'Sales',  icon:'store_front', class: '' },
    { path: '/pages/users', title: 'Users',  icon:'portrait', class: '' },
    { path: '/pages/categories', title: 'Categories',  icon:'category', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
    { path: '/authentication/signin', title: 'Logout',  icon:'logout', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems: any[];

  get currentUser() {
    return this.authService.currentUser;
  };

  constructor( private authService: AuthenticationService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }


  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  isLogout( title: string ) {
    if (title === 'Logout') {
      this.authService.logout();
    };
  };

}
