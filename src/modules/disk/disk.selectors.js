import { createSelector } from 'reselect';
import {NO_SUCH_FOLDER} from "./disk.constants";

export const getFolderPath = (path) => {
    const folderPath = path.slice(0, path.lastIndexOf('/'));
    return folderPath === 'disk:' ? `${folderPath}/` : folderPath;
};

export const getItems = createSelector(
    state => state.path,
    state => state.items,
    state => state.loading,
    (path, items, loading) => {
        if (!items[path] && loading) return [];
        if (items === NO_SUCH_FOLDER && !loading) return NO_SUCH_FOLDER;
        if (!items[path] && !loading) return 'ERROR';
        const folderPath = items[path].type === 'dir' ? path : getFolderPath(path);
        if (items[folderPath].nestedItems && items[folderPath].nestedItems.length) {
            return items[folderPath].nestedItems.map(id => items[id]);
        }
        if (loading) return [];
        return 'EMPTY';
    }
);
