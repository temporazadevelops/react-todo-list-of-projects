import ProjectSidebar from "./components/ProjectSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";
import { useState } from "react";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  const handleAddTasks = (taskDescription) => {
    setProjectState((prevProjectState) => {
      const newTask = {
        text: taskDescription,
        projectId: prevProjectState.selectedProjectId,
        id: Math.random(),
      };

      return {
        ...prevProjectState,
        tasks: [...prevProjectState.tasks, newTask],
      };
    });
  };

  const handleDeleteTask = (id) => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  };

  const handleStartAddProject = () => {
    setProjectState((prevProjectState) => {
      return { ...prevProjectState, selectedProjectId: null };
    });
  };

  const handleSelectProject = (id) => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  };

  const handleCancelProject = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  };

  const handleDeleteProject = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId,
        ),
      };
    });
  };

  const handleAddProject = (projectData) => {
    setProjectState((prevProjectState) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };

      return {
        ...prevProjectState,
        selectedProjectId: undefined,
        projects: [...prevProjectState.projects, newProject],
      };
    });
  };

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId,
  );

  const filteredTasks = projectState.tasks.filter(
    (task) => task.projectId === projectState.selectedProjectId,
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDeleteProject={handleDeleteProject}
      onAddTasks={handleAddTasks}
      onDeleteTask={handleDeleteTask}
      tasks={filteredTasks}
    />
  );
  if (projectState.selectedProjectId === null) {
    content = (
      <NewProject
        onAdd={handleAddProject}
        onCancelProject={handleCancelProject}
      />
    );
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
