import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderComponent {
  @Output() menuToggle = new EventEmitter<void>();

  search = '';

  onMenuClick(): void {
    this.menuToggle.emit();
  }
}

