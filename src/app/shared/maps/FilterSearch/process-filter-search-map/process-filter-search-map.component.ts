import { Component } from '@angular/core';

@Component({
  template: '',
})
export class ProcessFilterSearchMap {


  public static getFilter(filter: string, entity: string): string {    
    return this.mapFilter(filter);
  }
  


  private static mapFilter(filter: string): string {
    switch (filter.toLocaleLowerCase()) {
      case 'petição':
        return 'petition';
      case 'petiçã':
        return 'petitio';
      case 'petiç':
        return 'petit';
      case 'peti':
        return 'peti';
      case 'pet':
        return 'pet';

      case 'peticao':
        return 'petition';
      case 'petica':
        return 'petiti';
      case 'petic':
        return 'petit';
      case 'peti':
        return 'peti';

      case 'reclamação':
        return 'complaint';
      case 'reclamacao':
        return 'complaint';
      case 'reclamaçã':
        return 'complain';
      case 'reclamaca':
        return 'complain';
      case 'reclamaç':
        return 'complai';
      case 'reclamac':
        return 'complai';
      case 'reclama':
        return 'compla';
      case 'reclam':
        return 'compl';
      case 'recla':
        return 'comp';
      case 'recl':
        return 'comp';
      case 'rec':
        return 'com';

      case 'ofensa':
        return 'offense';
      case 'ofens':
        return 'offens';
      case 'ofen':
        return 'offen';
      case 'ofe':
        return 'offe';
      case 'of':
        return 'of';




      case 'pendente':
        return 'pending';
      case 'pendent':
        return 'pendin';
      case 'penden':
        return 'pendi';
      case 'pende':
        return 'pendi';
      case 'pend':
        return 'pend';
      case 'pen':
        return 'pen';
      
      
      case 'avalicação em progresso-acessor':
        return 'assessment_acessor';
      case 'avalicação em progresso':
        return 'assessment';
      case 'avaliacao em progresso-acessor':
        return 'assessment_acessor';
      case 'avaliacao em progresso':
        return 'assessment';
      case 'avalicação':
        return 'assessment';
      case 'avaliacao':
        return 'assessment';


      case 'aguardando resposta do utente':
        return 'awaiting_complainer_response'; // AWAITING_COMPLAINER_RESPONSE';
      case 'aguardando resposta':
        return 'awaiting';
      case 'aguardando':
        return 'awaiting';
      
      
      case 'aguardando intervenção do coordenador':
        return 'awaiting_coordinator_interview'; // AWAITING_COORDINATOR_ITERVIEW';
      case 'aguardando intervenção':
        return 'awaiting';
      case 'aguardando':
        return 'awaiting';
      
      
      case 'alocado':
        return 'allocated'; // AWAITING_COORDINATOR_ITERVIEW';
      case 'alocad':
        return 'allocat';
      case 'aloca':
        return 'alloca';
      case 'aloc':
        return 'alloc';
      
      
      case 'fechado':
        return 'closed';
      case 'fechad':
        return 'close';
      case 'fecha':
        return 'clos';
      case 'fech':
        return 'clos';
      case 'fec':
        return 'clo';


      default:
        return filter;
    }
  }

}
