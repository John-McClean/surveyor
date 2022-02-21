import { EventEmitter, Output, Input, HostListener, Directive } from '@angular/core';

@Directive()
export abstract class Popover {

  @Input() params: any;
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  constructor() {
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.cancel();
  }

  canSubmit(): boolean {
    return true;
  }

  submit() {
    this.onSubmit.emit();
  }

  submitWithValue(value: any) {
    this.onSubmit.emit(value);
  }

  cancel() {
    this.onCancel.emit();
  }

  delete() {
    this.onDelete.emit();
  }

}
