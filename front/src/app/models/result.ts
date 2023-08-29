export interface Result {
    resultId?:number;

    surveyID?:number;
    surveyTitle?: string;

    userID?:number;
    username?: string;

    qattempted?:number;
    correctAns?:number;
    marksScored?:number;
    submitDateTime?:string;
}

export class ResultRequest implements Result {
    constructor(
      public  resultId?:number,

      public  surveyID?:number,
        
    
      public  userID?:number,
        
    
      public  qattempted?:number,
      public correctAns?:number,
      public  marksScored?:number,
      public  submitDateTime?:string,
    ) {}
}