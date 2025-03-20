import React from "react";
import {
  Box,
  Typography,
  Switch,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  List,
  ListItem,
  Link,
} from "@mui/material";
import axios from "axios";
import SearchBody from "@/app/components/searchresults/SearchBody";
import SearchIcon from "@mui/icons-material/Search";
import GuideBreadcrumbs from "@/app/components/breadcrumbs/SearchBreadcrumbs";

const BASE_URL = "https://cms.drillbitplagiarismcheck.com";
const BASE_URL2 = "http://localhost:8080";

const searchContent1 = {
  content: ``,
};

async function getSearchContent(id) {
  try {
    const response = await axios.get(`${BASE_URL}/hr/cms/documents/${id}`);
    return response.data;
  } catch (error) {
    return {};
  }
}

const page = async ({ params }) => {
  const { slug } = await params;
  console.log("slug", slug);
  const id = slug.split("_")[0];

  const searchContent = id ? await getSearchContent(id) : {};

  return (
    <Box>
      <GuideBreadcrumbs
        items={[
          { label: "DrillBit Guides", href: "/" },
          {
            label: `${searchContent.guide.name}`,
            href: `/categories/${
              searchContent.guide.id
            }_${searchContent.guide.name.split(" ").join("-")}`,
          },
          { label: `${searchContent.category.name}`, href: "/categories" },
          // { label: `${searchContent.title}`},
        ]}
      />

      <Box display="flex" p={2}>
        <Box width="25%">
          <Typography variant="p" fontWeight="bold">
            Related Articles
          </Typography>
          <List sx={{ p: 0 }}>
            {searchContent.related_artciles.map((article, index) => (
              <Link
                key={index}
                href={`/content/${article.id}_${article.slug}`}
                color="primary"
              >
                <Typography variant="subtitle1" fontWeight={600}>
                  {article.title}
                </Typography>
              </Link>
            ))}
          </List>
        </Box>

        <Box width="55%" display="flex" flexDirection="column">
          <SearchBody searchContent={searchContent} />
        </Box>
        <Box
          width="25%"
          sx={{ display: "flex", position: "absolute", right: 1, top: 130 }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
            <Box sx={{ display: "flex", gap: 1, maxWidth: 400 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search..."
                size="small"
              />
              <Button variant="contained" color="primary" sx={{ minWidth: 50 }}>
                <SearchIcon />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default page;
