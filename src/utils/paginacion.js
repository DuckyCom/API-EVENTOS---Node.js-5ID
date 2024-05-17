// function generarLimitOffset(pageSize, page) {
//     if (!pageSize || !page || pageSize <= 0 || page <= 0) {
//         throw new Error('El tamaño de página y el número de página son obligatorios y deben ser mayores que cero.');
//     }
//     const offset = (page - 1) * pageSize;
//     const limitOffsetClause = `LIMIT ${pageSize} OFFSET ${offset}`;
//     return limitOffsetClause;
// }

// export default generarLimitOffset;

export class PaginationDto{
    limit;
    offset;
    nextPage;
    total;
}

export class Pagination{
    static ParseLimit(limit) {
        return !isNaN(limit) && limit > 0 ? limit : 10;
    }

    static ParseOffset(offset) {
        return !isNaN(offset) ? offset : 0;
    }

    static BuildPagination(collection, limit, offset, url, total){
        return {
            collection: collection,
            pagination: {
                limit: limit, 
                offset: offset,
                nextPage: (offset+1)*limit < total ? (!url.includes("offset") ? (url.includes("limit") ? url.concat("&offset=" + (offset+1)) : url.concat("offset=" + (offset+1))): `${process.env.BASE_URL}${url.replace(/(offset=)\d+/, 'offset=' + (parseInt(offset) + 1))}`):null,
                total: total
            }
        };
        
    }

}

// const response = {
// collection: events,
// pagination: {
//     limit: parsedLimit ,
//     offset: parsedOffset,
//     nextPage:((parsedOffset + 1) * parsedLimit <= totalCount) ? `${ process.env.BASE_URL} / ${ path } ?limit= ${ parsedLimit } &offset= ${ parsedOffset + 1 }${ ( eventName ) ? `&eventName= ${ eventName } ` : null}${ ( eventCategory ) ? `&eventCategory= ${ eventCategory } ` : null} ${ ( eventDate ) ? `&eventDate= ${ eventDate } ` : null}${ ( eventTag ) ? `&eventTag= ${ eventTag } ` : null} ` : null , 
//     total: totalCount
//     }
// }




