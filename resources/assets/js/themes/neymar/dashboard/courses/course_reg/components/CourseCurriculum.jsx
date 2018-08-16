//Thiết kế giáo trình
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

/*import component*/
import ThemeContext from '../../../../configs/context';

const columnData = [
  { id: 'count', label: 'Bài học' },
  { id: 'name',  label: 'Tên bài giảng' },
  { id: 'time',  label: 'Thời lượng' },
  { id: 'desc',  label: 'Mô tả' }
];

class EnhancedTableHead extends React.Component {

  render() {
    const { onSelectAllClick, numSelected, rowCount} = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
              >
              {column.label}
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    width:'100%'
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes ,addNewRow , deleteRows } = props;

  return (
    <ThemeContext.Consumer>
      {
        context=>
        <Toolbar
          className={classNames(classes.root, {
            [classes.highlight]: numSelected > 0,
          })}
        >
          <div className={classes.title}>
            {numSelected > 0 ? (
              <Typography color="inherit" variant="subheading">
                {numSelected} selected
              </Typography>
            ) : (
              <Typography variant="title" id="tableTitle">
                {context.txt_input_control.course_reg.curriculumn.title}
              </Typography>
            )}
          </div>
          <div className={classes.spacer} />
          <div className={classes.actions}>
            {numSelected > 0 ? (
              <Tooltip title={context.txt_input_control.course_reg.curriculumn.tooltip_del}>
                <IconButton aria-label="Delete" onClick={deleteRows}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title={context.txt_input_control.course_reg.curriculumn.tooltip_add}>
                <IconButton aria-label="Filter list" onClick={addNewRow}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
            )}
          </div>
        </Toolbar>
      }
  </ThemeContext.Consumer>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    maxWidth: '100%',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class CourseCurriculum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      data: []
    };
  }

  handleSelectAllClick(event, checked){
    if (checked) {
      this.setState({selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick(event, id) {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  isSelected(id){this.state.selected.indexOf(id) !== -1;}

  addNewRow(){
    this.setState({
      data:[...this.state.data,
        {
          id:Date.now(),
          name:'',
          time:0,
          desc:''
        }
      ]
    })
  }

  forcusOut(event,type,id){
      const {data} = this.state;
      var newData = data;
      newData.map(n=>{
        if(n.id === id){
          switch (type) {
            case 'change_name':
              n.name = event.target.value;
              break;
            case 'change_time':
              n.time = event.target.value;
              break;
            case 'change_desc':
              n.desc = event.target.value;
              break;
          }
        }

        return n;
      });
      this.setState({
        data:newData
      })
  }

  deleteRows(){
      const { selected,data } = this.state;
      var newArray = data;

      for(var i=0 ; i< selected.length ; i++){
         newArray = newArray.filter(obj=>{
           return obj.id!==selected[i]
         })

      }
      this.setState({
        data:newArray,
        selected:[]
      })
  }

  render() {
    const { classes } = this.props;
    const { data, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <ThemeContext.Consumer>
        {
          context =>
          <div className={classes.root}>
            <EnhancedTableToolbar deleteRows = {this.deleteRows} addNewRow={this.addNewRow} numSelected={selected.length} />
            <div className={classes.tableWrapper}>
              <Table className={classes.table}>
                <EnhancedTableHead
                  numSelected={selected.length}
                  onSelectAllClick={this.handleSelectAllClick}
                  onRequestSort={this.handleRequestSort}
                  rowCount={data.length}
                />
                <TableBody>
                  {data
                    .map((n,k) => {
                      const isSelected = this.isSelected(n.id);
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isSelected}
                          tabIndex={-1}
                          key={n.id}
                          selected={isSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={isSelected}     onClick={event => this.handleClick(event, n.id)} />
                          </TableCell>
                          <TableCell>{context.txt_input_control.base.lesson} {k+1}</TableCell>
                          <TableCell>
                            <TextField
                              fullWidth
                              onBlur={event=>this.forcusOut(event,'change_name',n.id)}
                              defaultValue={n.name}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={this.state.weight}
                              type="number"
                              onBlur={event=>this.forcusOut(event,'change_time',n.id)}
                              endAdornment={<InputAdornment position="end">{context.txt_input_control.base.min}</InputAdornment>}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              multiline
                              fullWidth
                              onBlur={event=>this.forcusOut(event,'change_desc',n.id)}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 49 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        }
    </ThemeContext.Consumer>
    );
  }
}

CourseCurriculum.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CourseCurriculum);
