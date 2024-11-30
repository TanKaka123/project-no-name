import { withPrivateRoute } from "@/hocs/withPrivateRoute";

const Dashboard = () => {
  return <div>Welcome to your dashboard!</div>;
};

export default withPrivateRoute(Dashboard);
