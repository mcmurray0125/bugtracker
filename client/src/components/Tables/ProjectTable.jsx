import {useEffect, useState} from "react";
import { SyncLoader } from "react-spinners"
import { ToastContainer, toast } from "react-toastify"
import {
    Table,
    Button,
    Modal,
    ModalHeader,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Pagination,
    PaginationItem,
    PaginationLink
} from "reactstrap"

import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext";

import UsersCell from "./UsersCell";
import API from "../../utilities/API";
import "../../assets/css/tables.css"
import CreateProject from "../Forms/CreateProject";
import EditProject from "../Forms/EditProject";

export default function ProjectTable() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
    const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [selectedProjectData, setSelectedProjectData] = useState([]);
    const [selectedProjectTeam, setSelectedProjectTeam] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const startIndex = (currentPage - 1) * 4;
    const endIndex = startIndex + 4;
    const { rootPath } = useAuth();

    const toggleNewProject = () => setIsNewProjectOpen(!isNewProjectOpen);
    const toggleEditProject = () => setIsEditProjectOpen(!isEditProjectOpen);
    const selectProject = (event) => setSelectedProjectId(event.target.id);
    const resetProjectId = () => setSelectedProjectId(null);

    //Fetch All Projects
    useEffect(() => {
        async function fetchProjects() {
            try {
            const projectsData = await API.getProjects();
            setProjects(projectsData);
            setLoading(false);
            } catch (error) {
            console.log(error);
            setLoading(false);
            }
        }
    
        fetchProjects();
    }, [isNewProjectOpen, selectedProjectId]);

    //Fetch Selected Project
    useEffect(() => {
    let isRendered = true;
    async function fetchProject() {
        if (selectedProjectId) {
        try {
            const [projectData, projectTeam] = await Promise.all([
            API.getProject(selectedProjectId),
            API.getProjectUsers(selectedProjectId),
            ]);

            if (isRendered === true) {
            // const projectData = await API.getProject(selectedProjectId);
            setSelectedProjectTeam(projectTeam.map((user) => user.user_id));
            setSelectedProjectData(projectData);

            // const projectTeam = await API.getProjectUsers(selectedProjectId);
            }
        } catch (err) {
            console.log(err);
        }
        }
    }
    
    fetchProject();

    return () => {
        isRendered = false;
    };
    }, [selectedProjectId]);

    const deleteProject = async (projectId) => {
        if (projectId == 1) {
            toast.error(`This special project cannot be deleted.`, {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        } else {
            try {
              await API.deleteProject(projectId);
              await API.getProjects().then((json) => {
                setProjects(json);
              });
            } catch (err) {
              console.log(err);
            }

            console.log("Project deleted");
        }
      };

    // Pagination
    useEffect(() => {
        let calculatedPages = Math.ceil(projects.length / 4);
        setTotalPages(calculatedPages);
    }, [projects]);

    useEffect(() => {
        setCurrentPage(1);
    }, [totalPages]);

    let items = [];
    const paginate = (number) => setCurrentPage(number);

    for (let number = 1; number <= totalPages; number++) {
        items.push(
            <PaginationItem key={number} active={currentPage === number} onClick={() => paginate(number)}>
            <PaginationLink>
            {number}
            </PaginationLink>
            </PaginationItem>
        );
    }

    if (loading) {
        return (
        <div className="loading-wrapper d-flex gap-2">
            <h2 style={{color:"#372c62"}}>Loading</h2>
            <SyncLoader color="#372c62" />
        </div>
        );
    }
          
    return(
        <Card className="table-wrapper bg-white">
            <CardHeader>
                <div className="d-flex justify-content-between align-items-center">
                    <p className="dashboard-card-title">Projects</p>
                    <Button className="new-project-btn" onClick={toggleNewProject}>New Project</Button>
                </div>
                <Modal isOpen={isNewProjectOpen} toggle={toggleNewProject} sz="sm">
                    <ModalHeader toggle={toggleNewProject}>Add a New Project</ModalHeader>
                    <CreateProject
                        toggle={toggleNewProject}
                        setProjects={setProjects}
                    />
                </Modal>
            </CardHeader>
            <CardBody className="p-3">
                {projects.length > 0 ?
                <Table striped className="table-1 m-0">
                    <thead>
                        <tr>
                            <th>Project</th>
                            <th>Description</th>
                            <th>Collaborators</th>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                        {projects &&
                            projects.slice(startIndex, endIndex).map((project) => {
                                return(
                                    <tr key={project.id}>
                                        <td><Link to={`${rootPath}/project/${project.id}`}>{project.name}</Link></td>
                                        <td>{project.description}</td>
                                        <td>
                                            <UsersCell
                                            projectId={project.id}
                                            selectedProjectId={selectedProjectId}
                                            />                       
                                        </td>
                                        <td>
                                            <UncontrolledDropdown className="d-flex justify-content-center align-items-center projects-more">
                                                <DropdownToggle
                                                    size="sm"
                                                    color=""
                                                    role="button"
                                                    id={project.id}
                                                    onClick={(e) => selectProject(e)}
                                                >
                                                    <i className="fa-solid fa-ellipsis-vertical project-ellipsis"/>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem id={project.id} onClick={toggleEditProject}>
                                                        Edit Project
                                                    </DropdownItem>
                                                    <DropdownItem divider/>
                                                    <DropdownItem id={project.id} onClick={() => {deleteProject(project.id)}}>
                                                        Delete Project
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        <Modal isOpen={isEditProjectOpen} toggle={toggleEditProject}>
                            <ModalHeader toggle={toggleEditProject}>Edit Project</ModalHeader>
                            <EditProject
                                toggle={toggleEditProject}
                                selectedProjectData={selectedProjectData}
                                selectedProjectTeam={selectedProjectTeam}
                                resetProjectId={resetProjectId}
                            />
                        </Modal>
                    </tbody>
                </Table>
                :
                <p className="m-2">No Projects Found</p>
                }
            </CardBody>
            {totalPages > 1 && 
                <CardFooter>
                    <Pagination className='w-100 d-flex justify-content-start'>
                    {items}
                    </Pagination>
                    
                </CardFooter>
            }
        <ToastContainer/>
        </Card>
    )
}