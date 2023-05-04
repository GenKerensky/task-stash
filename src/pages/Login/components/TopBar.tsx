import { Grid, Typography } from "@suid/material";
import { JSX } from "solid-js";

export type TopBarProps = {
  title: string;
  leftButton?: JSX.Element;
  rightButton?: JSX.Element;
};

const TopBar = (props: TopBarProps) => (
  <Grid
    container
    sx={{
      borderBottom: "1px solid",
      borderColor: "primary.main",
      padding: 1,
    }}
  >
    <Grid item xs={2}>
      {props.leftButton}
    </Grid>
    <Grid flexGrow={1}>
      <Typography variant="h2" fontSize={32} textAlign="center">
        {props.title}
      </Typography>
    </Grid>
    <Grid item xs={2}>
      {props.rightButton}
    </Grid>
  </Grid>
);

export default TopBar;
