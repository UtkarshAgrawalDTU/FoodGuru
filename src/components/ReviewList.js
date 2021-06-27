import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height : 400,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

function renderRow(props) {
  const classes = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));

  return (
    <ListItem alignItems="flex-start">
        <ListItemText
          primary= {props.review.rev}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Speciality
              </Typography> 
            </React.Fragment>
          }
        />
      </ListItem>
  );
}


renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

export default function VirtualizedList(props) {
  const classes = useStyles();
  const rows = props.reviews.map(item => renderRow(item))
  return (
    <div className={classes.root}>
        <FixedSizeList height={400} width={'auto'} itemSize={40} itemCount={200}>  
        <renderRow review = {props.reviews} />
      </FixedSizeList>
    </div>
  );
}


