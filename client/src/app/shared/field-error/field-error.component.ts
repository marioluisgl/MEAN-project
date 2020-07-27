import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { globalAnimation } from '../../core/animations/global.animations'

@Component({
  selector: 'app-field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [globalAnimation]
})
export class FieldErrorComponent implements OnInit {  
  @Input() control: AbstractControl;
  @Input() disableLine = false;
  @Input() textAlign: 'left' | 'right' | 'center' = 'right';

  public showError = false;
  public textErrors: string[] = [];

  constructor(private _cdr: ChangeDetectorRef,
              private _translate: TranslateService) {
  }

  ngOnInit() {
    console.log(this.control);
    this._handleError(this.control?.errors);

    this.control?.valueChanges.pipe(
      debounceTime(400),
      untilDestroyed(this)
    ).subscribe(data => {
      this._handleError(this.control?.errors);
    });
  }


  private _handleError(errors: AbstractControl['errors']) {
    this.textErrors = [];
    if (!errors || Object.values(errors).length === 0) {
      this.showError = false;
    } else {
      this.showError = true;
      if (errors.hasOwnProperty('required')) {
        const text = this._translate.instant('Errors.required');
        this.textErrors.push(text);
      }
      if (errors.hasOwnProperty('minlength')) {
        const text = this._translate.instant('Errors.minlength', {value: errors.minlength.requiredLength});
        this.textErrors.push(text);
      }
      if (errors.hasOwnProperty('maxlength')) {
        const text = this._translate.instant('Errors.maxlength', {value: errors.maxlength.requiredLength});
        this.textErrors.push(text);
      }
      if (errors.hasOwnProperty('min')) {
        const text = this._translate.instant('Errors.min', {value: errors.min.min});
        this.textErrors.push(text);
      }
      if (errors.hasOwnProperty('max')) {
        const text = this._translate.instant('Errors.max', {value: errors.max.max});
        this.textErrors.push(text);
      }
      if (errors.hasOwnProperty('matchPassword')) {
        const text = this._translate.instant('Errors.matchPassword');
        this.textErrors.push(text);
      }
      if (errors.hasOwnProperty('email')) {
        const text = this._translate.instant('Errors.email');
        this.textErrors.push(text);
      }
      if (this.textErrors.length === 0) {
        const text = this._translate.instant('Errors.invalid');
        this.textErrors.push(text);
      }
    }
    this._cdr.markForCheck();
  }

  
  ngOnDestroy(): void {
  }

}
