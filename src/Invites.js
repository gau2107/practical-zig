import Invitations from "./assets/json/invitations.json";
import InvitationsUpdate from "./assets/json/invitations_update.json";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Invites() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // check login
  useEffect(() => {
    if (!user) {
      navigate("../", { replace: true });
    }
  }, []);
  const userId = user && user.user_id;

  let invites = Invitations.invites;
  let invitesUpdate = InvitationsUpdate.invites;

  invites = invites.filter((inv) => inv.user_id === String(userId));
  invitesUpdate = invites.filter((inv) => inv.user_id === String(userId));

  const [inviteList, setInviteList] = useState([...invites]);
  const [ind, setInd] = useState(0);

  // inviteList append, 5sec delay
  useEffect(() => {
    const interval = setInterval(() => {
      if (ind <= invitesUpdate.length - 1)
        setInviteList([...inviteList, invitesUpdate[ind]]);
      setInd(ind + 1);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  });

  // unix time string to display time
  const convertTime = function (timestamp, separator) {
    var pad = function (input) {
      return input < 10 ? "0" + input : input;
    };
    var date = timestamp ? new Date(timestamp * 1000) : new Date();
    return [
      pad(date.getHours()),
      pad(date.getMinutes()),
      pad(date.getSeconds()),
    ].join(typeof separator !== "undefined" ? separator : ":");
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>sender Id</th>
            {/* <th>sig_id</th> */}
            <th>Invite message</th>
            <th>Vector</th>
            <th>Invite Time</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {inviteList.length > 0 ? (
            inviteList.map((rowData, key) => {
              return (
                <tr
                  key={key}
                  className={
                    rowData.status === "read"
                      ? "fade alert alert-success show"
                      : "fade alert alert-danger show"
                  }
                >
                  <td>{key + 1}</td>
                  <td>{rowData.sender_id}</td>
                  {/* <td>{rowData.sig_id}</td> */}
                  <td>{rowData.invite}</td>
                  <td>{rowData.vector}</td>
                  <td>{convertTime(rowData.invite_time)}</td>
                  <td>{rowData.status}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={8}>Data not found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}

export default Invites;
