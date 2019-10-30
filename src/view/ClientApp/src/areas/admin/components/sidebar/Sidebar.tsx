import React from "react";
import {
  Theme,
  Hidden,
  makeStyles,
  createStyles,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Collapse
} from "@material-ui/core";
import PetsIcon from "@material-ui/icons/Pets";
import NoteAdd from "@material-ui/icons/NoteAdd";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { useLayout } from "../layout/useLayout";
import { LayoutState } from "../layout/types";
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

interface SidebarProps {
  links: {
    label: string;
    url: string;
  }[];
}

export const Sidebar: React.FC<SidebarProps> = () => {
  const layoutCtx = useLayout();
  const [open, setOpen] = React.useState(true);

  const classes = useStyles(layoutCtx.layout);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        <ListItem>
          <Button component={Link} to={"/admin"}>
            Home
          </Button>
        </ListItem>
        <ListItem button onClick={toggleMenu}>
          <ListItemIcon>
            <PetsIcon />
          </ListItemIcon>
          <ListItemText primary="Pets" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              className={classes.nested}
              component={Link}
              to={"/admin/pets/list"}
            >
              <ListItemIcon>
                <NoteAdd />
              </ListItemIcon>
              <ListItemText primary="List" />
            </ListItem>
            <ListItem
              button
              className={classes.nested}
              component={Link}
              to={"/admin/pets/register"}
            >
              <ListItemIcon>
                <NoteAdd />
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
          open={layoutCtx.layout.opened}
          onClose={() => layoutCtx.actions.setOpened(false)}
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
          classes={{
            paper: classes.drawerPaper
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};
