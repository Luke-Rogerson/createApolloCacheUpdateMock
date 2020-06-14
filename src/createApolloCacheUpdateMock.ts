import { DataProxy } from 'apollo-cache'
import { FetchResult } from 'apollo-link'

interface CreateApolloCacheUpdateMock<QueryType, TData = any> {
    /** A jest mock that should return the full query result (meaning all the data needed to fulfill the querry was found in the cache) or null (meaning the cache _doesn't_ contain all data necessary and an error was thrown) */
    readQueryMock: jest.Mock<QueryType | null>
    /** A jest mock that you will use to check what is being written to the cache */
    writeQueryMock: jest.Mock
    /** The response from the mutation (if any) */
    mutationPayload?: FetchResult<TData>
}

export function createApolloCacheUpdateMock<QueryType, TData>({
    readQueryMock,
    writeQueryMock,
    mutationPayload,
}: CreateApolloCacheUpdateMock<QueryType, TData>) {
    const cache: DataProxy = {
        readFragment: jest.fn() as DataProxy['readFragment'],
        readQuery: readQueryMock as DataProxy['readQuery'],
        writeData: jest.fn() as DataProxy['writeData'],
        writeFragment: jest.fn() as DataProxy['writeFragment'],
        writeQuery: writeQueryMock as DataProxy['writeQuery'],
    }
    return { cache, mutationPayload }
}
