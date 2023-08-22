import EnumEspecie from "./EnumEspecie";

type TipoPet = {
  id: number;
  nome: string;
  dataDeNascimento: Date;
  especie: EnumEspecie;
  adotado: boolean;
};

export default TipoPet;
