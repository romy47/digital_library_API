import { Types } from 'mongoose';
import { ISearch, ISearchInput } from '../models/search';
import { searchRepository } from '../repositories/search';
import fetch from 'cross-fetch';
import { DefaultConfig } from '../config';

class SearchService {
    async createSearch(searchQuery: string, offset: number, createdBy: Types.ObjectId): Promise<ISearch> {
        const settings = { method: "Get" };
        const domain = `https://api-na.hosted.exlibrisgroup.com/primo/v1/search?vid=${DefaultConfig.vid}&tab=Everything&scope=${DefaultConfig.scope}&`;
        const apiInfo = `apikey=${DefaultConfig.primo_api_key}&accept=application/json`;
        let query = '&q=' + searchQuery;
        query += '&offset=' + offset;
        const URL = domain + apiInfo + query;
        const result = await fetch(encodeURI(URL), settings).then(res => res.json())
        const totalDocuments = result.info.total;
        const search = await searchRepository.create(
            {
                searchQuery: searchQuery,
                totalDocuments: totalDocuments,
                createdBy: createdBy
            } as ISearchInput);
        result['_id'] = search._id;
        return result;
    }
}

export const searchService = new SearchService();
