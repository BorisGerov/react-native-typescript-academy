import { StatusForQuestion, IdType , ImageData} from "./shared-types";


export class Questions {
    constructor( 
        public textOfQuestion: string,
        public points: number,
        public answers:  string[], //Answer[], 
        public pictureOfQuestion?: ImageData, 
        public status: StatusForQuestion = StatusForQuestion.MultipleChoice, //public status = StatusForQuestion.MultipleChoice
        public id: IdType = undefined,
        public created = new Date().toDateString(),
        public modified = new Date().toDateString(),
    ) {}
}

export class Answer {
    [x: string]: string | any; 
    constructor (
        public id: IdType = undefined,
        public scorePercentage: number,
        public textOfAnswer?: string[],
        public pictureOfAnswer?: ImageData,
        public created = new Date().toDateString(),
        public modified = new Date().toDateString(),
    ){}
}