// export class Model {

//     constructor(objeto?) {
//         Object.assign(this, objeto);
//     }
  
//   }
  
  export class FraldaModel {
      
      id:number;
      nome: string;
      checada: boolean;

      constructor(
        id: number,
        nome: string,
        checada: boolean) {
        this.id = id;
        this.nome = nome;
        this.checada = checada;
      }
  }