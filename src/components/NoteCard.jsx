import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core";
import { green, yellow, cyan, blue } from "@material-ui/core/colors";

const useStyles = makeStyles({
    avatar: {
      backgroundColor: (note) => {
        if (note.category === "reminders") {
          return cyan[600]
        }
        if (note.category === "ideas") {
          return yellow[700]
        }
        if (note.category === "misc") {
          return green[600]
        }
        return blue[500]        
      }
    }
})

const NoteCard = ({ note, handleDelete }) => {

    const classes = useStyles(note)

  return (
    <Card elevation={3}>
      <CardHeader
        avatar={<Avatar className={classes.avatar}>
          {note.category[0].toUpperCase()}
        </Avatar>}
        action={
          <IconButton aria-label="card-settings" onClick={() => handleDelete(note.id)}>
            <DeleteOutlined />
          </IconButton>
        }
        title={note.title}
        subheader={note.category}
      />
      <CardContent>
        <Typography variant="body2" color="TextSecondary">
          {note.details}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
