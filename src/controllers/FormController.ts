import FormModel from '../models/FormModel';
import FormView from '../views/FormView.js';

export default class FormController {
    model: FormModel;
    view: FormView;
    constructor(model: FormModel, view: FormView) {
        this.model = model;
        this.view = view;
        
        document.addEventListener('change', (event) => {
            if(event.target && event.target['id'] == 'op') {
                this.model.op = event.target['value'];
                this.model.resourceManager.notify();
            }
        });
        
        document.addEventListener('submit', async (event) => {
            event.preventDefault();
            let select = (id: string): string => {
                let elem = document.querySelector(id) as HTMLInputElement;
                return (elem && elem.value) ? elem.value : '';
            }
            let params = {
                id: select('#id'),
                op: select('#op'),
                title: select('#title'), 
                author: select('#author'), 
            }
            console.log("formcontroller submit: ", params);
            await this.model.submitForm(params).then(() => {
                this.model.resourceManager.notify();
            });
        });
    }
    
    update() {
        this.view.display();
    }
}