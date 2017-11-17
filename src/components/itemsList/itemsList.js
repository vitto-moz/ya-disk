import React from 'react';
import { Row } from 'react-bootstrap';
import Rx from 'rxjs/Rx';
import Item from '../item/item';
const ITEMS_IN_ROW = 4;

const ItemsList = ({ items, onClick }) => {

    let itemsRows = [];
    Rx.Observable.from(items)
        .bufferCount(ITEMS_IN_ROW)
        .map(items => itemsRows.push(items))
        .subscribe();

    return (<div>
        {
            itemsRows.map((items, index) => (
                <Row key={index}>
                    {items.map(
                        item => <Item
                            onClick={onClick}
                            key={item.path}
                            item={item}/>)}
                </Row>
            ))
        }
    </div>);
};

export default ItemsList;
