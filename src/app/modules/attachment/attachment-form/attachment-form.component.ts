import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GenericComponent } from 'app/shared/generic/generic.component';
import { AttachmentModel } from 'app/models/attachment-model';
import { AttachmentOutputForm } from 'app/models/OutputFormData-model';
import { StepDirectionEnum } from 'app/models/enums/step-direction-enum';
import { ProcessService } from 'app/services/process.service';
import { ProcessStep } from 'app/modules/process/process-form/process-form.component';
import { DomSanitizer } from '@angular/platform-browser';
import { AttachmentService } from 'app/services/attachment.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'attachment-form',
  templateUrl: './attachment-form.component.html',
  styleUrls: ['./attachment-form.component.scss']
})
export class AttachmentFormComponent extends GenericComponent implements OnInit {

  public form: FormGroup;
  public canShowForm: boolean = false;


  public file: File | null = null;
  public safeUrl: any;
  public showPreview: boolean = false;
  protected fileReaded;


  @Input() step: boolean = false;
  @Input() attachments?: AttachmentModel[] = [];
  @Output() outputData = new EventEmitter<AttachmentOutputForm>();

  constructor(private formBuilder: FormBuilder, private attachmentService: AttachmentService, private processService: ProcessService, private sanitizer: DomSanitizer) {
    super();
  }



  ngOnInit(): void {
    this.createForm();
    this.canShowForm = true;
  }


  public select(event: any) {

    

    let reader = new FileReader();

    this.file = event.target.files[0];
    reader.readAsDataURL(this.file);
    reader.onload = (_event) => {
      this.fileReaded = reader.result;
      this.add(this.fileReaded, this.file)
    }

  }

  add(fileReaded?, file?: File) {
    let attachment: AttachmentModel;

    attachment = {
      id: null,
      fileName: this.form?.value.fileName,
      originalFileName: file.name,
      fileType: file.type,
      file: file,
      fileReaded: fileReaded,
      processId: null
    }

    // this.attachmentService.uploadAttachment(attachment).subscribe(
    //   (attachmentResponse) => {
    //     this.attachments.push(attachment);
    //     // if(attachmentResponse instanceof HttpResponse) {
    //     //   attachment.id = attachmentResponse.body.id;
    //     //   this.attachments.push(attachment);
    //     // } else {
    //     //   console.log("NNNNNNNNN");
    //     //   console.log(typeof(attachmentResponse));
          
    //     // }
        
    //   }
    // )

    this.attachments.push(attachment);
    this.file = null;
    this.fileReaded = null;
    this.form.reset();


  }

  public preview(attachment: AttachmentModel) {
    this.showPreview = true
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(attachment.fileReaded);
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
