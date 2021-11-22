import { makeHash } from "./src/main";

//The following function will sort the files in ascending order using number derived from filename i.e 1.jpg (if it doesn't contain Infinity and NaN)
const numericalCompare = (a: string, b: string): number => {
  const fileNameToNumber = (file: string): number => Number(file.split(".")[0]);

  return fileNameToNumber(a) - fileNameToNumber(b);
};

makeHash(
  __dirname + "/sources/images",
  __dirname + "/sources/json",
  numericalCompare
).then((data) => console.log(data));
