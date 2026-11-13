import {
  Role,
  TipoImovel,
  Finalidade,
  status,
  localArqu,
  TipoArqui,
  TipoFile,
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
  email: z.string().email("Email inválido.").optional().or(z.literal("")),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres.").optional(),
  localizacao: z.string().min(2, "Localização em falta."),
  role: z.nativeEnum(Role, {
    message: "Selecione um tipo de utilizador válido.",
  }),
  contacto: z.string().min(9, "Número de contacto inválido."),
});

export type CreateUser = z.infer<typeof CreateTypeUser>;

export const UpdateTypeUser = z.object({
  idUser: z.coerce.number().min(1, "ID inválido."),
  nome: z.string().min(2, "Nome inválido.").optional(),
  email: z.string().email("Email inválido.").optional(),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres.").optional(),
  localizacao: z.string().min(2, "Localização inválida.").optional(),
  role: z.nativeEnum(Role).optional(),
  contacto: z.string().min(9, "Número de contacto inválido.").optional(),
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
  dataImovel: z.coerce.date().optional(),
  tipoImovel: z.nativeEnum(TipoImovel).optional(),
  finalidade: z.nativeEnum(Finalidade).optional(),
  estado: z.nativeEnum(status).optional(),
});

export type UpdateImovel = z.infer<typeof UpdateTypeImovel>;

// ======================================================
// INTERESSE
// ======================================================

export const CreateTypeInteresse = z.object({
  leadId: z.coerce.number().min(1, "Selecione um lead válido."),
  imovelId: z.coerce.number().min(1, "Selecione um imóvel válido."),
  observacoes: z.string().min(2, "Adicione uma observação."),
  dataInteresse: z.coerce.date().default(() => new Date()),
});

export type CreateInteresse = z.infer<typeof CreateTypeInteresse>;

export const UpdateTypeInteresse = z.object({
  idInteresse: z.coerce.number().min(1, "ID inválido."),
  leadId: z.coerce.number().min(1).optional(),
  imovelId: z.coerce.number().min(1).optional(),
  observacoes: z.string().min(2).optional(),
  dataInteresse: z.coerce.date().optional(),
});

export type UpdateInteresse = z.infer<typeof UpdateTypeInteresse>;

// ======================================================
// MENSAGEM
// ======================================================

export const CreateTypeMensagem = z.object({
  texto: z.string().min(1, "A mensagem não pode estar vazia."),
  dataMensagem: z.coerce.date().default(() => new Date()),
  userId: z.coerce.number().min(1, "Utilizador inválido."),
});

export type CreateMensagem = z.infer<typeof CreateTypeMensagem>;

export const UpdateTypeMensagem = z.object({
  idMensagem: z.coerce.number().min(1, "ID da mensagem inválido."),
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
  userId: z.coerce.number().min(1).optional(),
});

export type ArquivoSchema = z.infer<typeof arquivoType>;

// ======================================================
// UPLOAD DE IMAGENS
// ======================================================

const imagemSchema = z.object({
  filename: z.string().min(1, "O nome da imagem é obrigatório."),
  mimetype: z.enum(["image/jpeg", "image/png", "image/webp"], {
    message: "A imagem deve ser JPEG, PNG ou WebP.",
  }),
  file: z.any(),
});

export const imagensSchema = z
  .array(imagemSchema)
  .min(1, "Envie pelo menos uma imagem.")
  .max(10, "Máximo de 10 imagens.");

export type TypeImagens = z.infer<typeof imagensSchema>;

// ======================================================
// UPLOAD DE VÍDEOS
// ======================================================

const videoSchema = z.object({
  filename: z.string().min(1, "O nome do vídeo é obrigatório."),
  mimetype: z.enum(["video/mp4", "video/webm"], {
    message: "O vídeo deve ser MP4 ou WebM.",
  }),
  file: z.any(),
});

export const videosSchema = z
  .array(videoSchema)
  .min(1, "Envie pelo menos um vídeo.")
  .max(5, "Máximo de 5 vídeos.");

export type TypeVideos = z.infer<typeof videosSchema>;
