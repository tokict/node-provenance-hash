declare module "node-provenance-hash" {
    function makeHash(foo: number): {
        imagesProvenanceHash:string,
        metadataProvenanceHash: string,
    };

    export default makeHash;
}