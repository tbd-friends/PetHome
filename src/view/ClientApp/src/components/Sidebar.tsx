import React from "react";
import {
  Hidden,
  Drawer,
  makeStyles,
  Theme,
  createStyles,
  ListItem,
  List,
  ListItemIcon,
  Icon,
  ListItemText,
  Collapse
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { Link, useLocation } from "react-router-dom";

import { AppState, KnownActions } from "../store/types";
import { LayoutState, LayoutActionTypes } from "../store/Layout/types";

const useStyles = makeStyles<Theme, LayoutState>(theme =>
  createStyles({
    drawer: props => ({
      [theme.breakpoints.up("sm")]: {
        width: props.drawerWidth,
        flexShrink: 0
      }
    }),
    drawerPaper: props => ({
      width: props.drawerWidth
    }),
    nested: {
      paddingLeft: theme.spacing(4)
    },
    toolbar: theme.mixins.toolbar
  })
);

export interface SidebarItemProps {
  name: string;
  label: string;
  depth?: number;
  depthStep?: number;
  component?: any;
  to?: string;
  icon?: string;
  items?: SidebarItemProps[];
}

export interface SidebarProps {
  items: SidebarItemProps[];
}

export const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const layout = useSelector<AppState, LayoutState>(state => state.layout);
  const dispatch = useDispatch<Dispatch<KnownActions>>();
  const classes = useStyles(layout);

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List disablePadding dense>
        {items.map((sidebarItem, index) => (
          <SidebarItem
            key={`${sidebarItem.name}${index}`}
            {...sidebarItem}
            depth={1}
          />
        ))}
      </List>
    </div>
  );

  return (
    <nav className={classes.drawer} aria-label="Sidebar Menu">
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="left"
          open={layout.drawerOpened}
          onClose={() =>
            dispatch({
              type: LayoutActionTypes.SET_DRAWER_OPENED,
              payload: { opened: false }
            })
          }
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  items,
  depth = 0,
  depthStep = 10,
  icon,
  to,
  component,
  ...rest
}) => {
  const location = useLocation();
  const [opened, setOpened] = React.useState(false);
  return (
    <>
      {Array.isArray(items) ? (
        <ListItem
          button
          dense
          onClick={() => setOpened(!opened)}
          style={{ paddingLeft: depth * depthStep }}
        >
          {icon && (
            <ListItemIcon>
              <Icon>{icon}</Icon>
            </ListItemIcon>
          )}
          <ListItemText primary={label} />
          {opened ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
        </ListItem>
      ) : location.pathname === to ? (
        <ListItem
          dense
          {...rest}
          style={{ paddingLeft: depth * depthStep }}
          selected
        >
          {icon && (
            <ListItemIcon>
              <Icon>{icon}</Icon>
            </ListItemIcon>
          )}
          <ListItemText primary={label} />
        </ListItem>
      ) : (
        <ListItem
          button
          dense
          component={component}
          to={to}
          {...rest}
          style={{ paddingLeft: depth * depthStep }}
        >
          {icon && (
            <ListItemIcon>
              <Icon>{icon}</Icon>
            </ListItemIcon>
          )}
          <ListItemText primary={label} />
        </ListItem>
      )}

      {Array.isArray(items) ? (
        <Collapse in={opened} timeout="auto" unmountOnExit>
          <List disablePadding dense>
            {items.map(subItem => (
              <SidebarItem
                key={subItem.name}
                depth={depth + 1}
                depthStep={depthStep}
                {...subItem}
              />
            ))}
          </List>
        </Collapse>
      ) : null}
    </>
  );
};
