"use client";
import { Box } from "@mui/material";
import React from "react";

// const __html = `<div><h2>Logging in to DrillBit Plagiarism</h2>
//     \n
//     <p>
//       Getting started with DrillBit is easy. Simply log in using your
//       credentials to access your dashboard and start managing your plagiarism
//       checks. If you encounter any login issues, donâ€™t worryâ€”DrillBit is
//       here to help you get back on track quickly and smoothly.
//     </p>
//     \n
//     <p>
//       Log In to DrillBit: Begin by using the credentials provided to you by
//       DrillBit. These details, including your username and password, are
//       typically sent to your email.
//     </p>
//     \n
//     <p>
//       Access Your Account: Visit drillbitplagiarism.com to log in. Youâ€™ll also
//       find this link in your DrillBit welcome email.
//     </p>
//     \n
//     <p>
//       Initiate the Login Process: On the DrillBit homepage, locate and click the
//       \"GET STARTED\" button. This will redirect you to the login screen where
//       you can securely enter your credentials.
//     </p>
//     \n<img
//       src="https://cmsdrillbit.blob.core.windows.net/cmsstorage/Pro_Admin_images/2025030501.PNG\"
//       class="large-image"
//     />\n
//     <p>
//       Sign In: After entering your credentials, click the â€œSign Inâ€� button
//       to access your account and start exploring the features on your dashboard.
//     </p>
//     \n
//     <div class="note-box">
//       ⚠️\n
//       <ul>
//         \n
//         <li>
//           After 6 consecutive incorrect login attempts, your account will be
//           temporarily locked for one hour.
//         </li>
//         \n
//         <li>
//           If you forget your password, click the
//           <strong>â€œForgot Passwordâ€�</strong> link to reset it and regain
//           access.
//         </li>
//         \n
//       </ul>
//       \n
//     </div></div>`;

let __html = `
<div class="info-box">
<p> This is a infobox test</p>
<ul>
<li> This is a test</li>
</ul>
</div>
`;

const SearchBody = ({ searchContent }) => {
  const { title, content } = searchContent;
  return (
    <Box>
      <h1>{title}</h1>
      <hr />
      <div
        style={{ width: "100%" }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Box>
  );
};

export default SearchBody;
