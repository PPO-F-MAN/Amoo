import axios from "axios";

export const getNewWord = async () => {
  const response = await axios.get("/api/word?length=7");
  const newWord = response.data[0];

  return newWord;
};
