import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import AsyncSelect from 'react-select/lib/Async';
import { connect } from 'react-redux';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import { TextValidator } from 'react-material-ui-form-validator';
import messageActions from '../../actions/messageActions';
import UserService from '../../services/UserService';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: '15px',
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light'
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

function NoOptionsMessage({ selectProps, innerProps, children }) {
  return (
    <Typography
      color="textSecondary"
      className={selectProps.classes.noOptionsMessage}
      {...innerProps}
    >
      {children}
    </Typography>
  );
}

NoOptionsMessage.propTypes = {
  selectProps: PropTypes.object.isRequired,
  innerProps: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
};

const inputComponent = ({ inputRef, ...props }) => (
  <div ref={inputRef} {...props} />
);

inputComponent.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

const Control = ({ selectProps, innerRef, children, innerProps }) => (
  <TextValidator
    fullWidth
    name="message-users"
    validators={['multiSelectNotEmpty']}
    errorMessages={['this field is required']}
    InputProps={{
      inputComponent,
      inputProps: {
        className: selectProps.classes.input,
        inputRef: innerRef,
        children,
        ...innerProps,
      },
    }}
    {...selectProps.textFieldProps}
  />
);

Control.propTypes = {
  selectProps: PropTypes.object.isRequired,
  innerRef: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired,
  innerProps: PropTypes.object.isRequired,
};

const Option = ({ innerRef, isFocused, isSelected, innerProps, children }) => (
  <MenuItem
    buttonRef={innerRef}
    selected={isFocused}
    component="div"
    style={{
      fontWeight: isSelected ? 500 : 400,
    }}
    {...innerProps}
  >
    {children}
  </MenuItem>
);

Option.propTypes = {
  innerRef: PropTypes.object.isRequired,
  isFocused: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  innerProps: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
};

const Placeholder = ({ selectProps, innerProps, children }) => (
  <Typography
    color="textSecondary"
    className={selectProps.classes.placeholder}
    {...innerProps}
  >
    {children}
  </Typography>
);

Placeholder.propTypes = {
  selectProps: PropTypes.object.isRequired,
  innerProps: PropTypes.object,
  children: PropTypes.string.isRequired,
};

Placeholder.defaultProps = {
  innerProps: {},
};

const SingleValue = ({ selectProps, innerProps, children }) => (
  <Typography className={selectProps.classes.singleValue} {...innerProps}>
    {children}
  </Typography>
);

SingleValue.propTypes = {
  selectProps: PropTypes.object.isRequired,
  innerProps: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
};

const ValueContainer = ({ selectProps, children }) => (
  <div className={selectProps.classes.valueContainer}>{children}</div>
);

ValueContainer.propTypes = {
  selectProps: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
};

const MultiValue = ({
  removeProps,
  selectProps,
  data,
  children,
  isFocused,
}) => (
  <Chip
    tabIndex={-1}
    key={data.value}
    label={children}
    className={classNames(selectProps.classes.chip, {
      [selectProps.classes.chipFocused]: isFocused,
    })}
    onDelete={event => {
      removeProps.onClick();
      removeProps.onMouseDown(event);
    }}
  />
);

MultiValue.propTypes = {
  removeProps: PropTypes.func.isRequired,
  selectProps: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
  isFocused: PropTypes.bool.isRequired,
};

const Menu = ({ selectProps, innerProps, children }) => (
  <Paper square className={selectProps.classes.paper} {...innerProps}>
    {children}
  </Paper>
);

Menu.propTypes = {
  selectProps: PropTypes.object.isRequired,
  innerProps: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
};

const components = {
  Option,
  Control,
  NoOptionsMessage,
  Placeholder,
  SingleValue,
  MultiValue,
  ValueContainer,
  Menu,
};

const promiseOptions = inputValue =>
  new Promise(async resolve => {
    const result = await UserService.getUsers(inputValue);
    if (result.length) {
      return resolve(
        result.map(res => ({
          label: res.Username,
          value: res.ID,
        }))
      );
    }
    return resolve([]);
  });

class MultiSelect extends Component {
  onChange = users => {
    const { dispatch } = this.props;
    const formatted = users.map(user => ({
      ID: user.value,
      Username: user.label,
    }));
    dispatch(messageActions.updateMessageUsers(formatted));
  };

  render() {
    const { classes, theme, messageUsers } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
      }),
    };

    const users = messageUsers.map(user => ({
      value: user.ID,
      label: user.Username,
    }));

    return (
      <div className={classes.root}>
        <AsyncSelect
          classes={classes}
          styles={selectStyles}
          textFieldProps={{
            label: 'Select some users',
            InputLabelProps: {
              shrink: true,
            },
          }}
          value={users}
          isMulti
          autoFocus
          onChange={this.onChange}
          components={components}
          placeholder="Type here"
          loadOptions={promiseOptions}
        />
      </div>
    );
  }
}

MultiSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  messageUsers: PropTypes.arrayOf(PropTypes.object),
};

MultiSelect.defaultProps = {
  messageUsers: [],
};

function mapStateToProps(state) {
  return {
    messageUsers: state.messageUsers,
  };
}

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(MultiSelect)
);
