
interface Book {
    id:string;
    title : string;
    author : string;
    genre : string;
    rating : number;
    total_copies : number;
    available_copies : number;
    description:string;
    coverColor : string;
    coverUrl : string;
    videoUrl : string;
    summary : string;
    isLoanedBook? : boolean;
    userId?:string;

}


interface AuthCredentials {
    fullName : string;
    email : string;
    universityId : number;
    password : string;
    universityCard : string;
    
}


interface BookParams {
    title: string;
    author: string;
    genre: string;
    rating: number;
    coverUrl: string;
    coverColor: string;
    description: string;
    totalCopies: number;
    videoUrl: string;
    summary: string;
  }
  
  interface BorrowBookParams {
    bookId: string;
    userId: string;
  }