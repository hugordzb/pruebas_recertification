export const style = theme => ({
  system: {
    margin: "0 auto",
    padding: "2%",
    backgroundColor: "#929292",
    borderColor: "#929292",
    borderRadius: "0px",
    border: "2px solid",
    '&:hover': {
      backgroundColor: "#3f9dd5",
      borderColor: "#3f9dd5",
    }
  },
  systemTitle: {
    fontSize: "16px",
  },
  systemDescription: {

  },
  systemButton: {
    margin: "0 auto",
    padding: "2%",
    backgroundColor: "#929292",
    borderColor: "#3f9dd5",
    borderRadius: "30px",
    border: "2px solid",
    fontSize: "1.2vw",
    textTransform: "capitalize",
    '&:hover': {
      backgroundColor: "#3f9dd5",
      borderColor: "#ffffff",
    },
    systemIcon: {
      width: "5px"
    }
  }
});