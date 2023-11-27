import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericComponent } from '../generic/generic.component';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends GenericComponent implements OnInit{

  public form: FormGroup;
  public canShowForm: boolean = false;

  // @Input() filter: string;

  @Output() onSearchEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.createForm();
   this.canShowForm = true;
  }

  public createForm() {

    this.form = this.formBuilder.group({
      filter: ['', [Validators.required]]
    });
  }

  private onSubmit() {
    console.log(this.form);
    
    if (this.isValidForm(this.form)) {
      this.onSearchEvent.emit(this.form?.value.filter);
    } else {
      return;
    }
  }

  private onClearFilter() {
    this.form.reset();
    this.onSearchEvent.emit(null);
  }

}
