import React, { Component } from 'react';
import { Dropdown, MenuItem, FormControl } from 'react-bootstrap';
import _ from 'lodash';

const MENU_ITEMS = ['Test1', 'Test2', 'Test3', 'Test4', 'Test5'];

class MultiselectMenu extends Component {
  constructor(props, context) {
    super(props, context);
    this.props = props;
    this.state = {
      menuItems: _.map(MENU_ITEMS, (item) => { return({ innerText: item, className: '' }); }),
      menuValue: null
    }
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick(e) {
    const newMenuItems = _.map(this.state.menuItems, (item, key) => {
      if (item.innerText === e.target.innerText) {
        item.className = item.className === '' ? 'active' : '';
      }
      return item;
    });
    this.setState({ menuItems: newMenuItems });

    const activeMenuItems = _.filter(newMenuItems, { className: 'active' });
    const newMenuValue = activeMenuItems.length > 0 ? activeMenuItems.map((i) => { return(i.innerText) }).join(', ') : null;
    this.setState({ menuValue: newMenuValue });
  }

  render() {
    const menuTitle = this.state.menuValue ? this.state.menuValue : 'Select a status...';
    return(
      <div>
        <Dropdown id="dropdown-multiselect-menu">
          <Dropdown.Toggle href="#">{menuTitle}</Dropdown.Toggle>
          <ul className='dropdown-menu' bsRole="menu">
              {this.state.menuItems.map((item) => {
                return (
                  <MenuItem className={item.className} onClick={this.handleMenuClick}>
                    <input type='checkbox' checked={(item.className === 'active' ? 'checked' : '')} />
                    <span>{item.innerText}</span>
                  </MenuItem>
                );
              })}
          </ul>
        </Dropdown>
        <FormControl type='hidden' name='formMultiselectMenu' value={this.state.menuValue} />
      </div>
    );
  }
}

export default MultiselectMenu;
