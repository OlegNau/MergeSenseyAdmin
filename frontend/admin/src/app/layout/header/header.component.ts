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
  @Output() public menuToggle = new EventEmitter<void>();

  public search = '';

  public onMenuClick(): void {
    this.menuToggle.emit();
  }
}

