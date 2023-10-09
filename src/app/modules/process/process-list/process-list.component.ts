import { Component } from '@angular/core';

@Component({
  selector: 'process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.scss']
})
export class ProcessListComponent {

  public processes: any[] = [
    {
      processId: "Process AAA",
      type: "Peticao",
      status: "Pendente",
      requester: "Osorio Malache",
    },
    {
      processId: "Process BBB",
      type: "Reclamacao",
      status: "Fechado",
      requester: "Judiao Maua",
    },
    {
      processId: "Process CCC",
      type: "Reclamacao",
      status: "Pendente",
      requester: "Alzira Djedje",
    },
  ];

}
