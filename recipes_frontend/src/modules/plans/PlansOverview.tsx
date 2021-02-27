import React, { ChangeEvent, useEffect, useState } from "react";
import {
  withStyles,
  WithStyles,
  createStyles,
  Theme,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Link,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { Plan, Meal } from "helpers/interfaces";
import { getAllPlans, updateMealDone } from "services/api";
import { Checkbox } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    summary: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
    },
    details: {
      display: "block",
    },
    recipe_done: {
      textDecoration: "line-through",
    },
  });

interface PlansOverviewProps extends WithStyles<typeof styles> {}

const PlansOverview = ({ classes, ...props }: PlansOverviewProps) => {
  const [plans, setPlans] = useState([] as Plan[]);
  const [expanded, setExpanded] = React.useState(-1);

  useEffect(() => {
    async function getPlans() {
      const plans = await getAllPlans();
      if (plans.length) {
        setPlans(plans);
        setExpanded(plans[0].id);
      }
    }
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
    const plans = await updateMealDone(meal, event.target.checked);
    if (plans.length) {
      setPlans(plans);
    }
  };

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
          <AccordionSummary className={classes.summary}>
            <Typography>{plan.created}</Typography>
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
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default withStyles(styles)(PlansOverview);
