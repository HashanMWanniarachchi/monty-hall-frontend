import { QueryClientProvider, QueryClient } from "react-query";
import classes from "./Simulation.module.css";
import SimulationForm from "./SimulationForm";

const queryClient = new QueryClient();

const Simulation = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={classes.wrapper}>
        <section className={classes.left}>
          <SimulationForm />
        </section>
      </div>
    </QueryClientProvider>
  );
};

export default Simulation;
