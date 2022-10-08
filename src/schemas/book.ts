import * as yup from "yup";

export const trimText = "Este campo não pode conter apenas espaços";
export const emailText = "Este campo deve ser um email válido";
export const requiredText = "Este campo é obrigatório";

export const bookSchema = yup.object().shape({
  name: yup.string().trim(trimText).required(requiredText),
  author: yup.string().trim(trimText).required(requiredText),
  volume: yup.string().trim(trimText).required(requiredText),
  category: yup.string().trim(trimText).required(requiredText),
});
