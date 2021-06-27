import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: '#F1ECE9',
  },
  gridList: {
    width: 'auto',
    height: 'auto',
    maxHeight : '500px',
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function ImageGridList(props) {
  const classes = useStyles();
  const images = props.images;

  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {images.map((image) => (
          <GridListTile key={Math.random().toString(36).substring(7)} cols={1}>
            <img src={image} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
