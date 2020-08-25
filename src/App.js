import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db, auth } from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
function App() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignin, setOpenSignin] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  //   {
  //     userName: "hammad",
  //     imageUrl:
  //       "https://instagram.fkhi6-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/79932927_1527815467370503_1890349542794844690_n.jpg?_nc_ht=instagram.fkhi6-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=rk5808JZewoAX91yFhx&oh=8c315f82e712cea3d9288e98f037fa8a&oe=5F6A9D9D",
  //     caption: "yeah that's my boy 😎",
  //   },
  //   {
  //     userName: "Abubakar",
  //     imageUrl:
  //       "https://instagram.fkhi6-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/78798405_2267327970231628_3948701417788036895_n.jpg?_nc_ht=instagram.fkhi6-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=8NvNO4mEvckAX-DHgR8&oh=fdd69fead4010065b8f138c353c06d5b&oe=5F6BD190",
  //     caption: "Yes! livestreaming at 9:00PM boys 😁",
  //   },
  //   {
  //     userName: "Saad ",
  //     imageUrl:
  //       "https://instagram.fkhi6-1.fna.fbcdn.net/v/t51.2885-15/e35/117815763_127166432075526_3452240572772870244_n.jpg?_nc_ht=instagram.fkhi6-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=jWJtEmUZzuIAX8UmB9R&oh=b3b5539aa5aa77dcaab5887777eb23ab&oe=5F6BEAFB",
  //     caption: "wow three game sessions a day",
  //   },
  // ]);

  // UserEffect -> Runs a piece of code in a specific condition
  // run every time post when changes occur in useEffect add object --> [posts]
  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  const signUp = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in
        console.log(authUser);
        setUser(authUser);
        if (authUser.displayName) {
          // don't update username
        } else {
          // if we created someone
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        // user has logged out
        setUser(null);
      }

      return () => {
        // perform some cleaning action
        unsub();
      };
    });
  }, [user, username]);

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignin(false);
  };

  return (
    <div className="app">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form>
            <center>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
                alt=""
                className="app_headerImage"
              />
              <div className="signup__form">
                <Input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input"
                />
                <Input
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                />
                <Input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                />

                <Button onClick={signUp}>Sign Up</Button>
              </div>
            </center>
          </form>
        </div>
      </Modal>

      <Modal open={openSignin} onClose={() => setOpenSignin(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form>
            <center>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
                alt=""
                className="app_headerImage"
              />
              <div className="signup__form">
                <Input
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                />
                <Input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                />

                <Button onClick={signIn}>Sign In</Button>
              </div>
            </center>
          </form>
        </div>
      </Modal>

      <div className="app_header">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
          alt=""
          className="app_headerImage"
        />
      </div>
      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ) : (
        <div>
          <Button onClick={() => setOpenSignin(true)}>Login</Button>
          <Button onClick={() => setOpen(true)}>Signup</Button>
        </div>
      )}

      {posts.map(({ id, post }) => (
        <Post
          key={id}
          userName={post.userName}
          imageUrl={post.imageUrl}
          caption={post.caption}
        />
      ))}
    </div>
  );
}

export default App;
