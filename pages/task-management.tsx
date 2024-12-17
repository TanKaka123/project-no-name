import { withPrivateRoute } from "@/hocs/withPrivateRoute";
import { TaskManagement as TaskManagement1  } from "@/components/common/taskManagement/index"

const TaskManagement = () => {
  return <div>
      <TaskManagement1 />
  </div>;
};

export default withPrivateRoute(TaskManagement);
