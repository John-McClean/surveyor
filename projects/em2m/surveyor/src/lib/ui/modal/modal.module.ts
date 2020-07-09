import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalService} from './modal.service';
import {CenterModalContainer} from './containers/center/center-modal-container.component';
import {SideModalContainer} from './containers/side/side-modal-container.component';
import {InlineModalContainer} from './containers/inline/inline-modal-container.component';
import {ConfirmationModal} from './modals/confirmation-modal/confirmation-modal.component';
import {FixedModalContainer} from './containers/fixed/fixed-modal-container.component';
import {StatusModal} from './modals/status-modal/status-modal.component';
import {LoadingModal} from './modals/loading-modal/loading-modal.component';

export * from './modal.component';
export * from './modal.model';
export * from './modal.service';
export * from './modal-container.component';
export * from './containers/center/center-modal-container.component';
export * from './containers/side/side-modal-container.component';
export * from './containers/inline/inline-modal-container.component';
export * from './containers/fixed/fixed-modal-container.component';
export * from './modals/confirmation-modal/confirmation-modal.component';
export * from './modals/status-modal/status-modal.component';
export * from './modals/loading-modal/loading-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CenterModalContainer,
    SideModalContainer,
    InlineModalContainer,
    FixedModalContainer,
    ConfirmationModal,
    StatusModal,
    LoadingModal
  ],
  declarations: [
    CenterModalContainer,
    SideModalContainer,
    InlineModalContainer,
    FixedModalContainer,
    ConfirmationModal,
    StatusModal,
    LoadingModal
  ],
  entryComponents: [
    CenterModalContainer,
    SideModalContainer,
    InlineModalContainer,
    FixedModalContainer,
    ConfirmationModal,
    StatusModal,
    LoadingModal
  ]
})
export class SurveyorModalModule {
  static forRoot(): ModuleWithProviders<SurveyorModalModule> {
    return {
      ngModule: SurveyorModalModule,
      providers: [
        ModalService
      ]
    };
  }
}
