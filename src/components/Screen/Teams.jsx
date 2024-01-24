import { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Navbar from "../Home/Navbar/Navbar";
import { UserContext } from "../../App";
import { toast } from "react-toastify";

const Teams = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const { loggedInUser } = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(loggedInUser.isAdmin);
    useEffect(() => {

        fetch("https://agency-server-git-main-taher-39.vercel.app/member/get-all-members")
            .then(response => response.json())
            .then(data => setTeamMembers(data.teamMembers))
            .catch(error => toast.error("Error fetching team members:", error));
    }, []);

    const handleStatusChange = async (memberId, newStatus) => {
        try {
            const response = await fetch(`https://agency-server-git-main-taher-39.vercel.app/member/update-status/${memberId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ memberStatus: newStatus }),
            });

            if (response.status === 200) {
                toast.success(response.message)
                setTeamMembers(prevMembers =>
                    prevMembers?.map(member =>
                        member.member._id === memberId ? { ...member, member: { ...member.member, memberStatus: newStatus } } : member
                    )
                );
            } else {
                toast.error(response.statusText);
            }
        } catch (error) {
            toast.error("Error updating member status:", error);
        }
    };

    const handleEdit = (memberId) => {
        console.log(`Editing member with ID ${memberId}`);
        toast.success("This Feature Comming Soon")
    };

    const handleWithdraw = async (memberId) => {
        try {
            console.log(`Editing member with ID ${memberId}`);
            const response = await fetch(`https://agency-server-git-main-taher-39.vercel.app/member/withdraw-member/${memberId}`, {
                method: "DELETE",
            });

            if (response.status === 200) {
                toast.success(response.message);
                setTeamMembers((prevMembers) =>
                    prevMembers.filter((member) => member.member._id !== memberId)
                );
            } else {
                toast.error(response.statusText);
            }
        } catch (error) {
            toast.error("Error withdrawing member:", error);
        }
    };
    return (
        <>
            <Navbar />
            <Container className="my-5">
                <h2 className="text-center">Our Team Members</h2>

                <h3>Already Works For Creative Agency</h3>
                <Row>
                    {teamMembers
                        .filter(member => member.member.memberStatus === "done")
                        ?.map((member, index) => (
                            <Col md={4} key={index} className="mb-3">
                                <div className="col-md-12 col-sm-6 col-12 my-3">
                                    <div className="card shadow">
                                        <div className="card-body">
                                            <h4>{member?.name}</h4>
                                            <p><b>Gender:</b> {member?.member.gender}</p>

                                            <div className="row ">
                                                <p className="col-md-6">
                                                    <b>Role:</b> {member?.member.role}
                                                </p>
                                                <p className="col-md-6">
                                                    <b>Experience:</b> {member?.member.experience}
                                                </p>
                                            </div>
                                            {isAdmin ? (
                                                <div className="row">
                                                    <Button variant="success" onClick={() => handleStatusChange(member.member._id, "pending")}>
                                                        Mark as pending
                                                    </Button>
                                                    <Button variant="danger" className="mt-2" onClick={() => handleWithdraw(member.member._id)}>
                                                        Withdraw
                                                    </Button>
                                                </div>
                                            ) : (<div className="row">

                                                <Button variant="danger" className="mt-2" onClick={() => handleWithdraw(member.member._id)}>
                                                    Resign
                                                </Button>
                                            </div>)}

                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                </Row>

                <h3>Want To Works For Creative Agency</h3>
                <Row>
                    {teamMembers
                        .filter(member => member.member.memberStatus === "pending")
                        ?.map((member, index) => (
                            <Col md={4} key={index} className="mb-3">
                                <div className="col-md-12 col-sm-6 col-12 my-3">
                                    <div className="card shadow">
                                        <div className="card-body">
                                            <h4>{member?.name}</h4>
                                            <p><b>Gender:</b> {member?.member.gender}</p>

                                            <div className="row ">
                                                <p className="col-md-6">
                                                    <b>Role:</b> {member?.member.role}
                                                </p>
                                                <p className="col-md-6">
                                                    <b>Experience:</b> {member?.member.experience}
                                                </p>
                                            </div>
                                            {isAdmin ? (
                                                <div className="row">
                                                    <Button variant="success" onClick={() => handleStatusChange(member.member._id, "done")}>
                                                        Mark as Done
                                                    </Button>
                                                    <Button variant="danger" className="mt-2" onClick={() => handleWithdraw(member.member._id)}>
                                                        Withdraw
                                                    </Button>
                                                </div>
                                            ) : (<div className="row">
                                                <Button variant="warning" onClick={() => handleEdit(member.member._id)}>
                                                    Edit
                                                </Button>
                                                <Button variant="danger" className="mt-2" onClick={() => handleWithdraw(member.member._id)}>
                                                    Withdraw
                                                </Button>
                                            </div>)}

                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                </Row>
            </Container>
        </>
    );
};

export default Teams;
