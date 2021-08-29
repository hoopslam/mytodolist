import { makeStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List"; //ul tag
import ListItem from "@material-ui/core/ListItem"; //li tag
import ListItemIcon from "@material-ui/core/ListItemIcon"; //li content
import ListItemText from "@material-ui/core/ListItemText"; //li content
import SubjectOutlined from "@material-ui/icons/SubjectOutlined";
import AddCircleOutlined from "@material-ui/icons/AddCircleOutlined";
import { useHistory, useLocation } from "react-router";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";
import { format } from "date-fns";

const WIDTH = 240;

const useStyles = makeStyles((theme) => {
  return {
    pageLayout: {
      background: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(3),
    },
    drawer: {
      width: WIDTH,
    },
    drawerPaper: {
      width: WIDTH,
    },
    root: {
      display: "flex",
    },
    active: {
      background: "#f4f4f4",
    },
    title: {
      padding: theme.spacing(2),
    },
    appbar: {
        width: `calc(100% - ${WIDTH}px)`
    },
    toolbar: theme.mixins.toolbar,
    date: {
        flexGrow: 1
    },
    avatar: {
        marginLeft: theme.spacing(2)
    }
  }
});

const Layout = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    {
      text: "My Notes",
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Create Note",
      icon: <AddCircleOutlined color="secondary" />,
      path: "/create",
    },
  ];

  return (
    <div className={classes.root}>
        <AppBar className={classes.appbar} elevation={0}>
            <Toolbar> 
                <Typography className={classes.date} variant="h5" component="h1">
                    {format(new Date(), "MMMM do Y")}
                </Typography>
                <Typography variant="h5" component="h2">
                    David's Todo List
                </Typography>
                <Avatar className={classes.avatar} src="/images/avatar.png" />
            </Toolbar>
        </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <Typography variant="h5" component="h2" className={classes.title}>
          Notes
        </Typography>
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              button
              className={
                location.pathname === item.path ? classes.active : null
              }
              onClick={() => history.push(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.pageLayout}>
           <div className={classes.toolbar}></div>
           {children}
      </div>
    </div>
  );
};

export default Layout;