import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GenericComponent } from 'app/shared/generic/generic.component';
import { AttachmentModel } from 'app/models/attachment-model';
import { AttachmentOutputForm } from 'app/models/OutputFormData-model';
import { StepDirectionEnum } from 'app/models/enums/step-direction-enum';
import { ProcessService } from 'app/services/process.service';
import { ProcessStep } from 'app/modules/process/process-form/process-form.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'attachment-form',
  templateUrl: './attachment-form.component.html',
  styleUrls: ['./attachment-form.component.scss']
})
export class AttachmentFormComponent extends GenericComponent implements OnInit {

  public form: FormGroup;
  public canShowForm: boolean = false;


  public fileToUpload: File | null = null;
  public data;
  public safeUrl: any;
  public showPreview: boolean = false;


  @Input() step: boolean = false;
  @Input() attachments?: AttachmentModel[] = [];
  @Output() outputData = new EventEmitter<AttachmentOutputForm>();

  constructor(private formBuilder: FormBuilder, private processService: ProcessService, private sanitizer: DomSanitizer) {
    super();
  }



  ngOnInit(): void {
    this.createForm();
    this.canShowForm = true;
  }


  public select(event: any) {

    

    let reader = new FileReader();

    this.fileToUpload = event.target.files[0];
    reader.readAsDataURL(this.fileToUpload);
    reader.onload = (_event) => {
      this.data = reader.result;
      this.add(this.data, this.fileToUpload)
    }

  }

  add(data?, fileToUpload?) {

    let attachment: AttachmentModel;

    attachment = {
      id: null,
      fileName: this.form?.value.fileName,
      originalFileName: fileToUpload.name,
      data: data
    }

    this.attachments.push(attachment);

    this.fileToUpload = null;
    this.data = null;
    this.form.reset();


  }

  public preview(file: AttachmentModel) {
    this.showPreview = true
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(file.data);
  }

  delete(index: number) {
    this.attachments.splice(index, 1);
  }


  public createForm() {
    this.form = this.formBuilder.group({
      id: [null],
      fileName: [null, [Validators.required]],
      originalFileName: [null, [Validators.required]]
    })
  }

  public getFormRequestData(form: any): Array<AttachmentModel> {
    let formData: AttachmentModel = form.value;
    return Array.of(formData);
  }

  public onSubmit() {
    throw new Error(`onSubmit`);
  }

  public onPrevious() {

    let outputDataForm: AttachmentOutputForm = {
      attachments: this.attachments,
      stepDirection: StepDirectionEnum.PREVIOUS.value
    }

    
    
    this.outputData.emit(outputDataForm);
  }

  public onNext() {

    let outputDataForm: AttachmentOutputForm = {
      attachments: this.attachments,
      stepDirection: StepDirectionEnum.NEXT.value
    }
    this.outputData.emit(outputDataForm);
  }


}
