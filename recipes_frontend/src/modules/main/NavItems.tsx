import React from "react";
import { Link, useLocation } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListAltIcon from "@material-ui/icons/ListAlt";
import CreateIcon from "@material-ui/icons/Create";
import PublishIcon from "@material-ui/icons/Publish";
import EventNoteIcon from "@material-ui/icons/EventNote";

type Page = { route: string; title: string, icon: JSX.Element };

const NavItems = () => {
  const currentPath = useLocation().pathname;
  const pages: Page[] = [
    { route: "/", title: "Alle Rezepte", icon: <ListAltIcon color="secondary" /> },
    { route: "/create", title: "Neues Rezept", icon: <CreateIcon color="secondary" /> },
    { route: "/import", title: "Rezept Import", icon: <PublishIcon color="secondary" /> },
    { route: "/weekplan", title: "Wochenplan", icon: <EventNoteIcon color="secondary" /> },
  ];

  return (
    <div>
      {pages.map((page) => (
        <ListItem
          key={page.route}
          component={Link}
          to={page.route}
          selected={currentPath === page.route}
          button
        >
          <ListItemIcon>
            {page.icon}
          </ListItemIcon>
          <ListItemText primary={page.title} />
        </ListItem>
      ))}
    </div>
  );
}

export default NavItems;
