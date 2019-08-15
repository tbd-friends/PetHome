import React from "react";
import {
  Theme,
  Hidden,
  makeStyles,
  createStyles,
  Drawer,
  List,
  ListItem,
  Button
} from "@material-ui/core";
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
  const classes = useStyles(layoutCtx.layout);

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        <ListItem>
          <Button component={Link} to={"/admin"}>
            Home
          </Button>
        </ListItem>
        <ListItem>
          <Button component={Link} to={"/admin/pets"}>
            Pets
          </Button>
        </ListItem>
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
