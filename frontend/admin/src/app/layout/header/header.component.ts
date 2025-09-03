import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderComponent {
  @Output() menu = new EventEmitter<void>();

  onMenuClick(): void {
    this.menu.emit();
  }
}

