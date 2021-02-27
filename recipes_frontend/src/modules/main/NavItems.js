import React from "react";
import { Link, useLocation } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListAltIcon from "@material-ui/icons/ListAlt";
import CreateIcon from "@material-ui/icons/Create";
import PublishIcon from "@material-ui/icons/Publish";
import EventNoteIcon from "@material-ui/icons/EventNote";

function NavItems() {
  const currentPath = useLocation().pathname;

  return (
    <div>
      <ListItem component={Link} to="/" selected={currentPath === "/"} button>
        <ListItemIcon>
          <ListAltIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="Alle Rezepte" />
      </ListItem>
      <ListItem
        component={Link}
        to="/create"
        selected={currentPath === "/create"}
        button
      >
        <ListItemIcon>
          <CreateIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="Neues Rezept" />
      </ListItem>
      <ListItem
        component={Link}
        to="/import"
        selected={currentPath === "/import"}
        button
      >
        <ListItemIcon>
          <PublishIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="Rezept Import" />
      </ListItem>
      <ListItem
        component={Link}
        to="/weekplan"
        selected={currentPath === "/weekplan"}
        button
      >
        <ListItemIcon>
          <EventNoteIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="Wochenplan" />
      </ListItem>
    </div>
  );
}

export default NavItems;
