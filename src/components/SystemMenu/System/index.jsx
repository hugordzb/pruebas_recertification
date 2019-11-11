import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        maxWidth: 345,
    },
  });

class System extends Component {

  redirectApp = () => {
    
  }
    render() {
        const { app } = this.props
        const { classes } = this.props;
        return(
            <Card className = { classes.root } >
                <CardActionArea>
                    <CardContent >
                        <Typography onClick={this.redirectApp()} gutterBottom variant="h4" component="h2">
                            {(app === "S004") ? "Recertificación" : app}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
    
}

export default withStyles(styles)(System)