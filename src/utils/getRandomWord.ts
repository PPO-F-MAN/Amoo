import axios from "axios";

import { LENGTH_OF_WORD } from "../constants";

export const getNewWord = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_RANDOM_WORD_API}/word?length=${LENGTH_OF_WORD}`,
  );
  const newWord = response.data[0];

  return newWord;
};
