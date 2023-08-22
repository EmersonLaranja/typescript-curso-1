import EnumEspecie from "./EnumEspecie";

type TipoPet = {
  id: number;
  nome: string;
  idade: number;
  especie: EnumEspecie;
  adotado: boolean;
};

export default TipoPet;
