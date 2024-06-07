import "dotenv/config";

const BASE_URL = process.env.BASE_URL;

export class PaginationDto {
  constructor(limit, offset, nextPage, total) {
    this.limit = limit;
    this.offset = offset;
    this.nextPage = nextPage;
    this.total = total;
  }
}
export class Pagination {
  constructor() {
    this.limitRegex = /limit=\d+/;
    this.offsetRegex = /offset=\d+/;
  }

  parseLimit(limit) {
    return !isNaN(parseInt(limit)) ? parseInt(limit) : 2; //Modificar para que hayan mas elementos en una "pagina"
  }

  parseOffset(offset) {
    return !isNaN(parseInt(offset)) ? parseInt(offset) : 0; //No modificar, ya que esta seria la primera pagina
  }

  buildPaginationDto(limit, currentOffset, total, path, basePath) {
    // console.log("PseudoUrl", BASE_URL + basePath + path)
    // console.log("Limit", limit)
    // console.log("CurrentOffset", currentOffset)
    // console.log("Total", total)
    // console.log(limit !== -1 && limit + currentOffset < total)
    const nextPage =
      limit !== -1 && limit + currentOffset < total
        ? this.buildNextPage(path, limit, currentOffset, basePath) : null;
    console.log("Llego aca??????");
    return new PaginationDto(limit, currentOffset, nextPage, total);
  }

  buildNextPage(path, limit, currentOffset, basePath) {
    let url = BASE_URL + basePath + path;
    console.log("Base", BASE_URL)
    console.log("url", url)
    url = this.limitRegex.test(url)
      ? url.replace(this.limitRegex, `limit=${limit}`)
      : `${url}${url.includes("?") ? "&" : "?"}limit=${limit}`;

    url = this.offsetRegex.test(url)
      ? url.replace(this.offsetRegex, `offset=${currentOffset + limit}`)
      : `${url}${url.includes("?") ? "&" : "?"}offset=${currentOffset + limit}`;

    return url;
  }
}
