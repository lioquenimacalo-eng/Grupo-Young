import {
  Role,
  TipoImovel,
  Finalidade,
  status,
  localArqu,
  TipoArqui,
  TipoFile,
  TipoStatus,
  Observacoes,
  MensageStatus,
} from "generated/prisma/enums";

import { z } from "zod";

// ======================================================
// ADMIN
// ======================================================

export const CreateTypeAdmin = z.object({
  email: z.string().email("Deve ser um email válido."),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
});

export type CreateAdmin = z.infer<typeof CreateTypeAdmin>;

// ======================================================
// USER
// ======================================================

export const CreateTypeUser = z.object({
  nome: z.string().min(2, "Insira o nome completo!"),
  email: z.string().email("Email inválido."),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres.").optional(),
  localizacao: z.string().min(2, "Localização em falta."),
  contacto: z.number().min(9, "Número de contacto inválido."),
  role: z.nativeEnum(Role, {
    message: "Selecione um tipo de utilizador válido.",
  }),
});

export type CreateUser = z.infer<typeof CreateTypeUser>;

export const UpdateTypeUser = z.object({
  idUser: z.coerce.number().min(1, "ID inválido."),
  nome: z.string().min(2, "Nome inválido.").optional(),
  email: z.string().email("Email inválido.").optional(),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres.").optional(),
  localizacao: z.string().min(2, "Localização inválida.").optional(),
  role: z.nativeEnum(Role).optional(),
  contacto: z.number().min(9, "Número de contacto inválido.").optional(),
});

export type UpdateUser = z.infer<typeof UpdateTypeUser>;

// ======================================================
// LOGIN
// ======================================================

export const LoginTypeUser = z.object({
  email: z.string().email("Email inserido inválido!"),
  senha: z.string().min(1, "Senha obrigatória!"),
});

export type LoginUser = z.infer<typeof LoginTypeUser>;

// ======================================================
// IMOVEIS 
// ======================================================

export const CreateTypeImovel = z.object({
  titulo: z.string().min(3, "O título deve ter pelo menos 3 caracteres."),
  descricao: z.string().min(10, "A descrição deve ser mais detalhada."),
  preco: z.coerce.number().positive("O preço deve ser superior a zero."),
  dimensao: z.string().min(1, "Informe as dimensões do imóvel."),
  localizacao: z.string().min(2, "Localização em falta."),
  quartos: z.coerce.number().int().min(0).optional(),
  wc: z.coerce.number().int().min(0).optional(),
  dataImovel: z.coerce.date().default(() => new Date()),
  statusUpload: z.nativeEnum(TipoStatus).default("PROCESSANDO").optional(),
  tipoImovel: z.nativeEnum(TipoImovel, {
    message: "Selecione um tipo de imóvel válido.",
  }),
  finalidade: z.nativeEnum(Finalidade, {
    message: "Selecione Venda ou Aluguer.",
  }),
  estado: z.nativeEnum(status).optional(),
});

export type CreateImovel = z.infer<typeof CreateTypeImovel>;

export const UpdateTypeImovel = z.object({
  idImovel: z.coerce.number().min(1, "ID do imóvel inválido."),
  titulo: z.string().min(3).optional(),
  descricao: z.string().min(10).optional(),
  preco: z.coerce.number().positive().optional(),
  dimensao: z.string().min(1).optional(),
  localizacao: z.string().min(2).optional(),
  quartos: z.coerce.number().int().min(0).optional(),
  wc: z.coerce.number().int().min(0).optional(),
  dataImovel: z.coerce.date().default(() => new Date()).optional(),
  tipoImovel: z.nativeEnum(TipoImovel).optional(),
  finalidade: z.nativeEnum(Finalidade).optional(),
  statusUpload: z.nativeEnum(TipoStatus).optional(),
  estado: z.nativeEnum(status).optional(),
});

export type UpdateImovel = z.infer<typeof UpdateTypeImovel>;

// ======================================================
// INTERESSE
// ======================================================

export const CreateTypeInteresse = z.object({
  leadId: z.coerce.number().min(1, "Selecione um lead válido."),
  imovelId: z.coerce.number().min(1, "Selecione um imóvel válido."),
  observacoes: z.nativeEnum(Observacoes).default(Observacoes.PENDENTE),
  dataInteresse: z.coerce.date().default(() => new Date()),
});

export type CreateInteresse = z.infer<typeof CreateTypeInteresse>;

export const UpdateTypeInteresse = z.object({
  idInteresse: z.coerce.number().min(1, "ID inválido."),
  leadId: z.coerce.number().min(1).optional(),
  imovelId: z.coerce.number().min(1).optional(),
  observacoes: z.nativeEnum(Observacoes).default(Observacoes.ATENDIDA),
  dataInteresse: z.coerce.date().optional(),
});

export type UpdateInteresse = z.infer<typeof UpdateTypeInteresse>;

// ======================================================
// MENSAGEM
// ======================================================

export const CreateTypeMensagem = z.object({
  texto: z.string().min(1, "A mensagem não pode estar vazia."),
  dataMensagem: z.coerce.date().default(() => new Date()),
  estado: z.nativeEnum(MensageStatus).default(MensageStatus.ENTREGUE),
  userId: z.coerce.number().min(1, "Utilizador inválido."),
});

export type CreateMensagem = z.infer<typeof CreateTypeMensagem>;

export const UpdateTypeMensagem = z.object({
  idMensagem: z.coerce.number().min(1, "ID da mensagem inválido."),
  estado: z.nativeEnum(MensageStatus).default(MensageStatus.LIDA),
  texto: z.string().min(1, "A mensagem não pode estar vazia.").optional(),
});

export type UpdateMensagem = z.infer<typeof UpdateTypeMensagem>;

// ======================================================
// ARQUIVO
// ======================================================

export const arquivoType = z.object({
  idArquivo: z.coerce.number().min(1, "ID inválido.").optional(),
  filename: z.string().min(1, "Nome do ficheiro obrigatório."),
  urlfile: z.string().min(1, "URL do ficheiro obrigatório."),
  dataFile: z.coerce.date().default(() => new Date()),
  local: z.nativeEnum(localArqu, {
    message: "Selecione a localização do arquivo.",
  }),
  tipoArqui: z.nativeEnum(TipoArqui, {
    message: "Selecione o tipo de arquivo.",
  }),
  tipoFile: z.nativeEnum(TipoFile, {
    message: "Selecione Imagem ou Vídeo.",
  }),
  imovelId: z.coerce.number().min(1).optional(),
});

export type ArquivoSchema = z.infer<typeof arquivoType>;

// ======================================================
// UPLOAD DE IMAGENS
// ======================================================


export const ficheiroSchema = z.object({
  filename: z.string().min(1, "Nome obrigatório."),

  mimetype: z.enum([
    "image/jpeg",
    "image/png",
    "image/webp",
    "video/mp4",
    "video/webm",
  ]),

  file: z.any(),
});

export const ficheirosSchema = z
  .array(ficheiroSchema)
  .min(1, "Envie pelo menos um ficheiro.")
  .max(15, "Máximo de 15 ficheiros.");

