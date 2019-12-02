import React from "react";
import {
  Hidden,
  Drawer,
  makeStyles,
  Theme,
  createStyles,
  ListItem,
  List,
  Button,
  ListItemIcon,
  Icon,
  ListItemText,
  Collapse
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { AppState, KnownActions } from "../store/types";
import { LayoutState, LayoutActionTypes } from "../store/Layout/types";
import { Dispatch } from "redux";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: (props: LayoutState) => ({
      [theme.breakpoints.up("sm")]: {
        width: props.drawerWidth,
        flexShrink: 0
      }
    }),
    drawerPaper: (props: LayoutState) => ({
      width: props.drawerWidth
    }),
    nested: (props: LayoutState) => ({
      paddingLeft: theme.spacing(4)
    }),
    toolbar: theme.mixins.toolbar
  })
);

interface SidebarItemProps {
  name: string;
  label: string;
  depth?: number;
  depthStep?: number;
  component?: any;
  to?: string;
  icon?: string;
  items?: SidebarItemProps[];
}

const sidebarLinks: SidebarItemProps[] = [
  {
    name: "home",
    label: "Home",
    component: Link,
    to: "/",
    icon: "home"
  },
  {
    name: "animals",
    label: "Animals",
    icon: "pets",
    items: [
      {
        name: "animal-list",
        label: "List",
        component: Link,
        to: "/animal/list",
        icon: "note_add"
      },
      {
        name: "animal-register",
        label: "Register",
        component: Link,
        to: "/animal/register",
        icon: "note_add"
      }
    ]
  }
];

export const Sidebar: React.FC = () => {
  const layout = useSelector<AppState, LayoutState>(state => state.layout);
  const dispatch = useDispatch<Dispatch<KnownActions>>();
  const classes = useStyles(layout);

  const [animalsOpened, setAnimalsOpened] = React.useState(true);

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List disablePadding dense>
        {sidebarLinks.map((sidebarItem, index) => (
          <SidebarItem key={`${sidebarItem.name}${index}`} {...sidebarItem} />
        ))}
      </List>
    </div>
  );

  const drawer2 = (
    <div>
      <div className={classes.toolbar} />
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <Icon>home</Icon>
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => setAnimalsOpened(!animalsOpened)}>
          <ListItemIcon>
            <Icon>pets</Icon>
          </ListItemIcon>
          <ListItemText primary="Animals" />
          {animalsOpened ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
        </ListItem>
        <Collapse in={animalsOpened} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              className={classes.nested}
              component={Link}
              to="/animal/list"
            >
              <ListItemIcon>
                <Icon>note_add</Icon>
              </ListItemIcon>
              <ListItemText primary="List" />
            </ListItem>
            <ListItem
              button
              className={classes.nested}
              component={Link}
              to="/animal/register"
            >
              <ListItemIcon>
                <Icon>note_add</Icon>
              </ListItemIcon>
              <ListItemText primary="Register" />
            </ListItem>
          </List>
        </Collapse>
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
  ...rest
}) => {
  return (
    <>
      <ListItem button dense {...rest}>
        {icon && (
          <ListItemIcon>
            <Icon>{icon}</Icon>
          </ListItemIcon>
        )}
        <ListItemText
          style={{ paddingLeft: depth * depthStep }}
          primary={label}
        />
      </ListItem>
      {Array.isArray(items) ? (
        <List disablePadding dense>
          {items.map(subitem => (
            <SidebarItem
              key={subitem.name}
              depth={depth + 1}
              depthStep={depthStep}
              {...subitem}
            />
          ))}
        </List>
      ) : null}
    </>
  );
};
