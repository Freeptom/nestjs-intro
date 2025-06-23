import { Injectable, Inject } from '@nestjs/common';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { FindOptionsRelations, ObjectLiteral, Repository } from 'typeorm';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { Paginated } from '../interfaces/paginated.interface';

@Injectable()
export class PaginationProvider {
  constructor(
    /**
     * Injecting request
     */
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}
  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
    relations?: FindOptionsRelations<T>,
  ): Promise<Paginated<T>> {
    const results = await repository.find({
      relations,
      take: paginationQuery.limit,
      skip:
        paginationQuery?.page && paginationQuery?.limit
          ? (paginationQuery.page - 1) * paginationQuery.limit
          : undefined,
    });
    /**
     * Create the request urls
     */
    const baseURL = `${this.request.protocol}://${this.request.headers.host}/`;
    const newURL = new URL(this.request.url, baseURL);

    /**
     * Calculating the page numbers
     */
    const limit = paginationQuery.limit ?? 10;
    const page = paginationQuery.page ?? 1;

    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / limit);

    const nextPage = page >= totalPages ? page : page + 1;
    const previousPage = page <= 1 ? page : page - 1;

    const response: Paginated<T> = {
      data: results,
      meta: {
        itemsPerPage: limit,
        totalItems,
        currentPage: page,
        totalPages,
      },
      links: {
        first: `${newURL.origin}${newURL.pathname}?limit=${limit}&page=1`,
        last: `${newURL.origin}${newURL.pathname}?limit=${limit}&page=${totalPages}`,
        current: `${newURL.origin}${newURL.pathname}?limit=${limit}&page=${page}`,
        next: `${newURL.origin}${newURL.pathname}?limit=${limit}&page=${nextPage}`,
        previous: `${newURL.origin}${newURL.pathname}?limit=${limit}&page=${previousPage}`,
      },
    };
    return response;
  }
}
