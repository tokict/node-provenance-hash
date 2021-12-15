import { createHash } from "crypto";
import { createReadStream, readdirSync } from "fs";

export default async function (
  sourceDirImages?: string,
  sourceDirMetadata?: string,
  sortingFunction?: (a: string, b: string) => number
): Promise<{
  imagesProvenanceHash: string | undefined;
  metadataProvenanceHash?: string;
}> {
  let imagesProvenanceHash;
  let metadataProvenanceHash;

  if (sourceDirMetadata) {
    const jsonFiles = sortingFunction
      ? readdirSync(sourceDirMetadata)
      : readdirSync(sourceDirMetadata).sort(sortingFunction);

    let fullMetadataHash = "";

    for (const file of jsonFiles) {
      const h = await hash(sourceDirMetadata + "/" + file, true);
      fullMetadataHash += h;
    }

    metadataProvenanceHash = await hash(fullMetadataHash, false);
  }

  if (sourceDirImages) {
    const imageFiles = sortingFunction
      ? readdirSync(sourceDirImages)
      : readdirSync(sourceDirImages).sort(sortingFunction);

    let fullImgHash = "";

    for (const file of imageFiles) {
      const h = await hash(sourceDirImages + "/" + file, true);
      fullImgHash += h;
    }

    imagesProvenanceHash = await hash(fullImgHash, false);
  }

  return {
    imagesProvenanceHash,
    metadataProvenanceHash,
  };
}

const hash = async (data: string, isFile: boolean): Promise<string> => {
  const hash = createHash("sha256");
  return new Promise((resolve, reject) => {
    if (isFile) {
      const input = createReadStream(data);
      hash.on("finish", function () {
        resolve(hash.read());
      });
      hash.on("error", (e) => reject(e));
      input.pipe(hash).setEncoding("hex");
    } else {
      hash.setEncoding("hex").write(data);
      hash.end();
      resolve(hash.read());
    }
  });
};
