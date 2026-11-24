export const zeradores = [
  { id: 1, nome: "Gustavo", cor: "#f97316", avatar: "/Imagens/Chibi/Gu.png" },
  { id: 2, nome: "Giovanna", cor: "#8b5cf6", avatar: "/Imagens/Chibi/Gih.png" },
  { id: 3, nome: "Kreski", cor: "#01BE60", avatar: "/Imagens/Chibi/Kreski.png" },
  { id: 4, nome: "Felipe", cor: "#38BDF2", avatar: "/Imagens/Chibi/Felipe.png" },
  { id: 5, nome: "Iago", cor: "#f4f008", avatar: "/Imagens/Chibi/Iago.png" },
  { id: 6, nome: "Não Definido", cor: "#DEDADA", avatar: "/Imagens/Chibi/Não-Definido.png" }
];

export function getMemberByName(nome) {
  return zeradores.find((z) => z.nome === nome) || { nome, cor: "#10b981", avatar: "" };
}