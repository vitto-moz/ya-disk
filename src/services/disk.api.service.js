import { normalize, schema } from 'normalizr';

const BASE_URL_API = 'https://cloud-api.yandex.net:443/v1/disk';

const items = new schema.Entity('items', {}, { idAttribute: 'path' });
const apiResponse = new schema.Entity('items', {
    _embedded: {
        items: new schema.Array(items)
    }
}, { idAttribute: 'path' });

export default class DiskApiService {

    static getFolderItems = folderPath => {
        const token = localStorage.getItem('token');
        const searchParams = new URLSearchParams();
        searchParams.append('fields', '_embedded, name, path, size, type');
        searchParams.append('path', folderPath);
        return fetch(`${BASE_URL_API}/resources?${searchParams.toString()}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `OAuth ${token}`
            }
        })
            .then(
                res => {
                    if (res.status !== 200) throw new Error('BAD REQUEST');
                    else return res.json();
                }
            )
            .then(json => normalize(json, apiResponse))
            .then((data) => {
                const newItemsValues = Object.values(data.entities.items).map((item) => {
                    const { name, type, size, path } = item;
                    const nestedItems = item._embedded ? item._embedded.items : null;
                    return { path, name, size, type, nestedItems };
                });

                const newItems = {};
                newItemsValues.forEach( itemValue =>  newItems[itemValue.path] = itemValue );
                return {
                    result: data.result,
                    entities: { ...data.entities, items: newItems }
                };
            })
    }
}