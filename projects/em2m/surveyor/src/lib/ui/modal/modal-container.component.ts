import { Input, Type, ComponentFactoryResolver, ViewChild, ViewContainerRef, Output, EventEmitter, OnInit, HostListener, Directive } from "@angular/core";
import {Modal} from "./modal.component";
import {ModalOptions} from "./modal.model";

@Directive()
export abstract class ModalContainer implements OnInit {

  @Input() modal: Type<Modal>;
  @Input() options: ModalOptions = {};
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  @ViewChild('modalTarget', {read: ViewContainerRef, static: true}) modalTarget: any;
  title: string;
  submitLabel = "Ok";
  cancelLabel = "Cancel";
  deleteLabel = "Delete";
  hideTitle = false;
  hideActions = false;
  hideSubmit = false;
  hideCancel = false;
  hideDelete = true;
  width = 350;
  modalRef: any;
  isDismissed = false;
  noPadding = false;

  constructor(private resolver: ComponentFactoryResolver) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.title = this.options.title;
    this.submitLabel = this.options.submitLabel || "Ok";
    this.cancelLabel = this.options.cancelLabel || "Cancel";
    this.deleteLabel = this.options.deleteLabel || "Delete";
    this.hideActions = this.options.hideActions;
    this.hideTitle = this.options.hideTitle;
    this.hideSubmit = this.options.hideSubmit;
    this.hideDelete = this.options.hideDelete != null && typeof(this.options.hideDelete) !== 'undefined'
      ? this.options.hideDelete : this.hideDelete;
    this.hideCancel = this.options.hideCancel;
    this.width = this.options.width || 350;
    this.noPadding = this.options.noPadding;

    let factory = this.resolver.resolveComponentFactory(this.modal);
    let modalRef = this.modalTarget.createComponent(factory);
    modalRef.instance.params = this.options.params;

    // Handle abstract modal output events
    modalRef.instance.onSubmit.subscribe((value: any) => {
      this.onSubmit.emit(value);
    });
    modalRef.instance.onCancel.subscribe((value: any) => {
      this.onCancel.emit( value);
    });
    modalRef.instance.onDelete.subscribe((value: any) => {
      this.onDelete.emit(value);
    });
    this.modalRef = modalRef;
  }

  canSubmit(): boolean {
    if (this.modalRef) {
      return this.modalRef.instance.canSubmit();
    } else {
      return false;
    }
  }

  submit() {
    if (this.modalRef) {
      this.modalRef.instance.submit();
    }
  }

  cancel() {
    if (this.modalRef) {
      this.modalRef.instance.cancel();
    }
  }

  delete() {
    if (this.modalRef) {
      this.modalRef.instance.delete();
    }
  }

  dismiss() {
    this.isDismissed = true;
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev:KeyboardEvent) {
    if (ev.keyCode == 27) {
      this.cancel();
    }
  }
}
