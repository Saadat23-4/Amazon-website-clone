import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { allItems } from "../../constants/index";
import { logo } from "../../assets/index";
import { LocationOnOutlined } from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HeaderBottom from "../HeaderBottom";
import { Link } from "react-router-dom";

function Header() {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="w-full sticky top-0 z-50">
      <div className=" bg-amazon_blue  text-white px-4 py-3 flex items-center gap-4">
        {/* ===========Image Start here=========== */}
        <div className="headerHover">
          <img className="w-24 mt-2" src={logo} alt="logo" />
        </div>
        {/* ==============Image end here============*/}

        {/* ===========Delivery option============= */}
        <div className="headerHover hidden mdl:inline-flex">
          <LocationOnIcon />
          <p className="text-sm text-ligtText font-light flex flex-col">
            Deliver to{" "}
            <span className="text-sm font-semibold -mt-1 text-whiteText">
              Chicago
            </span>
          </p>
        </div>
        {/* ===========Delivery end here=========== */}

        {/* ===========Search start here===========*/}
        <div className="h-10 rounded-md hidden lgl:flex flex-grow relative ">
          <span
            onClick={() => setShowAll(!showAll)}
            className="w-14 h-full bg-gray-200 hover:bg-gray-300 border-2 cursor-pointer duration-300 text-sm text-amazon_blue font-titleFont flex items-center justify-center rounded-tl-md rounded-bl-md"
          >
            All{" "}
            <span>
              <ArrowDropDownIcon />
            </span>
            {showAll && (
              <div>
                <ul className="absolute w-56 h-80 top-10 left-0 overflow-y-scroll overflow-x-hidden bg-white border-[1px] border-amazon_blue text-black p-2 flex-col gap-1 z-50">
                  {allItems.map((item) => (
                    <li
                      className="text-sm tracking-wide font-titleFont border-b-[1px] border-b-transparent hover:border-b-amazon_blue cursor-pointer duration-200"
                      key={item._id}
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </span>
          <input
            className="h-full text-base text-amazon_blue flex-grow outline-none border-none px-2"
            type="text"
          />
          <span className="w-12 h-full flex items-center justify-center bg-amazon_yellow hover:bg-[#f3a847] duration-300 text-amazon_blue cursor-pointer rounded-tr-md rounded-br-md">
            <SearchIcon />
          </span>
        </div>
        {/* =============Search end here========= */}

        {/* =============Sign In start here====== */}
        <Link to="/signin">
          <div className="hidden lgl:flex flex-col items-start justify-center headerHover">
            <p className="text-sm mdl:text-xs text-white mdl:text-lightText font-light">
              Hello
            </p>
            <p className="text-sm font-semibold -mt-1 text-whiteText hidden mdl:inline-flex">
              Accounts and Lists{" "}
              <span>
                <ArrowDropDownIcon />
              </span>
            </p>
          </div>
        </Link>
        {/* =============Sign In end here====== */}

        {/* =============Orders start here====== */}
        <div className="flex flex-col items-start justify-center headerHover">
          <p className="text-xs text-lightText font-light">Returns</p>
          <p className="text-sm font-semibold -mt-1 text-whiteText">&Orders</p>
        </div>
        {/* =============Orders end here====== */}

        {/* ===========ShoppingCart start here===== */}
        <div className="flex items-start justify-center headerHover relative">
          <ShoppingCartIcon />
          <p className="text-xs text-whiteText font-semibold mt-3 ">
            Cart{" "}
            <span className="absolute text-xs -top-1 left-6 font-semibold p-1 h-4 bg-[#f3a847] text-amazon_blue rounded-full flex justify-center items-center">
              0
            </span>
          </p>
        </div>
        {/* ===========ShoppingCart end here===== */}
      </div>
      <HeaderBottom />
    </div>
  );
}

export default Header;
