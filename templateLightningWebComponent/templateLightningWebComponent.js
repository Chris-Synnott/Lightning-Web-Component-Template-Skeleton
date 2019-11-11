import { LightningElement, track, api, wire} from 'lwc';

//---Ex: import SObject:
//import { getSObjectValue } from '@salesforce/apex';

//---Ex: import specific apex method:
//import apexMethod from '@salesforce/apex/Namespace.Classname.apexMethod';
import getContacts from '@salesforce/apex/Namespace.ContactsClass.getContacts';

//---Other import examples:
//import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import { refreshApex } from '@salesforce/apex';


var privateNonExportedDataExample = [
    {Id: '1',dataKey: 'value1'},
    {Id: '2',dataKey: 'value2'},
    {Id: '3',dataKey: 'value3'},
];

export default class TemplateLightningWebComponent extends LightningElement {
    //(public) passed in params into this component from caller
    //In parent Aura caller: <c:TemplateLightningWebComponent recordId="{!v.recordId}" objectApi="{v.objectApiName}"/>
    @api recordId;
    @api objectApi;

    //(private) - When data changes, value is refreshed on screen
    @track contacts = privateNonExportedDataExample;

    //(private) - When data changes, value is NOT refreshed on screen
    contactsNonTracked = [];


    // ------------*** LWC Lifecycle Events (In Order) ***------------
    // ---- Docs: https://developer.salesforce.com/docs/component-library/documentation/lwc/reference_lifecycle_hooks ----- ///
    
    // ----#1 - called when component is created.
    // constructor(){
    //     super();
    //     console.log('constructor()');
    // }

    // ----#2 - called when component is inserted into document.
    // connectedCallback(){
    //     console.log('connectedCallback()');
    // }

    // ----#3 - called after every render of component. 
    // renderedCallback(){
    //     console.log('renderedCallback()');
    // }

    // ----after #3 - called when component is removed from the document.
    // disconnectedCallback(){
    //     console.log('disconnectedCallback()');
    // }

    // ---- Called every time the component needs to update the UI. for complex tasks, will throw error if no template is returned. Rarely used.
    // // render(){
    // //    
    // // }



    //Example of get method
    //Place {numContacts}in html 
    get contactsLength(){
        return this.contacts.length;
    }

    //-----------APEX CALLOUT Examples-------
    //In Apex, method must be static AND either global or public. Also use: @AuraEnabled(cacheable=true)
    //in html, use: <template if:true={contacts.data}> and <template if:true={contacts.error}> to wait for data to arrive
    //Doc: https://developer.salesforce.com/docs/component-library/documentation/lwc/lwc.apex
        //-Apex --> prop
            // @wire(apexMethod, { paramName:paramValue }) contacts;
        //-Apex --> function
            //@wire(apexMethod, { paramName1:paramValue1, paramName2:paramValue2 })
            // wiredContacts({ error, data }) {
            //     if (data) {
            //         this.contacts = data;
            //         this.error = undefined;
            //     } else if (error) {
            //         this.error = error;
            //         this.contacts = undefined;
            //     }
            // }

        //-NOTE: If method does not have (cacheable=true), you must call it imperatively.
            // apexMethod()
            // .then(result => {
            //     this.contacts = result;
            // })
            // .catch(error => {
            //     this.error = error;
            // });
    
    //Ex: wire callout
    @wire(getContacts, { accountId: this.recordId  }) contacts;

    //-Ex: Import Object and fields
        // import NAME_FIELD from '@salesforce/schema/Contact.Name';
        // @wire(getSingleContact) contact;
        // get name() {
        //     return this.contact.data ? getSObjectValue(this.contact.data, NAME_FIELD) : '';
        // }

    //-Ex: Searching for html elements/tags in Lightning Web Component
        //find first occ of an element with class='className'
            //var el = this.template.querySelector('className');
        //find all occ of an element with class='.className'
            //var elList = this.template.querySelectorAll('className');

}