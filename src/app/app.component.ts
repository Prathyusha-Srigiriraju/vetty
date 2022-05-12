import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, FormControl, Validators, PatternValidator } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vetty';
  addlist: FormGroup;
  list = ["Todo", "Inprogress", "Etc"];
  main_Array: any[] = [];
  array_1:any;
  array_2:any;
  array_3:any;
  store_Data = {};
  dragElementid:any;
  dragObject:any;
  filtered_Data: any;

  checkModal = false;
  submitType:any


  constructor(private fb: FormBuilder){

    this.addlist = this.fb.group({
      'header': ['', Validators.required],
      'description': ['', Validators.required],
      'table': ['']
    })
  }


  // submit action of form

  submit(value:any){
    const d = new Date();
    value.date = d

    
    if(!this.checkModal)  {this.main_Array.push(value)} 
    else if(this.submitType == 'Inprogress') { value.table = 'Inprogress'; this.main_Array.push(value); }
    else if(this.submitType == 'Todo')  { value.table = 'Todo'; this.main_Array.push(value); }
    else if(this.submitType == 'Etc') { value.table = 'Etc'; this.main_Array.push(value) }

    

    localStorage.setItem("key", JSON.stringify(this.main_Array))  

    //console.log(value)

    if(value.table == 'Etc'){
      this.array_3.push(value)
    }
    if(value.table == 'Inprogress'){
      this.array_2.push(value)
    }
    if(value.table == 'Todo'){
      this.array_1.push(value)
    }


  }


  getvalue(value:any){
    //console.log(value.value)
  }

  // delete action of block

  
  deleteList(type:any,value:any,tableName:any){


    if(type == 'multipleList'){

      if(tableName == 'Todo'){ 
        const newArray = this.main_Array.filter((o:any) => o.table != 'Todo');
        //console.log(newArray)
        localStorage.setItem("key", JSON.stringify(newArray))  
        this.array_1 = []
      }

      if(tableName == 'Inprogress'){        

      const newArray = this.main_Array.filter((o:any) => o.table != 'Inprogress');
      //console.log(newArray)
      localStorage.setItem("key", JSON.stringify(newArray)) 
      this.array_2 = []

      }
      
      if(tableName == 'Etc'){ 
        const newArray = this.main_Array.filter((o:any) => o.table != 'Etc');
        //console.log(newArray)
        localStorage.setItem("key", JSON.stringify(newArray))  
        this.array_3 = []
      }

     
    }

    if(value != 'noData'){



      if(value.table == 'Todo'){
        let newArray:any[] = this.main_Array.filter((object:any) => object.description != value.description);
        //console.log(newArray)
        this.array_1 = newArray
      }

      if(value.table == 'Inprogress'){
        let newArray:any[] = this.main_Array.filter((object:any) => object.description != value.description);
        this.array_2 = newArray
      }

      if(value.table == 'Etc'){
       let newArray:any[] = this.main_Array.filter((object:any) => object.description != value.description);
        this.array_3 = newArray
      }
       

      
      var newArray = this.main_Array.filter((object:any) => object.description != value.description);
      //console.log(newArray)
      localStorage.setItem("key", JSON.stringify(newArray))  

   
    }
  }

    // checking add button of individual block 

  checkMOdaltype(listType:any,tableName:any){
    this.addlist.reset();
    if(listType == 'singleList'){
      this.checkModal = true; 
      //console.log(tableName)
      if(tableName == 'Etc') this.submitType = 'Etc'
      if(tableName == 'Todo') this.submitType = 'Todo'
      if(tableName == 'Inprogress') this.submitType = 'Inprogress'
    }
    else{
      this.checkModal = false;
    }
  }
  

  ngOnInit(){
    let newObject:any = localStorage.getItem("key");
    this.main_Array  =  JSON.parse(newObject)
    //console.log( this.main_Array);
    
    this.array_1 = this.main_Array.filter((o:any) => o.table == 'Todo')
    this.array_2 = this.main_Array.filter((o:any) => o.table == 'Inprogress')
    this.array_3 = this.main_Array.filter((o:any) => o.table == 'Etc')
    
   
  }

     // below events are for drag and drop


  allowDrop(ev:any) {
    ev.preventDefault();
  }

  drag(ev:any,drag:any) {
    ev.dataTransfer.setData("text", ev.target.id);
    this.dragObject = drag;
  }

  drop(ev:any,text:any) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    this.dragObject.table = text


    this.main_Array.concat(this.dragObject)

    localStorage.setItem("key", JSON.stringify(this.main_Array))  

  }


  
  
}
