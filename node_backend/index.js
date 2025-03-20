import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

function parseCustomMarkup(input) {
  const lines = input.split("\n").filter((line) => line.trim() !== ""); // Remove empty lines
  let output = "";
  let stack = [];

  function closeList() {
    while (stack.length) {
      let lastTag = stack.pop();
      output += `</${lastTag}>`;
    }
  }

  lines.forEach((line) => {
    if (line.startsWith("##h1 ")) {
      closeList();
      output += `<h1>${line.replace("##h1 ", "")}</h1>`;
    } else if (line.startsWith("##h2 ")) {
      closeList();
      output += `<h2>${line.replace("##h2 ", "")}</h2>`;
    } else if (line.startsWith("##h3 ")) {
      closeList();
      output += `<h3>${line.replace("##h3 ", "")}</h3>`;
    } else if (line.startsWith("##h4 ")) {
      closeList();
      output += `<h4>${line.replace("##h4 ", "")}</h4>`;
    } else if (line.startsWith("##h5 ")) {
      closeList();
      output += `<h5>${line.replace("##h5 ", "")}</h5>`;
    } else if (line.startsWith("##h6 ")) {
      closeList();
      output += `<h6>${line.replace("##h6 ", "")}</h6>`;
    } else if (line.startsWith("##p ")) {
      output += `<p>${line.replace("##p ", "")}</p>`;
    } else if (line.startsWith("##img ")) {
      output += `<img src="${line.replace("##img ", "")}" alt="Image"/>`;
    } else if (line.startsWith("##note##")) {
      closeList();
      output += `<div class="note">`;
      stack.push("div");
    } else if (line.startsWith("##/note##")) {
      if (stack.includes("div")) {
        output += `</div>`;
        stack.pop();
      }
    } else if (line.startsWith("##ul##")) {
      closeList();
      output += `<ul>`;
      stack.push("ul");
    } else if (line.startsWith("##/ul##")) {
      if (stack.includes("ul")) {
        output += `</ul>`;
        stack.pop();
      }
    } else if (line.startsWith("##ol##")) {
      closeList();
      output += `<ol>`;
      stack.push("ol");
    } else if (line.startsWith("##/ol##")) {
      if (stack.includes("ol")) {
        output += `</ol>`;
        stack.pop();
      }
    } else if (/^\d+\./.test(line)) {
      // Ordered list item (e.g., "1. Step")
      output += `<li>${line.replace(/^\d+\.\s*/, "")}</li>`;
    } else if (/^- /.test(line)) {
      // Unordered list item (e.g., "- Step")
      output += `<li>${line.replace(/^- /, "")}</li>`;
    } else {
      output += `<p>${line}</p>`;
    }
  });

  closeList(); // Ensure final list closure
  return output;
}

let htmlString = "";

app.get("/hr/cms/documents/gSearch", (req, res) => {
  const { query } = req.query; // Get the query parameter from request

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  // Simulating a response (replace this with actual data fetching logic)
  const responseData = [
    {
      id: 1,
      title: "Logging into DrillBit 1",
      description:
        "logging into DrillBit is easy as you have to enter your email and password",
      keywords: "a,has,nod,then",
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Moodle Installation on ubuntu",
      description:
        "Installing moodle on ubuntu is easy as you have to enter your email and password",
      keywords: "a,has,nod,then",
      timestamp: new Date().toISOString(),
    },
  ];

  res.json(responseData);
});

app.get("/hr/cms/documents/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Document ID is required" });
    }

    const responseData = {
      id: 1,
      title: "Logging into DrillBit",
      content: `<h2>Logging in to DrillBit Plagiarism</h2>\n<p>Getting started with DrillBit is easy. Simply log in using your credentials to access your dashboard and start managing your plagiarism checks. If you encounter any login issues, donâ€™t worryâ€”DrillBit is here to help you get back on track quickly and smoothly.</p>\n<p>Log In to DrillBit: Begin by using the credentials provided to you by DrillBit. These details, including your username and password, are typically sent to your email.</p>\n<p>Access Your Account: Visit drillbitplagiarism.com to log in. Youâ€™ll also find this link in your DrillBit welcome email.</p>\n<p>Initiate the Login Process: On the DrillBit homepage, locate and click the \"GET STARTED\" button. This will redirect you to the login screen where you can securely enter your credentials.</p>\n<img src=\"https://cmsdrillbit.blob.core.windows.net/cmsstorage/Pro_Admin_images/2025030501.PNG\" class=\"large-image\" />\n<p>Sign In: After entering your credentials, click the â€œSign Inâ€� button to access your account and start exploring the features on your dashboard.</p>\n<div class=\"note-box\">⚠️\n<ul>\n<li>After 6 consecutive incorrect login attempts, your account will be temporarily locked for one hour.</li>\n<li>If you forget your password, click the <strong>â€œForgot Passwordâ€�</strong> link to reset it and regain access.</li>\n</ul>\n</div>`,
    };

    res.json(responseData);
  } catch (error) {
    console.error("Error fetching document:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/hr", (req, res) => {
  console.log("Reached");

  console.log("req.body = ", req.body);

  const { content } = req.body;
  htmlString = parseCustomMarkup(content);
  res.status(201).json({
    message: "Received",
  });
});

app.get("/hr", (req, res) => {
  res.status(200).send(htmlString);
});

app.listen(8080, () => {
  console.log("Server started on http://localhost:8080");
});
