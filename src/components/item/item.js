import React from 'react';
import { Col, Image } from 'react-bootstrap';

import folderImage from './folder.png';
import fileImage from './file.png';

const getSize = (sizeInBytes) => {
  const kb = sizeInBytes / 1024;
  if (kb >= 1024) return `${(kb / 1024).toFixed(2)}Mb`;
  return `${kb.toFixed(2)}Kb`;
};

const Item = ({ item, onClick }) => {
  const isDir = item.type === 'dir';
  const size = getSize(item.size);
  return (
    <Col xs={6} md={3}>
      <Image
        onClick={isDir ? () => onClick(item.path) : () => false}
        src={isDir ? folderImage : fileImage}
        rounded
        style={{
            position: 'relative',
            display: 'block',
            margin: '0 auto',
            cursor: isDir ? 'pointer' : 'default',
            height: '50px'
        }}
      />
      <span
          style={{
              position: 'relative',
              display: 'block',
              margin: '0 auto',
              cursor: isDir ? 'pointer' : 'default',
              textAlign: 'center',
              width: '180px'
          }}>
          {item.name}
          {isDir || <p>Size: {size}</p>}
      </span>

    </Col>
  );
};

export default Item; 
