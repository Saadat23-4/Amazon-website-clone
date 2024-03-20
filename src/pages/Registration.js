import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { darkLogo } from "../assets/index";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { RotatingLines } from "react-loader-spinner";
import { motion } from "framer-motion";

function Registration() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPassword, setClientPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  //======Error Messages Start===========
  const [errClientName, setErrClientName] = useState("");
  const [errClientEmail, setErrClientEmail] = useState("");
  const [errClientPassword, setErrClientPassword] = useState("");
  const [errCPassword, setErrCPassword] = useState("");
  const [firebaseErr, setFirebaseErr] = useState("");
  //======Loading State start here==========
  const [loading, setLoading] = useState(false);
  const [succesMsg, setSuccesMsg] = useState("");

  //====Handle Function===============
  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };

  const handleEmail = (e) => {
    setClientEmail(e.target.value);
    setErrClientEmail("");
  };

  const handlePassword = (e) => {
    setClientPassword(e.target.value);
    setErrClientPassword("");
  };

  const handleCPassword = (e) => {
    setCPassword(e.target.value);
    setErrCPassword("");
  };

  //=======Email Validation========
  const emailValidation = (clientEmail) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(clientEmail);
  };

  //=======Submit button==========
  const handleRegistration = (e) => {
    e.preventDefault();
    if (!clientName) {
      setErrClientName("Enter your name!");
    }
    if (!clientEmail) {
      setErrClientEmail("Enter your email!");
      setFirebaseErr("");
    } else {
      if (!emailValidation(clientEmail)) {
        setErrClientEmail("Enter a valid email");
      }
    }
    if (!clientPassword) {
      setErrClientPassword("Enter your password!");
    } else {
      if (clientPassword.length < 6) {
        setErrClientPassword("Password must be at least 6 characters");
      }
    }
    if (!cPassword) {
      setErrCPassword("Confirm your password");
    } else {
      if (cPassword !== clientPassword) {
        setErrCPassword("Password not match");
      }
    }

    if (
      clientName &&
      clientEmail &&
      emailValidation(clientEmail) &&
      clientPassword &&
      clientPassword.length >= 6 &&
      cPassword === clientPassword
    ) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, clientEmail, clientPassword)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: clientName,
            photoURL:
              "https://unsplash.com/photos/woman-holding-red-flower-TWB035qnbQs",
          });
          // Signed up
          const user = userCredential.user;
          console.log(user);
          setLoading(false);
          setSuccesMsg("Account Created Succesfully!");
          setTimeout(() => {
            navigate("/signin");
          }, 3000);
        })
        .catch((error) => {
          const errorCode = error.code;

          if (errorCode.includes("auth/email-already-in-use")) {
            setFirebaseErr("Email already in use, try another one");
          }
        });

      setClientEmail("");
      setClientName("");
      setClientPassword("");
      setCPassword("");
      setFirebaseErr("");
    }
  };

  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 pb-10">
        <form className="w-[370px] mx-auto flex flex-col items-center">
          <img className="w-32" src={darkLogo} alt="Dark Logo" />
          <div className="w-full border border-zinc-200 p-6">
            <h2 className="font-titleFont text-3xl font-medium mb-4">
              Create your Account
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium ">Your Name:</p>
                <input
                  onChange={handleName}
                  value={clientName}
                  className="w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="text"
                />
                {errClientName && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    {errClientName}
                  </p>
                )}
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium ">
                    Email or mobile phone number
                  </p>
                  <input
                    onChange={handleEmail}
                    value={clientEmail}
                    className="w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                    type="email"
                  />
                  {firebaseErr && (
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                      {firebaseErr}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium ">Password</p>
                  <input
                    onChange={handlePassword}
                    value={clientPassword}
                    className="w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                    type="password"
                  />
                  {errClientPassword && (
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                      {errClientPassword}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium ">Re-enter password</p>
                  <input
                    onChange={handleCPassword}
                    value={cPassword}
                    className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                    type="password"
                  />
                  {errCPassword && (
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                      {errCPassword}
                    </p>
                  )}
                  <p className="text-xs text-gray-600">
                    Password must be at least 6 characters
                  </p>
                </div>
                <button
                  onClick={handleRegistration}
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
                {succesMsg && (
                  <div>
                    <motion.p
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-base font-titleFont font-semibold text-green-500 border-[1px] border-green-500 px-2 text-center"
                    >
                      {succesMsg}
                    </motion.p>
                  </div>
                )}
              </div>
              <p className="text-xs text-black leading-4 mt-3">
                By creating, you agree to Amazon's{" "}
                <span className="text-blue-600">Condition of Use</span> and{" "}
                <span className="text-blue-600">Privacy Notice.</span>
              </p>

              <div className="text-xs text-black">
                Already have an account?{" "}
                <Link to="/signin">
                  <span className="text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
                    Sign In{" "}
                    <span>
                      <ArrowRightIcon />
                    </span>
                  </span>
                </Link>
                <p className="text-xs text-black -mt-2">
                  Buying for work?{" "}
                  <span className="text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
                    Create a free bussiness account
                  </span>
                </p>{" "}
              </div>
            </div>
          </div>
        </form>
      </div>
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

export default Registration;
