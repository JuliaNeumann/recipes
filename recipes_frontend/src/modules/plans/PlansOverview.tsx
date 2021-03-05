import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Checkbox,
  withStyles,
  WithStyles,
  createStyles,
  Theme,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Link,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link as RouterLink } from "react-router-dom";
import { Plan, Meal } from "helpers/interfaces";
import { getAllPlans, updateMealDone, deletePlan } from "services/api";

const styles = (theme: Theme) => createStyles({
  root: {
    width: "100%",
  },
  summary: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    '&:focus': {
      backgroundColor: theme.palette.primary.light,
    }
  },
  details: {
    display: "block",
    position: "relative"
  },
  recipe_done: {
    textDecoration: "line-through",
  },
  delete_button: {
    position: "absolute",
    right: 0,
    bottom: 0,
  }
});

interface PlansOverviewProps extends WithStyles<typeof styles> { }

const PlansOverview = ({ classes }: PlansOverviewProps) => {
  const [plans, setPlans] = useState([] as Plan[]);
  const [expanded, setExpanded] = React.useState(-1);

  const getPlans = async () => {
    const plans = await getAllPlans();
    if (plans.length) {
      setPlans(plans);
      setExpanded(plans[0].id);
    }
  }

  useEffect(() => {
    getPlans();
  }, []);

  const handleAccordionChange = (panel: number) => (
    event: ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : -1);
  };

  const handleDoneChange = (meal: Meal) => async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    await updateMealDone(meal, event.target.checked);
    getPlans();
  };

  const handleDeletePlan = async (id: number) => {
    await deletePlan(id);
    getPlans();
  }

  return (
    <div className={classes.root}>
      <Typography gutterBottom variant="h5">
        Wochenplan
      </Typography>
      {plans.map((plan) => (
        <Accordion
          key={plan.id}
          expanded={expanded === plan.id}
          onChange={handleAccordionChange(plan.id)}
        >
          <AccordionSummary className={classes.summary} classes={{
            focused: classes.summary
          }}>
            <Typography>{new Date(plan.created).toLocaleString().split(',')[0]}</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            {plan.comment && (
              <Typography component="p" paragraph={true}>
                <em>{plan.comment}</em>
              </Typography>
            )}
            {plan.meal_set.map((meal) => (
              <div key={meal.id}>
                <Checkbox
                  checked={meal.done}
                  onChange={handleDoneChange(meal)}
                />
                <Link
                  className={meal.done ? classes.recipe_done : ""}
                  component={RouterLink}
                  to={`/recipe/${meal.recipe_id}`}
                  color="secondary"
                >
                  {meal.title}
                </Link>
              </div>
            ))}
            <IconButton className={classes.delete_button} aria-label="delete" onClick={() => handleDeletePlan(plan.id)}>
              <DeleteIcon color="secondary" />
            </IconButton>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default withStyles(styles)(PlansOverview);
