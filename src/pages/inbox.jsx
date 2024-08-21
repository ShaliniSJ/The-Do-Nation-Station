import { useEffect, useState } from "react";
import { pb } from "../lib/pocketbase";
import Navbar from "../components/Navbar";
import { getCurrentUser } from "../lib/appwrite";

export default function Page() {
  const [messages, setMessages] = useState([]);
  const [isDonor, setIsDonor] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: "", name: "" });

  useEffect(() => {
    setIsLogged(JSON.parse(localStorage.getItem("islogged")));
    if (!isLogged) {
      return;
    }
    getCurrentUser(isDonor).then((val) => {
      setCurrentUser(val);
      if (isDonor) {
        setCurrentUser({
          id: val.user_id,
          name: val.name,
        });
      } else {
        setCurrentUser({
          id: val.organisation_id,
          name: organisation_id,
        });
      }
    });
  }, [isLogged]);

  useEffect(() => {
    if (!isLogged || currentUser.id == "") {
      return;
    }
    try {
      pb.collection("messages")
        .getFullList({
          filter: `(from='${currentUser.id}' || to='${currentUser.id}')`,
          sort: "-created",
        })
        .then((val) => {
          setMessages(val);
        });
    } catch (e) {
      console.log("error fetching messages: ", e);
    }
  }, [isLogged, currentUser]);

  return (
    <>
      {/* <Navbar islogged={isLogged} /> */}
      <div className="p-6">
        <h2 className="text-4xl font-bold jost">Inbox</h2>
        {messages.length > 0 ? messages[0].text : "loading.."}
      </div>
    </>
  );
}

// 0
// :
// collectionId
// :
// "n85dyzfp7paoszj"
// collectionName
// :
// "messages"
// created
// :
// "2024-08-20 14:35:59.033Z"
// from
// :
// "user2"
// id
// :
// "ais0beo0l1mwhwr"
// text
// :
// "noice"
// to
// :
// "user1"
// updated
// :
// "2024-08-20 14:35:59.033Z"
