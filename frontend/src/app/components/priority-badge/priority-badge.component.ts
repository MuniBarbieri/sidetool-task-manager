import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-priority-badge',
  standalone: false,
  templateUrl: './priority-badge.component.html',
  styleUrl: './priority-badge.component.scss'
})
export class PriorityBadgeComponent {
  @Input() value!: 'low' | 'medium' | 'high';
  @Input() form?: FormGroup;
  @Input() readonly: boolean = false;

  get selected(): boolean {
    return this.form?.value?.priority === this.value;
  }

  onClick() {
    if (this.readonly || !this.form) return;
    this.form.patchValue({ priority: this.value });
  }

  get classes(): string {
    const base = 'px-3 py-1 rounded-sm border border-yellow-400  text-xs sm:text-sm text-yellow-300 bg-neutral-900 transition';

    const hover = this.readonly ? '' : ' cursor-pointer hover:bg-yellow-600 hover:text-yellow-100';

    const isSelected = this.readonly || this.selected;

    const active = isSelected
      ? this.value === 'low'
        ? ' bg-yellow-900 text-yellow-100'
        : this.value === 'medium'
          ? ' bg-yellow-600 text-yellow-100'
          : ' bg-red-600 text-yellow-100'
      : '';

    return `${base}${hover} ${active}`;
  }
}
