import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgClass],
  templateUrl: './app-layout.component.html',
})
export class AppLayoutComponent {
  sidebarOpen = true;
  toggleSidebar() { this.sidebarOpen = !this.sidebarOpen; }
}
