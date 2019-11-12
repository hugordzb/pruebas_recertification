const style = theme => ({
  root: {
    margin: "0",
    padding: "0",
    //backgroundImage: `url(${Image})`,
    width: "100%",
    height: "100vh",
    //color: "#ffffff"
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

export {
  style
}