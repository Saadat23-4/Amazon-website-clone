import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { darkLogo } from "../assets/index";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { RotatingLines } from "react-loader-spinner";
import { Password } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/amazonSlice";

function SignIn() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  //Firebase error
  const [userEmailErr, setUserEmailErr] = useState("");
  const [userPassErr, setUserPassErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [succesMsg, setSuccesMsg] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) {
      setErrEmail("Enter Your Email");
    }
    if (!password) {
      setErrPassword("Enter Your Password");
    }
    if (email && password) {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          dispatch(
            setUserInfo({
              _id: user.uid,
              userName: user.displayName,
              email: user.email,
              image: user.photoURL,
            })
          );

          setLoading(false);
          setSuccesMsg("Logged in Succesfully! Welcome you back!");
          setTimeout(() => {
            navigate("/");
          }, 500);
        })
        .catch((error) => {
          setLoading(false);
          const errorCode = error.code;
          if (errorCode.includes("auth/invalid-email")) {
            setUserEmailErr("Invalid Email");
          }
          if (errorCode.includes("auth/wrong-password")) {
            setUserPassErr("Wrong Password! Try Again!");
          }
          // console.log("Something is up, Try with correct credentials");
        });

      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="w-full bg-gray-100 ">
      {succesMsg ? (
        <div className="w-full flex justify-center items-center py-32 ">
          <p className="border-[1px] border-green-600 text-green-500 font-titleFont text-lg font-semibold px-6 py-2">
            {succesMsg}
          </p>
        </div>
      ) : (
        <form className="w-[350px] mx-auto flex flex-col items-center">
          <img className="w-32" src={darkLogo} alt="Dark Logo" />
          <div className="w-full border border-zinc-200 p-6">
            <h2 className="font-titleFont text-3xl font-medium mb-4">
              Sign In
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium ">
                  Email or Mobile phone number
                </p>
                <input
                  onChange={handleEmail}
                  value={email}
                  className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="email"
                />
                {errEmail && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5 ">
                    {errEmail}
                  </p>
                )}
                {userEmailErr && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    {userEmailErr}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium ">Password</p>
                <input
                  onChange={handlePassword}
                  value={password}
                  className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="password"
                />
                {errPassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5 ">
                    {errPassword}
                  </p>
                )}
                {userPassErr && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    {userPassErr}
                  </p>
                )}
              </div>
              <button
                onClick={handleLogin}
                className="w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput"
              >
                Continue
              </button>
              {loading && (
                <div className="flex justify-center">
                  <RotatingLines
                    strokeColor="#febd69"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="50"
                    visible={true}
                  />
                </div>
              )}
            </div>
            <p className="text-xs text-black leading-4 mt-4">
              By Continuing, you agree to Amazon's{" "}
              <span className="text-blue-600">Condition of Use</span> and{" "}
              <span className="text-blue-600">Privacy Notice.</span>
            </p>
            <p className="text-xs text-gray-600 mt-4 cursor-pointer group">
              <ArrowRightIcon />{" "}
              <span className="text-blue-600 group-hover:text-orange-700">
                Need Help?
              </span>
            </p>
          </div>
          <p className="w-full text-xs text-gray-600 mt-4 flex items-center">
            <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex"></span>
            <span className="w-1/3 text-center">New to Amazon</span>
            <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex"></span>
          </p>
          <Link to="/registration">
            <button className="w-full py-1.5 mt-4 text-sm mb-6 font-normal rounded-sm bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b border border-zinc-400 active:border-y-yellow-800 active:shadow-amazonInput">
              Create your Amazon account
            </button>
          </Link>
        </form>
      )}
      <div
        className="w-full bg-gradient-to-t from-white via-white to-zinc-200 flex
      flex-col gap-4 justify-center items-center py-10"
      >
        <div className="flex items-center gap-6">
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100 ">
            Conditions of Use
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100 ">
            Privacy Notice
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100 ">
            Privacy Notice
          </p>
        </div>
        <p className="text-xs text-gray-600">
          © 1996-2023, ReactBd.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
}

export default SignIn;
