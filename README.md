# node-provenance-hash
Create a provenance hash for folder contents.

This package is made (but not limited) for NFT projects that have a need to prove that a folder did not have its contents changed.
To do this, we do the following:

1. Load the files in specific order
2. Concatenate the hashes (sha256) of their content
3. Hash the hashes

This gives us a string. In case the order of files has changed or contents of any file has changed, 
the string we get would change also indicating that the contents of the folder has changed, hence the PROVE in provenance hash.
We are proving the contents and ordering is same.

##Usage

hash.ts
```ts
import { makeHash } from "node-provenance-hash";

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
```
then
`ts-node hash.ts`